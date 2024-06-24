import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import { Amplify, Auth } from 'aws-amplify';


const signUp = async () => {
  try {
    const response = await Auth.signUp({
      username: 'test',
      password: 'Test@123',
      attributes: {
        email: 'ryansikandar@gmail.com',
        name: 'Ryan Sikandar',
      }
    });
    console.log('Successfully signed up:', response);
  } catch (error) {
    console.log('Error signing up:', error);
  }
};

const Dash = ({ handleLogout }) => {
  const [User, setUser] = useState(null);
  const details = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setUser(user);
      //Show user details
      console.log('User name', User.username)
      console.log('User email', User.attributes.email)


    } catch (error) {
      console.log('Error getting user details:', error);
    }
  }

  useEffect(() => {
    details();
  }, []);

  const handleSignUp = () => {
    signUp();
  };

  return (
    <SafeAreaView>
      <Text>Dashboard</Text>
      <Text>
        Welcome {User ? User.username : 'User'}
      </Text>

      <Button title='logout' onPress={handleLogout} />
    </SafeAreaView>
  );
};

export default Dash;
