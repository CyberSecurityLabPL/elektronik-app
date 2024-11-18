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
  closeButton: string
  svg: {
    topFlower: string
    bottomFlower: string
    lines: string
    circles: string
    smallCircles: string
    upperLine: string
    bottomLine: string
    square: string
    smallSquares: string
    multiplication: string
  }
  eventSvg: {
    halfCircle: string
    squares: string
    rotatedSquares: string
    pinkLines: string
    blueLines: string
    pinkStar: string
    blueStar: string
  }
}
