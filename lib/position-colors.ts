import type { Employee } from "@/lib/organization-data"

export interface PositionColorConfig {
  bg: string
  border: string
  text: string
  label: string
  accent: string
}

// Unique color for each position - Japanese organizational hierarchy
export const positionColors: Record<string, PositionColorConfig> = {
  // Executive level - Deep colors
  代表取締役社長: {
    bg: "bg-[oklch(0.32_0.14_264)]",
    border: "border-[oklch(0.32_0.14_264)]",
    text: "text-white",
    accent: "from-[oklch(0.32_0.14_264)] to-[oklch(0.42_0.12_264)]",
    label: "代表取締役社長",
  },
  取締役部長: {
    bg: "bg-[oklch(0.38_0.13_260)]",
    border: "border-[oklch(0.38_0.13_260)]",
    text: "text-white",
    accent: "from-[oklch(0.38_0.13_260)] to-[oklch(0.48_0.11_260)]",
    label: "取締役部長",
  },

  // Manager level - Medium blues and teals
  課長: {
    bg: "bg-[oklch(0.50_0.12_264)]",
    border: "border-[oklch(0.50_0.12_264)]",
    text: "text-white",
    accent: "from-[oklch(0.50_0.12_264)] to-[oklch(0.60_0.10_264)]",
    label: "課長",
  },
  農園責任者: {
    bg: "bg-[oklch(0.52_0.12_180)]",
    border: "border-[oklch(0.52_0.12_180)]",
    text: "text-white",
    accent: "from-[oklch(0.52_0.12_180)] to-[oklch(0.62_0.10_180)]",
    label: "農園責任者",
  },
  販売担当: {
    bg: "bg-[oklch(0.50_0.13_160)]",
    border: "border-[oklch(0.50_0.13_160)]",
    text: "text-white",
    accent: "from-[oklch(0.50_0.13_160)] to-[oklch(0.60_0.11_160)]",
    label: "販売担当",
  },

  // Staff level - Light blues and cyans
  現場担当: {
    bg: "bg-[oklch(0.68_0.09_264)]",
    border: "border-[oklch(0.68_0.09_264)]",
    text: "text-foreground",
    accent: "from-[oklch(0.68_0.09_264)] to-[oklch(0.75_0.07_264)]",
    label: "現場担当",
  },
  管理事務: {
    bg: "bg-[oklch(0.65_0.10_200)]",
    border: "border-[oklch(0.65_0.10_200)]",
    text: "text-foreground",
    accent: "from-[oklch(0.65_0.10_200)] to-[oklch(0.72_0.08_200)]",
    label: "管理事務",
  },
  スタッフ: {
    bg: "bg-[oklch(0.62_0.11_220)]",
    border: "border-[oklch(0.62_0.11_220)]",
    text: "text-foreground",
    accent: "from-[oklch(0.62_0.11_220)] to-[oklch(0.70_0.09_220)]",
    label: "スタッフ",
  },

  // Contractor level - Distinct teal/cyan
  運転委託: {
    bg: "bg-[oklch(0.58_0.13_180)]",
    border: "border-[oklch(0.58_0.13_180)]",
    text: "text-white",
    accent: "from-[oklch(0.58_0.13_180)] to-[oklch(0.68_0.11_180)]",
    label: "運転委託",
  },
}

export function getPositionColor(position: string): PositionColorConfig {
  return (
    positionColors[position] || {
      bg: "bg-[oklch(0.72_0.07_264)]",
      border: "border-[oklch(0.72_0.07_264)]",
      text: "text-foreground",
      accent: "from-[oklch(0.72_0.07_264)] to-[oklch(0.78_0.05_264)]",
      label: position,
    }
  )
}

export function getPositionColorByType(type: Employee["type"]): PositionColorConfig {
  switch (type) {
    case "executive":
      return {
        bg: "bg-[oklch(0.32_0.14_264)]",
        border: "border-[oklch(0.32_0.14_264)]",
        text: "text-white",
        accent: "from-[oklch(0.32_0.14_264)] to-[oklch(0.42_0.12_264)]",
        label: "役員",
      }
    case "manager":
      return {
        bg: "bg-[oklch(0.50_0.12_264)]",
        border: "border-[oklch(0.50_0.12_264)]",
        text: "text-white",
        accent: "from-[oklch(0.50_0.12_264)] to-[oklch(0.60_0.10_264)]",
        label: "管理職",
      }
    case "contractor":
      return {
        bg: "bg-[oklch(0.58_0.13_180)]",
        border: "border-[oklch(0.58_0.13_180)]",
        text: "text-white",
        accent: "from-[oklch(0.58_0.13_180)] to-[oklch(0.68_0.11_180)]",
        label: "委託",
      }
    default:
      return {
        bg: "bg-[oklch(0.68_0.09_264)]",
        border: "border-[oklch(0.68_0.09_264)]",
        text: "text-foreground",
        accent: "from-[oklch(0.68_0.09_264)] to-[oklch(0.75_0.07_264)]",
        label: "社員",
      }
  }
}
