import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Drawer } from '..'

describe('Drawer', () => {
  it('renders when open and shows title/body', () => {
    render(<Drawer open title="Title">Body</Drawer>)
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
  })

  it('mask click closes when maskClosable', () => {
    const onClose = vi.fn()
    render(<Drawer open title="T" onClose={onClose} />)
    const mask = document.querySelector('.zephyr-drawer-mask') as HTMLElement
    fireEvent.click(mask)
    expect(onClose).toHaveBeenCalled()
  })

  it('keyboard escape triggers onClose', () => {
    const onClose = vi.fn()
    render(<Drawer open title="T" onClose={onClose} />)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalled()
  })

  it('respects placement classes', () => {
    render(<Drawer open title="T" placement="left" />)
    const wrapper = document.querySelector('.zephyr-drawer-wrapper') as HTMLElement
    expect(wrapper.className).toContain('zephyr-drawer-left')
  })
})

