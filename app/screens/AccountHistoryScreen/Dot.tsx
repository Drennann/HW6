import React, { useEffect } from "react"
import { StyleProp, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

export interface DotProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  isActive?: boolean
}

/**
 * Describe your component here
 */
export const Dot = observer(function Dot(props: DotProps) {
  const { isActive } = props
  const isActiveSharedValue = useSharedValue(1)

  const scaleUp = () => {
    isActiveSharedValue.value = withTiming(1, { duration: 250 })
  }

  const scaleDown = () => {
    isActiveSharedValue.value = withTiming(0, { duration: 250 })
  }

  useEffect(() => {
    if (isActive) scaleUp()
    else scaleDown()
  }, [isActive])

  const $animation = useAnimatedStyle(() => {
    const scale = interpolate(isActiveSharedValue.value, [0, 1], [1, 2])
    const borderWidth = interpolate(isActiveSharedValue.value, [0, 1], [3, 1])

    return {
      transform: [{ scale }],
      borderWidth,
    }
  })

  return <Animated.View style={[$dot, $animation]} />
})

const $dot: ViewStyle = {
  marginHorizontal: 6,
  width: 6,
  height: 6,
  borderRadius: 3,
  borderWidth: 2,
  borderColor: "white",
}
