import type { Meta, StoryObj } from '@storybook/react';

import { TradeTable } from '../modules/TradeTable';

const meta = {
    title: 'modules/TradeTable',
    component: TradeTable,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof TradeTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Row: Story = {
    args: {},
};
