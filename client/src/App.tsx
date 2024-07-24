import React, { useEffect, useState } from 'react';
import './App.css';
import { User as UserModel } from './models/User';
import NavBar from './components/nav/Navbar';
import { Container } from 'react-bootstrap';
import Register from './components/form/register';
import Login from './components/form/login';
import * as UserApi from "./containers/user";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<UserModel|null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const getToken = localStorage.getItem('jwtToken');
        
        if (getToken != null) {
          const user = await UserApi.GetUser(getToken);
          setLoggedInUser(user);
        }

      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);
  return (
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />
      <Container>
        { showSignUpModal &&
          <Register 
            onDismiss={() => setShowSignUpModal(false)}
            onRegisterSuccessful={() => { 
              setShowSignUpModal(false);
            }}
          />
        }
        { showLoginModal &&
          <Login 
            onDismiss={() => setShowLoginModal(false)}
            onLoginSuccessful={(user) => { 
              setLoggedInUser(user);
              setShowLoginModal(false);
            }}
          />
        }
      </Container>
    </div>
  );
}

export default App;
