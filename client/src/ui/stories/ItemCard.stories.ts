import type { Meta, StoryObj } from '@storybook/react';

import { ItemCard, Seeds } from '../components/ItemCard';

const meta = {
    title: 'components/ItemCard',
    component: ItemCard,
    parameters: {
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
} satisfies Meta<typeof ItemCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Chinook: Story = {
    args: {
        type: Seeds.ChinookSeeds,
    },
};

export const Galaxy: Story = {
    args: {
        type: Seeds.GalaxySeeds,
    },
};
