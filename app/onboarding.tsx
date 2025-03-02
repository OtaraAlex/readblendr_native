import { ScrollView, Image, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const SignIn = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.hero}
          className="w-full h-4/6"
          resizeMode="contain"
        />

        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome to ReadBlendr
          </Text>
          <Text className="text-3xl font-rubik-bold text-center mt-2 text-black-300">
            Find the perfect read for you today!
          </Text>
        </View>

        <View className="px-2">
          <CustomButton
            title="Continue to Application"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-10"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
