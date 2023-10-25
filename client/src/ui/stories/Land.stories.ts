import type { Meta, StoryObj } from '@storybook/react';

import { Land } from '../components/Land';

const meta = {
    title: 'components/Land',
    component: Land,
    parameters: {
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        landType: { control: 2 },
        active: { control: true },
    },
} satisfies Meta<typeof Land>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Primary: Story = {
    args: {
        landType: 1,
        active: true,
    },
};