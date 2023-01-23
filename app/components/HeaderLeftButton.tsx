import * as React from "react"
import { TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"

export interface HeaderLeftButtonProps extends TouchableOpacityProps {}

export const HeaderLeftButton = observer(function HeaderLeftButton(props: HeaderLeftButtonProps) {
  const { style } = props
  const $styles = [$container, style]

  return <TouchableOpacity style={$styles} />
})

const $container: ViewStyle = {
  width: 48,
  height: 48,
  alignItems: "flex-start",
  justifyContent: "center",
}
