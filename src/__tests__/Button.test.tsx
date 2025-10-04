import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from 'antd';

describe('AntD Button', () => {
  it('renders and handles click', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const user = userEvent.setup(); // ✅ create user event instance
    const btn = screen.getByRole('button', { name: /click me/i });

    await user.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
