import React, { useEffect, useState } from 'react';
import { View, Pressable, Text, FlatList } from 'react-native';

export interface WishItem {
  title: string;
  desc: string;
  rate: number;
  id: string;
}

export default function HomeScreen() {
  const [wishlist, setWishlist] = useState<WishItem[]>([]);
  const [wishItem, setWishItem] = useState('');

  const dummyData = [
    {
      id: '1',
      title: 'New Laptop',
      desc: 'Latest model, high performance for gaming',
      rate: 5,
    },
    {
      id: '2',
      title: 'Smartphone',
      desc: 'High battery life and good camera',
      rate: 4,
    },
  ];

  useEffect(() => {
    setWishlist(dummyData);
  }, []);

  const renderWishItem = ({ item }: { item: WishItem }) => (
    <View className='flex-1 items-center justify-center bg-red-500'>
      <Pressable className='flex-row items-center justify-between w-full'>
        <Text className='flex-1 px-1'>{item.title}</Text>
        <Text className='flex-1 px-1'>{item.desc}</Text>
        <Text className='flex-1 px-1'>{item.rate}</Text>
      </Pressable>
    </View>
  );

  return (
    <View className='mx-5 bg-red-500'>
      {wishlist.length > 0 && (
        <FlatList
          data={wishlist}
          renderItem={renderWishItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}
