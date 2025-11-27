import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ConfigProvider, enUS } from '../../../config'
import Checkbox from '../Checkbox'
import CheckboxGroup from '../CheckboxGroup'

function wrap(ui: React.ReactNode) {
  return <ConfigProvider locale={enUS}>{ui}</ConfigProvider>
}

describe('Checkbox', () => {
  it('applies size classes', () => {
    render(wrap(<Checkbox size="small" label="Small" />))
    const root = screen.getByText('Small').closest('label')!
    expect(root.className).toMatch('checkbox-small')
  })

  it('sets aria-checked mixed when indeterminate', () => {
    render(wrap(<Checkbox indeterminate label="Mix" />))
    const root = screen.getByText('Mix').closest('label')!
    expect(root).toHaveAttribute('aria-checked', 'mixed')
  })

  it('label click toggles', () => {
    render(wrap(<Checkbox label="Toggle" />))
    const label = screen.getByText('Toggle').closest('label')!
    const input = label.querySelector('input') as HTMLInputElement
    expect(input.checked).toBe(false)
    fireEvent.click(label)
    expect(input.checked).toBe(true)
  })

  it('group toggles and respects disabled', () => {
    render(wrap(<CheckboxGroup options={[{ label: 'A', value: 'a' }, { label: 'B', value: 'b', disabled: true }]} />))
    const aLabel = screen.getByText('A').closest('label')!
    const bLabel = screen.getByText('B').closest('label')!
    const aInput = aLabel.querySelector('input') as HTMLInputElement
    const bInput = bLabel.querySelector('input') as HTMLInputElement
    fireEvent.click(aLabel)
    expect(aInput.checked).toBe(true)
    fireEvent.click(bLabel)
    expect(bInput.checked).toBe(false)
  })
})
