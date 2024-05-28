import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
  } from '@react-navigation/native';
  import { useFonts } from 'expo-font';
  import { Stack } from 'expo-router';
  import * as SplashScreen from 'expo-splash-screen';
  import { useEffect, useState } from 'react';
  import 'react-native-reanimated';
  import '../global.css';
  import { useColorScheme } from '@/hooks/useColorScheme';
  
  import { FIREBASE_AUTH } from '../firebaseConfig';
  import { onAuthStateChanged } from "firebase/auth";
  import { router } from 'expo-router';
  
  // Prevent the splash screen from auto-hiding before asset loading is complete.
  SplashScreen.preventAutoHideAsync();
  
  export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
      SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });
  
    const [authChecked, setAuthChecked] = useState<boolean>(false);
  
    useEffect(() => {
      onAuthStateChanged(FIREBASE_AUTH, (user) => {
          console.log("User: ", user)
          if (!user) {
              // User is not signed in, navigate to (auth)
              router.replace('/login');
          }
          setAuthChecked(true);
      });
    }, []);
  
    useEffect(() => {
      if (loaded && authChecked) {
        SplashScreen.hideAsync();
      }
    }, [loaded]);
  
    if (!loaded) {
      return null;
    }
  
    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
              headerShown: false,
          }}>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='+not-found' />
        </Stack>
      </ThemeProvider>
    );
  }
  