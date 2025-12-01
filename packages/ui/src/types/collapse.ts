export type CollapseItem = { key: string; label: React.ReactNode; content: React.ReactNode; disabled?: boolean }

export interface CollapseProps {
  items: CollapseItem[]
  defaultActiveKeys?: string[]
  accordion?: boolean
  className?: string
  style?: React.CSSProperties
  onChange?: (activeKeys: string[]) => void
  iconRender?: (opened: boolean) => React.ReactNode
  iconPosition?: 'left' | 'right'
}
