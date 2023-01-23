import React from "react"
import { NativeStackNavigationOptions } from "@react-navigation/native-stack"
import { HeaderBackButton } from "../components"
import { typography } from "../theme"
import { useColorScheme } from "react-native"

type NavigationHeaderOptions = Pick<
  NativeStackNavigationOptions,
  | "statusBarColor"
  | "headerTitleStyle"
  | "headerTitleAlign"
  | "headerStyle"
  | "headerShadowVisible"
  | "headerBackTitleVisible"
  | "headerLeft"
>

export const useNavigationHeaderOptions = (): NavigationHeaderOptions => {
  const colorScheme = useColorScheme()

  const backgroundColor = colorScheme === "light" ? "#523CF8" : "#16110D"

  return {
    statusBarColor: backgroundColor,
    headerTitleStyle: {
      color: "white",
      fontFamily: typography.primary.semiBold,
      fontSize: 17,
    },
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: backgroundColor,
    },
    headerShadowVisible: false,
    headerBackTitleVisible: false,
    headerLeft: (props) => <HeaderBackButton {...props} />,
  }
}
