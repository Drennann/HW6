import { StyleProp, useColorScheme } from "react-native"

type ColorSchemeName = "dark" | "light"

export const useColorSchemeStyle = <T>(styles: {
  [key in ColorSchemeName]: StyleProp<T> | undefined
}) => {
  const colorTheme = useColorScheme()
  return colorTheme ? styles[colorTheme] : undefined
}
