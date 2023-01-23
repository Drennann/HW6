import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat"

export const customFontsToLoad = {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
}

const fonts = {
  montserrat: {
    normal: "Montserrat_400Regular",
    medium: "Montserrat_500Medium",
    semiBold: "Montserrat_600SemiBold",
    bold: "Montserrat_700Bold",
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.montserrat,
}
