import { RootState } from "@/redux/store"
import { View, type ViewProps } from 'react-native';
import { useSelector } from "react-redux"

export type Props = ViewProps & {
    variant?: any
    lightColor?: string;
    darkColor?: string;
};


const SkysoloView = ({ style, ...otherProps }: Props) => {
    const currentTheme = useSelector((state: RootState) => state.ThemeState.currentTheme)
    if (!currentTheme) return <View />
    return (
        <View style={[{ backgroundColor: `hsl(${currentTheme.primary})` }, style]} {...otherProps} />
    )
}

export default SkysoloView