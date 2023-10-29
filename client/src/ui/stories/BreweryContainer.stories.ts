import type { Meta, StoryObj } from '@storybook/react';

import { BreweryContainer } from '../containers/BreweryContainer';

const meta = {
    title: 'containers/BreweryContainer',
    component: BreweryContainer,
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
} satisfies Meta<typeof BreweryContainer>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Lager: Story = {
    args: {},
};