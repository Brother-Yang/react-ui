export interface TooltipProps {
  title: React.ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}
