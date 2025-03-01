import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Home = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-rubik-extrabold text-lg">
        Welcome to ReadBlendr
      </Text>
      <Link href="/sign-in">Sign In</Link>
      <Link href="/explore">Explore</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/books/1">Book</Link>
    </View>
  );
};

export default Home;
