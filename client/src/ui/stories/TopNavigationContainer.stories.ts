import type { Meta, StoryObj } from '@storybook/react';

import { TopNavigationContainer } from '../containers/TopNavigationContainer';

const meta = {
    title: 'containers/TopNavigationContainer',
    component: TopNavigationContainer,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        beer: { control: true },
        seed: { control: true },
    },
} satisfies Meta<typeof TopNavigationContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Market: Story = {
    args: {},
};