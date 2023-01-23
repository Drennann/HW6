/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import React from "react"
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack"
import { HomeTab } from "./HomeTab"
import { TransactionListScreen } from "../screens"
import { useNavigationHeaderOptions } from "./useNavigationHeaderOptions"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  HomeTab: undefined
  TransactionList: undefined
}

const Stack = createNativeStackNavigator<AppStackParamList>()

export const AppStack = observer(function AppTab() {
  const navigationHeaderOptions = useNavigationHeaderOptions()
  return (
    <Stack.Navigator screenOptions={navigationHeaderOptions}>
      <Stack.Screen name="HomeTab" component={HomeTab} options={{ headerShown: false }} />
      <Stack.Screen
        name="TransactionList"
        component={TransactionListScreen}
        options={{ title: "Transactions" }}
      />
    </Stack.Navigator>
  )
})

type AppStackNavigation = NativeStackNavigationProp<AppStackParamList>
export const useAppStackNavigation = () => useNavigation<AppStackNavigation>()
