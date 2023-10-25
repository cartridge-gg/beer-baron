import type { Meta, StoryObj } from '@storybook/react';

import { ItemCard, ItemType } from '../components/ItemCard';

const meta = {
    title: 'components/ItemCard',
    component: ItemCard,
    parameters: {
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        name: { control: true },
        price: { control: true },
        quantity: { control: true },
    },
} satisfies Meta<typeof ItemCard>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Chinook: Story = {
    args: {
        name: "Chinook",
        price: 100.0,
        quantity: "100",
        type: ItemType.ChinookSeeds,
    },
};

export const Galaxy: Story = {
    args: {
        name: "Chinook",
        price: 100.0,
        quantity: "100",
        type: ItemType.GalaxySeeds,
    },
};
