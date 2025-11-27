import React from 'react';

export type RadioSize = 'small' | 'medium' | 'large';

export interface RadioProps<T extends string | number = string | number> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'checked' | 'value' | 'size'> {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  size?: RadioSize;
  value?: T;
  onChange?: (checked: boolean, value?: T) => void;
  label?: React.ReactNode;
  readOnly?: boolean;
  status?: 'error' | 'success' | 'warning';
  ariaPosinset?: number;
  ariaSetsize?: number;
  className?: string;
  style?: React.CSSProperties;
}

export interface RadioGroupOption<T extends string | number = string | number> {
  label: React.ReactNode;
  value: T;
  disabled?: boolean;
}

export interface RadioGroupProps<T extends string | number = string | number> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: RadioGroupOption<T>[];
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  disabled?: boolean;
  readOnly?: boolean;
  size?: RadioSize;
  direction?: 'horizontal' | 'vertical';
  name?: string;
  label?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
