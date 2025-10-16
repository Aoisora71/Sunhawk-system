import type { Employee } from "@/lib/organization-data"

export interface PositionColorConfig {
  bg: string
  border: string
  text: string
  label: string
}

// Position color mapping - Japanese organizational hierarchy
export const positionColors: Record<string, PositionColorConfig> = {
  // Executive level - Deep blue
  代表取締役社長: {
    bg: "bg-[oklch(0.35_0.12_264)]",
    border: "border-[oklch(0.35_0.12_264)]",
    text: "text-white",
    label: "代表取締役社長",
  },
  取締役部長: {
    bg: "bg-[oklch(0.42_0.12_264)]",
    border: "border-[oklch(0.42_0.12_264)]",
    text: "text-white",
    label: "取締役部長",
  },

  // Manager level - Medium blue
  課長: {
    bg: "bg-[oklch(0.55_0.12_264)]",
    border: "border-[oklch(0.55_0.12_264)]",
    text: "text-white",
    label: "課長",
  },
  農園責任者: {
    bg: "bg-[oklch(0.55_0.12_264)]",
    border: "border-[oklch(0.55_0.12_264)]",
    text: "text-white",
    label: "農園責任者",
  },

  // Staff level - Light blue
  現場担当: {
    bg: "bg-[oklch(0.70_0.08_264)]",
    border: "border-[oklch(0.70_0.08_264)]",
    text: "text-foreground",
    label: "現場担当",
  },
  管理事務: {
    bg: "bg-[oklch(0.70_0.08_264)]",
    border: "border-[oklch(0.70_0.08_264)]",
    text: "text-foreground",
    label: "管理事務",
  },
  スタッフ: {
    bg: "bg-[oklch(0.70_0.08_264)]",
    border: "border-[oklch(0.70_0.08_264)]",
    text: "text-foreground",
    label: "スタッフ",
  },

  // Contractor level - Teal
  運転委託: {
    bg: "bg-[oklch(0.60_0.12_180)]",
    border: "border-[oklch(0.60_0.12_180)]",
    text: "text-white",
    label: "運転委託",
  },

  // Sales/Business level - Green
  販売担当: {
    bg: "bg-[oklch(0.55_0.12_160)]",
    border: "border-[oklch(0.55_0.12_160)]",
    text: "text-white",
    label: "販売担当",
  },
}

export function getPositionColor(position: string): PositionColorConfig {
  return (
    positionColors[position] || {
      bg: "bg-[oklch(0.75_0.06_264)]",
      border: "border-[oklch(0.75_0.06_264)]",
      text: "text-foreground",
      label: position,
    }
  )
}

export function getPositionColorByType(type: Employee["type"]): PositionColorConfig {
  switch (type) {
    case "executive":
      return {
        bg: "bg-[oklch(0.35_0.12_264)]",
        border: "border-[oklch(0.35_0.12_264)]",
        text: "text-white",
        label: "役員",
      }
    case "manager":
      return {
        bg: "bg-[oklch(0.55_0.12_264)]",
        border: "border-[oklch(0.55_0.12_264)]",
        text: "text-white",
        label: "管理職",
      }
    case "contractor":
      return {
        bg: "bg-[oklch(0.60_0.12_180)]",
        border: "border-[oklch(0.60_0.12_180)]",
        text: "text-white",
        label: "委託",
      }
    default:
      return {
        bg: "bg-[oklch(0.70_0.08_264)]",
        border: "border-[oklch(0.70_0.08_264)]",
        text: "text-foreground",
        label: "社員",
      }
  }
}
