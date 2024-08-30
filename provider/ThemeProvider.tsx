export type Theme = "light" | "dark" | "system";
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { changeTheme, setThemeLoaded } from "@/redux/slice/theme";
import { StatusBar, View, Appearance } from 'react-native';
import { localStorage } from '@/lib/LocalStorage';
import { ThemeNames } from '@/components/skysolo-ui/colors';

const ThemeProvider = () => {
    const dispatch = useDispatch()
    const themeLoaded = useSelector((state: RootState) => state.ThemeState.themeLoaded, (prev, next) => prev === next)

    const GetLocalStorageThemeValue = useCallback(async () => {
        const localValueSchema = await localStorage("get", "skysolo-theme") as Theme
        const localValueTheme = await localStorage("get", "skysolo-theme-name") as ThemeNames
        if (!localValueTheme || !localValueSchema) {
            dispatch(setThemeLoaded({
                userThemeName: "Violet",
                userColorScheme: "light"
            }))
            return
        }
        if (localValueSchema === "system") {
            return
        }
        // console.log("Local Value Schema", localValueSchema, localValueTheme)
        dispatch(setThemeLoaded({
            userThemeName: localValueTheme ?? "Zinc",
            userColorScheme: localValueSchema ?? "light"
        }))
    }, [])

    const onChangeTheme = useCallback(async (theme: Theme) => {
        // console.log("Change Theme", theme)
        if (!theme) return console.error("Theme is not defined")
        if (theme === "system") {
            await localStorage("remove", "skysolo-theme")
            await localStorage("remove", "skysolo-theme-name")
            return
        }
        // console.log("changing Theme", theme)
        await localStorage("set", "skysolo-theme", theme)
        await localStorage("set", "skysolo-theme-name", "Zinc")
        dispatch(changeTheme(theme))
    }, [])

    useEffect(() => {
        if (themeLoaded) {
            // console.log("Theme Loaded", themeLoaded)
            SplashScreen.hideAsync()
        }
    }, [themeLoaded])

    useEffect(() => {
        // console.log("Theme Provider")
        GetLocalStorageThemeValue()
        Appearance.addChangeListener(({ colorScheme }) => {
            onChangeTheme(colorScheme as Theme)
        })
    }, [])


    return <View style={{ paddingTop: StatusBar.currentHeight }} >
    </View>
}


export default ThemeProvider;