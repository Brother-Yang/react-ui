import React from 'react'

export type TreeNode = {
  key: string
  title: React.ReactNode
  children?: TreeNode[]
  disabled?: boolean
}

export interface TreeProps {
  treeData: TreeNode[]
  defaultExpandedKeys?: string[]
  expandedKeys?: string[]
  onExpand?: (keys: string[]) => void
  selectable?: boolean
  multiple?: boolean
  selectedKeys?: string[]
  defaultSelectedKeys?: string[]
  onSelect?: (keys: string[], node: TreeNode) => void
  checkable?: boolean
  checkedKeys?: string[]
  defaultCheckedKeys?: string[]
  onCheck?: (keys: string[], node: TreeNode, info: { checked: boolean; nodeKey: string }) => void
  showIcon?: boolean
  iconRender?: (node: TreeNode) => React.ReactNode
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
}

