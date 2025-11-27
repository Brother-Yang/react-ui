import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Select from '../Select'
import { ConfigProvider, enUS } from '../../../config'

function wrap(ui: React.ReactNode) {
  return <ConfigProvider locale={enUS}>{ui}</ConfigProvider>
}

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
]

describe('Select', () => {
  it('combobox a11y attributes and keyboard selection', () => {
    render(wrap(<Select options={options} />))
    const root = screen.getByRole('combobox')
    expect(root).toHaveAttribute('aria-expanded', 'false')
    root.focus()
    fireEvent.keyDown(root, { key: 'ArrowDown' })
    expect(root).toHaveAttribute('aria-expanded', 'true')
    fireEvent.keyDown(root, { key: 'Enter' })
    expect(screen.getByText('Apple')).toBeInTheDocument()
  })

  it('multi chips remove localized', () => {
    render(wrap(<Select options={options} multiple value={['apple', 'banana']} />))
    const removeBtns = screen.getAllByRole('button', { name: 'Remove' })
    expect(removeBtns.length).toBeGreaterThan(0)
  })

  it('does not open when disabled', () => {
    render(wrap(<Select options={options} disabled />))
    const root = screen.getByRole('combobox')
    fireEvent.click(root)
    expect(root).toHaveAttribute('aria-expanded', 'false')
  })

  it('shows no options message when empty', () => {
    render(wrap(<Select options={[]} />))
    const root = screen.getByRole('combobox')
    fireEvent.click(root)
    expect(screen.getByText('No options')).toBeInTheDocument()
  })
})
