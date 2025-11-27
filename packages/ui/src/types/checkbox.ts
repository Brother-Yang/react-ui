import React from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  label?: React.ReactNode;
  onChange?: (checked: boolean) => void;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  style?: React.CSSProperties;
}

export interface CheckboxOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  options: CheckboxOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
  disabled?: boolean;
  layout?: 'horizontal' | 'vertical';
  className?: string;
  style?: React.CSSProperties;
}
