import type { Meta, StoryObj } from '@storybook/react';

import { FancyTitle } from '../components/FancyTitle';

const meta = {
    title: 'components/FancyTitle',
    component: FancyTitle,
    parameters: {
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        title: { control: true },
    },
} satisfies Meta<typeof FancyTitle>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Lager: Story = {
    args: {
        title: 'market'
    },
};