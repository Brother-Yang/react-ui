import React from 'react'

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom'

export interface DrawerProps {
  open: boolean
  title?: React.ReactNode
  placement?: DrawerPlacement
  width?: number | string
  height?: number | string
  zIndex?: number
  maskClosable?: boolean
  keyboard?: boolean
  closable?: boolean
  closeIcon?: React.ReactNode
  destroyOnHidden?: boolean
  extra?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  onClose?: (e: React.MouseEvent | KeyboardEvent) => void
  children?: React.ReactNode
}

