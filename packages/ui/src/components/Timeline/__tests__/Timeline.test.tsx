import React from 'react'
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Timeline from '../Timeline'

describe('Timeline', () => {
  it('renders items', () => {
    const { getByText } = render(
      <Timeline items={[{ key: 'a', content: 'A' }, { key: 'b', content: 'B', status: 'success' }]} />
    )
    expect(getByText('A')).toBeInTheDocument()
    expect(getByText('B')).toBeInTheDocument()
  })
})

