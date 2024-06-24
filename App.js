// In App.js in a new project

import * as React from 'react';
import { SafeAreaView, TextInput, Button } from 'react-native';
import Dash from './src/screens/Dash';
import { useState, useEffect } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);

// const usrDetails = async () => {
//   const { username, userId, signInDetails } = await getCurrentUser();

// console.log("username", username);
// console.log("user id", userId);
// console.log("sign-in details", signInDetails);

// }

function App() {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);


  function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');



    const handleLogin = async () => {
      try {
        await Auth.signIn(username, password);
        console.log('User logged in successfully');
        setLoggedIn(true);
      } catch (error) {
        console.log('Error logging in:', error);
      }
    };

    return (
      <SafeAreaView>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} />
      </SafeAreaView>
    );
  }
  const handleLogout = async () => {
    try {
      await Auth.signOut();
      setLoggedIn(false);
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };
  useEffect(() => {
    checkAuthState();
  }, []);

  async function checkAuthState() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
    } catch (error) {
      console.log('Error checking authentication state:', error);
      setUser(null); // Reset user state if there's an error
    }
  }
  console.log(loggedIn)
  return (
    loggedIn ? <Dash handleLogout={handleLogout} /> : <Login />
  );
}

const signUpConfig = {
  header: "Sign Up to my App",
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Full name",
      key: "name",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 2,
      type: "string",
    },
    {
      label: "Username",
      key: "preferred_username",
      required: true,
      displayOrder: 3,
      type: "string",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 4,
      type: "password",
    },
  ],
};
export default (App);