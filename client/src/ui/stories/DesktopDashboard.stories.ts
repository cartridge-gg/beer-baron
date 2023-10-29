import type { Meta, StoryObj } from '@storybook/react';

import { DesktopDashboard } from '../screens/DesktopDashboard';

const meta = {
    title: 'screens/DesktopDashboard',
    component: DesktopDashboard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        beer: { control: true },
        seed: { control: true },
    },
} satisfies Meta<typeof DesktopDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Market: Story = {
    args: {},
};