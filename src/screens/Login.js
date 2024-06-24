import React, { useState } from 'react';
import { TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import { SafeAreaView } from 'react-native';

function Login() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await Auth.signIn(username, password);
            console.log('User logged in successfully');
            
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
            
            <Button title="Login" onPress={handleLogin} />

        </SafeAreaView>
    );
}

export default (Login);