import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ConfigProvider, enUS } from '../../../config'
import RadioGroup from '../RadioGroup'

function wrap(ui: React.ReactNode) {
  return <ConfigProvider locale={enUS}>{ui}</ConfigProvider>
}

describe('Radio a11y extras', () => {
  it('radiogroup labelledby associates to label element', () => {
    render(wrap(<RadioGroup label={'Fruits'} options={[{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }]} />))
    const group = screen.getByRole('radiogroup')
    const id = group.getAttribute('aria-labelledby')!
    const labelEl = document.getElementById(id)!
    expect(labelEl.textContent).toBe('Fruits')
  })

  it('each option has aria-posinset and aria-setsize', () => {
    render(wrap(<RadioGroup options={[{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }, { label: 'C', value: 'c' }]} />))
    const radios = screen.getAllByRole('radio').filter(el => el.tagName === 'LABEL') as HTMLElement[]
    expect(radios[0]).toHaveAttribute('aria-posinset', '1')
    expect(radios[1]).toHaveAttribute('aria-posinset', '2')
    expect(radios[2]).toHaveAttribute('aria-posinset', '3')
    radios.forEach(r => expect(r).toHaveAttribute('aria-setsize', '3'))
  })

  it('readonly group prevents change', () => {
    render(wrap(<RadioGroup readOnly options={[{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }]} defaultValue={'a'} />))
    const bLabel = screen.getByText('B').closest('label')!
    const bInput = bLabel.querySelector('input') as HTMLInputElement
    fireEvent.click(bLabel)
    expect(bInput.checked).toBe(false)
  })

  it('single focus item via tabIndex and arrow keys moves focus', () => {
    render(wrap(<RadioGroup options={[{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }]} defaultValue={'a'} />))
    const inputs = document.querySelectorAll<HTMLInputElement>('input[type="radio"]')
    expect(inputs[0].tabIndex).toBe(0)
    expect(inputs[1].tabIndex).toBe(-1)
    const group = screen.getByRole('radiogroup')
    group.focus()
    fireEvent.keyDown(group, { key: 'ArrowRight' })
    expect(document.activeElement).toBe(inputs[1])
    expect(inputs[1].tabIndex).toBe(0)
  })
})
