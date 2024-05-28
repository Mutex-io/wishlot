import { View, Text, Pressable } from 'react-native';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { router } from 'expo-router';

const setting = () => {

    const handleSignOut = () => {
        signOut(FIREBASE_AUTH);
        router.replace("/");
    };

    return (
        <View className='flex items-center relative'>
            {/* <Text>Setting Page</Text> */}
            <Pressable className='px-5 py-1 mb-3 bg-blue-500 hover:bg-blue-600 text-white rounded' onPress={handleSignOut}> 
                Sign out
            </Pressable>
        </View>
    );
};

export default setting;
