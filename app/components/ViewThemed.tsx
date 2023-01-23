import * as React from "react"
import { useColorScheme, View, ViewProps } from "react-native"
import { observer } from "mobx-react-lite"

export interface ViewThemedProps extends ViewProps {}

export const ViewThemed = observer(function ViewThemed(props: ViewThemedProps) {
  const { style, ...otherProps } = props
  const colorScheme = useColorScheme()
  const $styles = [{ backgroundColor: colorScheme === "light" ? "white" : "#2F2E33" }, style]

  return <View style={$styles} {...otherProps} />
})
