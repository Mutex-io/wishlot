import React, { useEffect, useState } from 'react';
import { View, Pressable, Text, FlatList } from 'react-native';
import { WishItemType, WishListType } from '../../constants/types';
import { fetchWishItemsFromUserWishlist } from '../firebaseService';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function HomeScreen() {
  const [wishList, setWishList] = useState<WishListType>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // DUMMY USER ID FOR TESTING
  const userId = 'TfWgmgqOyMKm7rrsIXvR';

  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        const items = await fetchWishItemsFromUserWishlist(userId);
        setWishList(items);
      } catch (error) {
        window.alert('Error fetching wish items');
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  const renderItem = ({ item }: { item: WishItemType }) => (
    <Pressable
      className='flex-1 m-1 p-2 bg-pink-200 rounded-lg justify-center items-center h-40'
      onPress={() => console.log('Item pressed:', item.id)} // Replace this with actual navigation if needed
    >
      <Text className='text-lg font-bold mb-1'>{item.title}</Text>
      <Text className='ext-sm text-gray-70 mb-2'>{item.desc}</Text>
      <AnimatedCircularProgress
        size={60}
        width={5}
        fill={item.rate * 10}
        tintColor='#00e0ff'
        onAnimationComplete={() => console.log('Rating animation complete!')}
        backgroundColor='#3d5875'
      >
        {(fill) => (
          <Text className='text-xs text-blue-500'>
            {`${Math.round(fill)}%`}
          </Text>
        )}
      </AnimatedCircularProgress>
    </Pressable>
  );

  return (
    <View className='flex-1 p-2 justify-center'>
      {loading ? (
        <Text className='text-lg text-blue-500'>Loading...</Text>
      ) : (
        <FlatList
          data={wishList}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={2}
        />
      )}
    </View>
  );
}
