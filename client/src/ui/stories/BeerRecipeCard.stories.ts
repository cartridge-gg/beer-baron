import type { Meta, StoryObj } from '@storybook/react';

import { BeerRecipeCard, BeerID } from '../components/BeerCard';
import { starting_seed } from '@/utils';

const meta = {
    title: 'components/BeerRecipeCard',
    component: BeerRecipeCard,
    parameters: {
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        beer: { control: true },
        seed: { control: true },
    },
} satisfies Meta<typeof BeerRecipeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Lager: Story = {
    args: {
        beer: BeerID.TIPA,
        seed: starting_seed,
    },
};
