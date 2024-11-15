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
  },
} satisfies Colors

export default colors
