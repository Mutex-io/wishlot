import React, { useState } from 'react';
import { View, Image, Text, TextInput, Pressable } from 'react-native';
import { router, Link } from 'expo-router';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function login() {
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = () => {
        signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
            .then((user) => {
                if (user) router.replace("../(tabs)")
            }).catch ((err) => {
                alert(err?.message);
            });
    };

    return (
        <View className='h-full flex flex-col items-center justify-center relative'>
            {/* <Image source={logo} /> */}
            <TextInput 
                className='my-5 border-0'
                placeholder='Email address'
                keyboardType='email-address'
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput 
                className='mb-5'
                placeholder='Password'
                textContentType='password'
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
            />

            <Pressable className='px-5 py-1 mb-3 bg-blue-500 hover:bg-blue-600 text-white rounded' onPress={handleLogin}> 
                Log in
            </Pressable>

            <Pressable className='px-5 py-1  underline '>
                <Link replace href="/signup">Don't have an account? Sign up</Link>
            </Pressable>
        </View>
    );
};