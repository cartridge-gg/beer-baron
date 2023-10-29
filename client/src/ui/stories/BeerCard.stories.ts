import type { Meta, StoryObj } from '@storybook/react';

import { BeerCard, BeerID } from '../components/BeerCard';

const meta = {
    title: 'components/BeerCard',
    component: BeerCard,
    parameters: {
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        entity_id: { control: true }
    },
} satisfies Meta<typeof BeerCard>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Lager: Story = {
    args: {
        entity_id: '1'
    },
};