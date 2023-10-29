import type { Meta, StoryObj } from '@storybook/react';

import { BreweryRow } from '../modules/BreweryRow';

const meta = {
    title: 'modules/BreweryRow',
    component: BreweryRow,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof BreweryRow>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Row: Story = {
    args: {},
};