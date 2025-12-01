export type TimelineItem = { key: string; label?: React.ReactNode; content: React.ReactNode; status?: 'default' | 'success' | 'warning' | 'error' }

export interface TimelineProps {
  items: TimelineItem[]
  orientation?: 'vertical' | 'horizontal'
  className?: string
  style?: React.CSSProperties
}
