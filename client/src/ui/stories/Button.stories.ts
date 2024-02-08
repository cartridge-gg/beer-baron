import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../elements/button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'elements/Button',
    component: Button,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        variant: { control: 'default' },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const text = 'Brew';

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        variant: 'default',
        children: text,
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: text,
    },
};

export const Large: Story = {
    args: {
        variant: 'default',
        size: 'lg',
        children: text,
    },
};

export const Small: Story = {
    args: {
        variant: 'default',
        size: 'sm',
        children: text,
    },
};
