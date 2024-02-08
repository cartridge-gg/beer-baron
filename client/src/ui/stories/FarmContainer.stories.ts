import type { Meta, StoryObj } from '@storybook/react';

import { FarmContainer } from '../containers/FarmContainer';

const meta = {
    title: 'containers/FarmContainer',
    component: FarmContainer,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        beer: { control: true },
        seed: { control: true },
    },
} satisfies Meta<typeof FarmContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Market: Story = {
    args: {},
};
