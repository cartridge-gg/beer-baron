import type { Meta, StoryObj } from '@storybook/react';

import { IndulgenceAuctionTable } from '../modules/IndulgenceAuctionTable';

const meta = {
    title: 'modules/IndulgenceAuctionTable',
    component: IndulgenceAuctionTable,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof IndulgenceAuctionTable>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Indulgence: Story = {};
