import { RequestHandler } from "express";
import userModel from "../models/userModel";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

const { AUTH_TOKEN_KEY } = process.env;

interface signUpBody {
    name?: string,
    email?: string,
    password?: string,
}

interface signInBody {
    name?: string,
    email?: string,
    password?: string,
}

export const getUser: RequestHandler = async (req, res, next) => {
    const auth_token = req.headers["x-access-token"] as string;
    try {
        const decodedUserInfo = jwt.verify(auth_token, AUTH_TOKEN_KEY!) as JwtPayload;
        // Check if user actually exist in db
        const user = await userModel.findOne({ email: decodedUserInfo.email }).select("+password").exec();

        res.status(200).json({
            status: 200,
            success: true,
            message: "",
            data: {
                _id: user!._id,
                name: user!.name,
                email: user!.email,
            },
        });
    } catch (error) {
        next(error);
    }
}

export const login: RequestHandler<unknown, unknown, signInBody, unknown> = async (req, res, next) => {
    const email     = req.body.email;
    const password  = req.body.password;
    try {
        const user = await userModel.findOne({ email: email }).select("+password").exec();
        if (!user) throw createHttpError(401, "Email Salah");
        
        const passwordMatch = await bcrypt.compare(password!, user.password);
        if (!passwordMatch) throw createHttpError(401, "Password Salah" + user.password);
        
        const token = jwt.sign(
            { _id: user?._id, email: user?.email },
            AUTH_TOKEN_KEY!,
            {
                expiresIn: "1d",
            }
        );

        res.status(200).json({
            status: 200,
            success: true,
            message: "login success",
            data: {
                _id: user!._id,
                name: user!.name,
                email: user!.email,
                token: token,
            },
        });
    } catch (error) {
        next(error);
    }
}

export const signUp: RequestHandler<unknown, unknown, signUpBody, unknown> = async (req, res, next) => {
    const name      = req.body.name;
    const email     = req.body.email;
    const password  = req.body.password;

    try {
        if (!name || !email || !password) {
            throw createHttpError(400, "Isi Semua Inputan")
        }

        const existingEmail = await userModel.findOne({ email: email }).exec();
        if (existingEmail) throw createHttpError(409, "Email Sudah Ada");

        const passwordHashed = await bcrypt.hash(password, 10)
        
        const user = await userModel.create({
            name: name,
            email: email,
            password: passwordHashed,
        })
        
        res.status(200).json({
            status: 201,
            success: true,
            message: "User created Successfully",
            data: {
                _id: user!._id,
                name: user!.name,
                email: user!.email,
            },
        });
    } catch (error) {
        next(error);
    }
}