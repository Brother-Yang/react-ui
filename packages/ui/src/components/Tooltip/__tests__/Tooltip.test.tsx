import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Tooltip from '../Tooltip'

describe('Tooltip', () => {
  it('shows on hover', () => {
    const { getByText, queryByRole } = render(
      <Tooltip title="Tip"><span>Target</span></Tooltip>
    )
    fireEvent.mouseEnter(getByText('Target'))
    expect(queryByRole('tooltip')).toBeInTheDocument()
  })
})

