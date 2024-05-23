import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { router } from 'expo-router';
import { WishItemType } from '../../constants/types';
import { addWishItem } from '../firebaseService';
import Slider from '@react-native-community/slider';

export default function add() {
  const [wishItem, setWishItem] = useState<WishItemType>({
    title: '',
    desc: '',
    rate: 0,
    id: '',
  });

  const handleInputChange = (
    field: keyof WishItemType,
    value: string | number,
  ) => {
    setWishItem((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddItem = async () => {
    try {
      const docId = await addWishItem(wishItem); // Assuming addWishItem returns a promise
      if (docId) {
        console.log('Document written with ID: ', docId);
        setWishItem({ title: '', desc: '', rate: 0, id: '' });
        router.navigate('/'); // TODO: for now redirect to home. later show success screen
      } else {
        window.alert('Error adding document');
      }
    } catch (error) {
      console.error('Error adding document: ', error);
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
        step={2}
        value={wishItem.rate}
        onValueChange={(value) => handleInputChange('rate', value)}
        minimumTrackTintColor='#FFFFFF'
        maximumTrackTintColor='#000000'
      />

      <Button
        title='Add Wish Item'
        onPress={handleAddItem}
        disabled={!wishItem.title || wishItem.rate === 0}
      />
    </View>
  );
}
