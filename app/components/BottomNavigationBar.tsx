import * as React from "react"
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { ViewThemed } from "./ViewThemed"

export interface BottomNavigationBarProps extends BottomTabBarProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

export const BottomNavigationBar = observer(function BottomNavigationBar(
  props: BottomNavigationBarProps,
) {
  const { style, state, descriptors, navigation } = props
  const $insetsStyle = useSafeAreaInsetsStyle(["bottom"], "padding")
  const $styles = [$container, style, $insetsStyle]

  return (
    <ViewThemed style={$styles}>
      <View style={$navbar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]
          const isFocused = state.index === index
          const icon = options.tabBarIcon?.({ focused: isFocused, color: "", size: 0 })

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true, params: {} })
            }
          }

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            })
          }

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={$navbarButton}
            >
              {icon}
            </TouchableOpacity>
          )
        })}
      </View>
    </ViewThemed>
  )
})

const $container: ViewStyle = {
  position: "absolute",
  left: 0,
  bottom: 0,
  right: 0,
  borderTopLeftRadius: 25,
  borderTopRightRadius: 25,
}

const $navbar: ViewStyle = {
  flexDirection: "row",
  height: 62,
  width: "100%",
  justifyContent: "space-around",
  alignItems: "center",
}

const $navbarButton: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  width: 48,
  height: 48,
}
