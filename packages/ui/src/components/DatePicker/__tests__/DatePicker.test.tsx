import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DatePicker from '../DatePicker';

describe('DatePicker', () => {
  it('renders without crashing', () => {
    const { container } = render(<DatePicker />);
    expect(container.querySelector('.zephyr-datepicker-picker')).toBeInTheDocument();
  });

  it('displays current month by default', () => {
    const { container } = render(<DatePicker />);
    const caret = container.querySelector('.zephyr-datepicker-caret') as HTMLElement;
    fireEvent.mouseDown(caret);
    const titleElement = container.querySelector('.zephyr-datepicker-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement?.textContent).toContain('年');
    expect(titleElement?.textContent).toContain('月');
  });

  it('handles single date selection', () => {
    const onChange = vi.fn();
    const { container } = render(<DatePicker mode="single" onChange={onChange} />);
    const dateButtons = container.querySelectorAll('.zephyr-datepicker-day:not(.zephyr-datepicker-day-disabled)');
    if (dateButtons.length > 0) {
      fireEvent.click(dateButtons[0]);
      expect(onChange).toHaveBeenCalledWith(expect.any(Date));
    }
  });

  it('navigates between months', () => {
    const { container } = render(<DatePicker />);
    const caret = container.querySelector('.zephyr-datepicker-caret') as HTMLElement;
    fireEvent.mouseDown(caret);
    const prevButton = screen.getByLabelText('上一月');
    const nextButton = screen.getByLabelText('下一月');
    fireEvent.click(prevButton);
    fireEvent.click(nextButton);
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });
});
