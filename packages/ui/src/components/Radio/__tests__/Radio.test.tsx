import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ConfigProvider, enUS } from '../../../config'
import Radio from '../Radio'
import RadioGroup from '../RadioGroup'

function wrap(ui: React.ReactNode) {
  return <ConfigProvider locale={enUS}>{ui}</ConfigProvider>
}

describe('Radio', () => {
  it('has aria-checked true when checked', () => {
    render(wrap(<Radio defaultChecked label="Checked" />))
    const label = screen.getByText('Checked').closest('label')!
    expect(label).toHaveAttribute('aria-checked', 'true')
  })

  it('group has role radiogroup and arrow keys change selection', () => {
    render(wrap(<RadioGroup options={[{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }]} defaultValue={'a'} />))
    const group = screen.getByRole('radiogroup')
    group.focus()
    fireEvent.keyDown(group, { key: 'ArrowRight' })
    const bLabel = screen.getByText('B').closest('label')!
    const bInput = bLabel.querySelector('input') as HTMLInputElement
    expect(bInput.checked).toBe(true)
  })

  it('name propagates to inputs and form submit returns chosen value', () => {
    render(wrap(
      <form>
        <RadioGroup name="fruit" options={[{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }]} defaultValue={'a'} />
      </form>
    ))
    const form = document.querySelector('form') as HTMLFormElement
    const data = new FormData(form as HTMLFormElement)
    expect(data.get('fruit')).toEqual('a')
  })
})
