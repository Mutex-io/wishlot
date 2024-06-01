import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { router } from 'expo-router';
import { WishItemType } from '../../constants/types';
import { addWishItemToUserWishlist } from '../firebaseService';
import Slider from '@react-native-community/slider';

export default function add() {
  const [wishItem, setWishItem] = useState<WishItemType>({
    title: '',
    desc: '',
    rate: 0,
    id: '',
  });

  // DUMMY USER ID FOR TESTING
  const userId = 'TfWgmgqOyMKm7rrsIXvR';

  const handleInputChange = (
    field: keyof WishItemType,
    value: string | number,
  ) => {
    setWishItem((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddItem = async () => {
    if (!wishItem.title) {
      window.alert('Validation Error Please fill in all required fields.');
      return;
    }

    const newItem = { ...wishItem, id: new Date().valueOf().toString() };

    try {
      const wishlistRef = await addWishItemToUserWishlist(userId, newItem);

      window.alert('Success Wish item added successfully!');
      console.log('added to wishlistRef: ', wishlistRef);
      setWishItem({ title: '', desc: '', rate: 0, id: '' }); // Reset form fields
      router.navigate('/');
    } catch (error) {
      console.error('Error adding wish item: ', error);
      window.alert('Error Failed to add wish item.');
    }
  };

  return (
    <View className='flex-1 justify-center items-center px-5 bg-gradient-to-r from-pink-500 to-purple-500'>
      <TextInput
        className='w-full h-12 mb-4 bg-white rounded-lg px-4 py-2 shadow-md'
        placeholder='Enter title'
        onChangeText={(text) => handleInputChange('title', text)}
        value={wishItem.title}
      />
      <TextInput
        className='w-full h-12 mb-4 bg-white rounded-lg px-4 py-2 shadow-md'
        placeholder='Enter description'
        onChangeText={(text) => handleInputChange('desc', text)}
        value={wishItem.desc}
      />
      <Text className='mb-2 text-white'>Rating: {wishItem.rate}</Text>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={0}
        maximumValue={10}
        step={1}
        value={wishItem.rate}
        onValueChange={(value) => handleInputChange('rate', value)}
        minimumTrackTintColor='#FFFFFF'
        maximumTrackTintColor='#000000'
      />

      <Button
        title='Add Wish Item'
        onPress={handleAddItem}
        disabled={!wishItem.title}
      />
    </View>
  );
}
