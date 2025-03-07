import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { Link, Redirect } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { useState } from "react";
import { icons, images } from "@/constants";
import { googleLogin, registerUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";

const SignUp = () => {
  const { refetch, loading, isLoggedIn } = useGlobalContext();

  if (!loading && isLoggedIn) return <Redirect href="/" />;

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields!");
    }

    setIsSubmitting(true);
    try {
      const result = await registerUser(
        form.email,
        form.password,
        form.username
      );

      if (result) {
        refetch();
      }
    } catch (error) {
      Alert.alert("Error", "Failed to register");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    const result = await googleLogin();

    if (result) {
      refetch();
    } else {
      Alert.alert("Error", "Failed to login");
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />

          <Text className="text-2xl text-semibold mt-10 font-rubik-semibold">
            Sign up to continue to ReadBlendr
          </Text>

          <TouchableOpacity
            onPress={handleGoogleLogin}
            className="bg-gray-100 shadow-md shadow-zinc-300 rounded-full w-full py-5 mt-7"
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>

          <View className="flex flex-row items-center mt-7">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="mx-4 text-gray-500 font-rubik-medium">or</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          <FormField
            title="Name"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={handleSubmit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg font-rubik">Already have an account?</Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-primary-300"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
