import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Form, { FormItem } from '../Form'
import Input from '../../Input/Input'

describe('Form', () => {
  it('onValuesChange is called with changed info', () => {
    const onValuesChange = vi.fn()
    render(
      <Form initialValues={{ username: '' }} onValuesChange={onValuesChange}>
        <FormItem name="username" label="Username" required>
          <Input />
        </FormItem>
      </Form>
    )
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'abc' } })
    expect(onValuesChange).toHaveBeenCalled()
    const args = onValuesChange.mock.calls[0]
    expect(args[1]).toEqual({ name: 'username', value: 'abc' })
  })

  it('validates on blur and sets aria-invalid and aria-describedby', () => {
    render(
      <Form initialValues={{ username: '' }} validateOnChange={false} validateOnBlur>
        <FormItem name="username" label="Username" required>
          <Input />
        </FormItem>
      </Form>
    )
    const input = screen.getByRole('textbox')
    fireEvent.blur(input)
    expect(input).toHaveAttribute('aria-invalid', 'true')
    const help = screen.getByText('This field is required')
    expect(help.id).toMatch(/form-help-username/)
    expect(input).toHaveAttribute('aria-describedby', help.id)
  })

  it('focuses first error on submit', () => {
    render(
      <Form initialValues={{ username: '' }} validateOnChange={false}>
        <FormItem name="username" label="Username" required>
          <Input />
        </FormItem>
        <button type="submit">Submit</button>
      </Form>
    )
    const btn = screen.getByRole('button', { name: 'Submit' })
    fireEvent.click(btn)
    expect(document.activeElement).toBe(screen.getByRole('textbox'))
  })
})
