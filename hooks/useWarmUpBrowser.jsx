import React from 'react'
import * as WebBrowser from 'expo-web-browser'
import {useFonts} from "expo-font";
import expoWebBrowser from "expo-web-browser/src/ExpoWebBrowser";

export const userWarmUpBrowser = () => {
    React.useEffect(() => {
        void WebBrowser.warmUpAsync( )
        return ()=> {
            void WebBrowser.coolDownAsync()
        }
    }, [])
}