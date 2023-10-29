import type { Meta, StoryObj } from '@storybook/react';

import { MarketContainer } from '../containers/MarketContainer';

const meta = {
    title: 'containers/MarketContainer',
    component: MarketContainer,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        beer: { control: true },
        seed: { control: true },
    },
} satisfies Meta<typeof MarketContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Market: Story = {
    args: {},
};