import type { Meta, StoryObj } from '@storybook/react';

import { FarmLandRow } from '../modules/FarmLandRow';

const meta = {
    title: 'modules/FarmLandRow',
    component: FarmLandRow,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof FarmLandRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Row: Story = {
    args: {},
};
