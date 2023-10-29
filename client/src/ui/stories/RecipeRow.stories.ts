import type { Meta, StoryObj } from '@storybook/react';

import { RecipeRow } from '../modules/RecipeRow';

const meta = {
    title: 'modules/RecipeRow',
    component: RecipeRow,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof RecipeRow>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Row: Story = {
    args: {},
};