import React, { useMemo, useState } from 'react'
import type { CheckboxGroupProps } from '../../types/checkbox'
import { default as Checkbox } from './Checkbox'

export default function CheckboxGroup({
  options,
  value,
  defaultValue,
  onChange,
  disabled,
  layout = 'vertical',
  className = '',
  style,
}: CheckboxGroupProps) {
  const isControlled = value !== undefined
  const [internal, setInternal] = useState<string[]>(defaultValue || [])
  const current = (isControlled ? (value as string[]) : internal) || []

  const handleToggle = (val: string) => {
    if (disabled) return
    const exists = current.includes(val)
    const next = exists ? current.filter(v => v !== val) : [...current, val]
    if (!isControlled) setInternal(next)
    onChange?.(next)
  }

  const groupStyle = useMemo(() => ({ display: 'grid', gap: 8, ...(layout === 'horizontal' ? { gridAutoFlow: 'column' } : {}), ...style }), [layout, style])

  return (
    <div className={className} style={groupStyle}>
      {options.map(opt => (
        <Checkbox
          key={opt.value}
          label={opt.label}
          checked={current.includes(opt.value)}
          onChange={() => handleToggle(opt.value)}
          disabled={disabled || opt.disabled}
        />
      ))}
    </div>
  )
}
