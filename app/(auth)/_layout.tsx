import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function AuthLayout() {
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack initialRouteName='login' >
                <Stack.Screen name='login' options={{ title: 'Login', headerShown: false }} />
                <Stack.Screen name='signup' options={{ title: 'Signup', headerShown: false }} />
            </Stack>
        </ThemeProvider>
    );
}
