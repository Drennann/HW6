import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme, View } from "react-native"
import { BottomNavigationBar, Icon, IconTypes } from "../components"
import { useNavigation } from "@react-navigation/native"
import { AccountHistoryScreen } from "../screens"
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
export type HomeTabParamList = {
  Dashboard: undefined
  Cards: undefined
  AccountHistory: undefined
  Payments: undefined
}

type HomeTabNavigation = BottomTabNavigationProp<HomeTabParamList>

const Tab = createBottomTabNavigator<HomeTabParamList>()

export const HomeTab = observer(function HomeTab() {
  const navigationHeaderOptions = useNavigationHeaderOptions()

  const colorScheme = useColorScheme()
  const colorActive = "#523CF8"
  const colorInactive = colorScheme === "light" ? "#DCDCDC" : "#646464"
  const renderTabBarIcon = ({ icon, focused }: { icon: IconTypes; focused: boolean }) => (
    <Icon size={24} color={focused ? colorActive : colorInactive} icon={icon} />
  )

  return (
    <Tab.Navigator
      initialRouteName="AccountHistory"
      screenOptions={navigationHeaderOptions}
      tabBar={(props) => <BottomNavigationBar {...props} />}
    >
      <Tab.Screen
        name="Dashboard"
        component={View}
        options={{
          title: "Dashboard",
          tabBarIcon: ({ focused }) => renderTabBarIcon({ focused, icon: "wallet" }),
        }}
      />
      <Tab.Screen
        name="Cards"
        component={View}
        options={{
          title: "Cards",
          tabBarIcon: ({ focused }) => renderTabBarIcon({ focused, icon: "card" }),
        }}
      />
      <Tab.Screen
        name="AccountHistory"
        component={AccountHistoryScreen}
        options={{
          title: "Account History",
          tabBarIcon: ({ focused }) => renderTabBarIcon({ focused, icon: "analytics" }),
        }}
      />
      <Tab.Screen
        name="Payments"
        component={View}
        options={{
          title: "Payments",
          tabBarIcon: ({ focused }) => renderTabBarIcon({ focused, icon: "payments" }),
        }}
      />
    </Tab.Navigator>
  )
})

export const useHomeTabNavigation = () => useNavigation<HomeTabNavigation>()
