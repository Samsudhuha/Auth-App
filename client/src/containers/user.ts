import { User } from "../models/User";

export async function GetUser(token: string): Promise<User> {
    const response = await fetch("/api/users",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token,
            },
        });
    return response.json();   
}

export interface LoginCredentials {
    email: string,
    password: string,
}

export async function Login(credentials: LoginCredentials): Promise<User> {
    const response = await fetch("/api/users/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
    
    return response.json();   
}

export interface RegisterCredentials {
    name: string,
    email: string,
    password: string,
}

export async function Register(credentials: RegisterCredentials): Promise<User> {
    const response = await fetch("/api/users/register",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
    return response.json();   
}

export async function Logout() {
    localStorage.clear();
    return;
}