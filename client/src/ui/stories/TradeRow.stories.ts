import type { Meta, StoryObj } from '@storybook/react';

import { TradeRow } from '../components/TradeRow';

const meta = {
    title: 'components/TradeRow',
    component: TradeRow,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof TradeRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Row: Story = {
    args: {
        trade: {},
    },
};
