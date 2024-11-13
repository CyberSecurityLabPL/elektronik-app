export interface Colors {
  primary: string
  light: ColorScheme
  dark: ColorScheme
}

export interface ColorScheme {
  primary: string
  navIcon: string
  foreground: string
  foregroundSecondary: string
  background: string
  backgroundSecondary: string
  svg: {
    topFlower: string
    bottomFlower: string
    lines: string
    circles: string
    smallCircles: string
    bottomLine: string
    lowerLine: string
    square: string
    smallSquares: string
    multiplication: string
  }
}
