import React, { useState } from 'react';
import { View, Image, Text, TextInput, Pressable } from 'react-native';
import { router, Link } from 'expo-router';
import { FIREBASE_APP } from '../../firebaseConfig';
import { FIREBASE_AUTH } from '../../firebaseConfig'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// Move to firebaseService
import { FIRESTORE_DB } from '../../firebaseConfig'
import {
    setDoc,
    doc,
} from 'firebase/firestore';

export default function login() {
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSignup = () => {
        createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
        .then ( async (userCredential) => {
            if (userCredential){

                // Get user ID
                let uid: string = userCredential.user.uid;

                // Saves username as displayName in firebase auth user profile
                updateProfile(userCredential.user, {
                    displayName: username
                });

                // Move functions to firebaseService later

                await setDoc(doc(FIRESTORE_DB, "user", uid), {
                    friends_list_id: uid,
                    wishlist_id: uid
                });

                await setDoc(doc(FIRESTORE_DB, "friends_lists", uid), { /* create empty doc */ });

                await setDoc(doc(FIRESTORE_DB, "wishlists", uid), { /* create empty doc */ });

                router.replace("../(tabs)")
            }
        }).catch((err) => {
            alert(err?.message);
        });
    };

    return (
        <View className='h-full flex flex-col items-center justify-center relative'>
            {/* <Image source={logo} /> */}

            <TextInput 
                className='my-5 px-3 py-2'
                placeholder='Username'
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput 
                className='mb-5 px-3 py-2'
                placeholder='Email address'
                keyboardType='email-address'
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput 
                className='mb-5 px-3 py-2'
                placeholder='Password'
                textContentType='newPassword'
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
            />

            <Pressable className='px-5 py-1 mb-3 bg-blue-500 hover:bg-blue-600 text-white rounded' onPress={handleSignup}> 
                Sign up
            </Pressable>
            <Pressable className='px-5 py-1  underline '>
                <Link replace href="/login">Already have an account? Log in</Link>
            </Pressable>
        </View>
    );
};