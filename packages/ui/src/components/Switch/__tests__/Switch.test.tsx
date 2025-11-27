import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ConfigProvider, enUS } from '../../../config'
import Switch from '../Switch'

function wrap(ui: React.ReactNode) { return <ConfigProvider locale={enUS}>{ui}</ConfigProvider> }

describe('Switch', () => {
  it('readonly prevents toggle', () => {
    render(wrap(<Switch readOnly defaultChecked label="RO" />))
    const btn = screen.getByRole('switch')
    expect(btn).toHaveAttribute('aria-checked', 'true')
    fireEvent.click(btn)
    expect(btn).toHaveAttribute('aria-checked', 'true')
  })

  it('submits name/value via hidden checkbox when checked', () => {
    render(wrap(<form><Switch name="notify" value="yes" defaultChecked /></form>))
    const form = document.querySelector('form') as HTMLFormElement
    const data = new FormData(form)
    expect(data.get('notify')).toEqual('yes')
  })


  it('status class changes border color (error)', () => {
    render(wrap(<Switch status="error" />))
    const btn = screen.getByRole('switch')
    // class presence check; color assertion is out of scope
    expect(btn.parentElement?.className).toMatch('error')
  })
})
