import type { Meta, StoryObj } from '@storybook/react';

import { IconTitle, Icons } from '../components/IconTitle';

const meta = {
    title: 'components/IconTitle',
    component: IconTitle,
    parameters: {
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        title: { control: true },
    },
} satisfies Meta<typeof IconTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Lager: Story = {
    args: {
        title: 'market',
        icon: Icons.PixelBeerMug,
    },
};
