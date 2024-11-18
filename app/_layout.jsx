import * as SecureStore from 'expo-secure-store'
import {Slot, Stack} from "expo-router";
import {useFonts} from "expo-font";
import {ClerkLoaded, ClerkProvider, SignedIn, SignedOut} from '@clerk/clerk-expo'
import LoginScreen from "../components/loginScreen";
import {StatusBar} from "react-native";

const tokenCache = {
    async getToken(key) {
        try {
            const item = await SecureStore.getItemAsync(key)
            if (item) {
                console.log(`${key} was used \n`)
            } else {
                console.log('No values stored under key: ' + key)
            }
            return item
        } catch (error) {
            console.error('SecureStore get item error: ', error)
            await SecureStore.deleteItemAsync(key)
            return null
        }
    },
    async saveToken(key, value) {
        try {
            return SecureStore.setItemAsync(key, value)
        } catch (err) {
            return console.log(err)
        }
    },
}

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
    throw new Error(
        'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
    )
}
export default function RootLayout() {
    useFonts({
        "outfit": require("../assets/fonts/Outfit-Medium.ttf")
    })

    return (
        <>
            <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
                <ClerkLoaded>
                    <SignedIn>
                        <Stack screenOptions={{headerShown: false}}>
                            <Slot/>
                            <Stack.Screen name="(tabs)"/>
                        </Stack>
                    </SignedIn>
                    <SignedOut>

                        <LoginScreen/>
                    </SignedOut>
                </ClerkLoaded>
            </ClerkProvider>
        </>
    );
}

