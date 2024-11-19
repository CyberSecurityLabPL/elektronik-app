import { Colors } from "@/types/colors"

const primary = "#7293FF"

const colors = {
  primary,
  light: {
    primary,
    navIcon: "#686687",
    foreground: "#434356",
    foregroundSecondary: "#a09cc9",
    background: "#ffffff",
    backgroundSecondary: "#f5f6ff",
    closeButton:"#2D2D3A",
    svg: {
      topFlower: "#EBF0FF",
      bottomFlower: "#EBF0FF",
      lines: "#E3E9FC",
      circles: "#F6EEFA",
      smallCircles: "#F6EEFA",
      upperLine: "#EFEBFF",
      bottomLine: "#F2E1FD",
      square: "#D9ECF9",
      smallSquares: "#FFF3FA",
      multiplication: "#E7ECFF",
    },
    eventSvg: {
      halfCircle: "#FED6A7",
      squares: "#FFC27B",
      rotatedSquares: "#FFBD71",
      pinkLines: "#FC7DE0",
      blueLines: "#BFF2FF",
      pinkStar: "#FF82E3",
      blueStar: "#B9F0FF",
    },
  },
  dark: {
    primary,
    navIcon: "#5c5a74",
    foreground: "#b5b5d9",
    foregroundSecondary: "#5b5973",
    background: "#1a1a1f",
    backgroundSecondary: "#202127",
    closeButton: "#B6B6D9",
    svg: {
      topFlower: "#202C1C",
      bottomFlower: "#32244F",
      lines: "#382917",
      circles: "#2E182F",
      smallCircles: "#202C1C",
      upperLine: "#202C1C",
      bottomLine: "#3B2D57",
      square: "#1C3552",
      smallSquares: "#32244F",
      multiplication: "#32244F",
    },
    eventSvg: {
      halfCircle: "#FED6A7",
      squares: "#FFC27B",
      rotatedSquares: "#FFBD71",
      pinkLines: "#C027C2",
      blueLines: "#4449BD",
      pinkStar: "#A71EA9",
      blueStar: "#3053AD",
    },
  },
} satisfies Colors

export default colors
