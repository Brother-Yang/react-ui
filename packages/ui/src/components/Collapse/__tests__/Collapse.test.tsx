import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Collapse from '../Collapse'

describe('Collapse', () => {
  it('renders and toggles', () => {
    const { getByText, queryByText } = render(
      <Collapse items={[{ key: 'a', label: 'A', content: 'Content A' }]} />
    )
    expect(queryByText('Content A')).toBeNull()
    fireEvent.click(getByText('A'))
    expect(getByText('Content A')).toBeInTheDocument()
  })

  it('supports custom icon and right position', () => {
    const { container, getByText } = render(
      <Collapse
        iconPosition="right"
        iconRender={(opened) => (opened ? '-' : '+')}
        items={[{ key: 'a', label: 'A', content: 'Content A' }]}
      />
    )
    const header = getByText('A').closest('button') as HTMLElement
    const spans = header.querySelectorAll('span')
    expect(spans[0].className.includes('collapse-label')).toBe(true)
    expect(spans[1].className.includes('collapse-icon')).toBe(true)
    expect(spans[1].textContent).toBe('+')
    fireEvent.click(getByText('A'))
    expect(spans[1].textContent).toBe('-')
  })

  it('accordion allows only one open at a time', () => {
    const { getByText, queryByText } = render(
      <Collapse
        accordion
        defaultActiveKeys={['a', 'b']}
        items={[
          { key: 'a', label: 'A', content: 'Content A' },
          { key: 'b', label: 'B', content: 'Content B' },
          { key: 'c', label: 'C', content: 'Content C' }
        ]}
      />
    )
    expect([Boolean(queryByText('Content A')), Boolean(queryByText('Content B'))].filter(Boolean).length).toBe(1)
    fireEvent.click(getByText('B'))
    expect(queryByText('Content A')).toBeNull()
    expect(getByText('Content B')).toBeInTheDocument()
    fireEvent.click(getByText('B'))
    expect(queryByText('Content B')).toBeNull()
  })
})
