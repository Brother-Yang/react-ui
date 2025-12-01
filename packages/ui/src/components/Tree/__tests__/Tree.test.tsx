import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Tree } from '..'

const data = [
  { key: 'a', title: 'A', children: [ { key: 'a1', title: 'A1' }, { key: 'a2', title: 'A2' } ] },
  { key: 'b', title: 'B', children: [ { key: 'b1', title: 'B1', children: [ { key: 'b1x', title: 'B1X' } ] } ] }
]

describe('Tree', () => {
  it('expand/collapse toggler works', () => {
    render(<Tree treeData={data} />)
    const togglers = screen.getAllByRole('button', { name: 'Expand' })
    fireEvent.click(togglers[0])
    expect(screen.getByText('A1')).toBeInTheDocument()
  })

  it('selection toggles single', () => {
    render(<Tree treeData={data} selectable />)
    fireEvent.click(screen.getByText('B'))
    fireEvent.click(screen.getByText('A'))
    expect(screen.getByText('A').parentElement?.parentElement).toHaveClass('zephyr-tree-selected')
  })

  it('check cascades to children', () => {
    render(<Tree treeData={data} checkable defaultExpandedKeys={['a']} />)
    const cb = screen.getAllByRole('checkbox')[0]
    fireEvent.click(cb)
    expect((screen.getByLabelText('Expand') as HTMLButtonElement)).toBeDefined()
    expect(screen.getAllByRole('checkbox')[0]).toBeChecked()
    expect(screen.getByText('A1').previousSibling).toBeDefined()
  })
})
