import type { Meta, StoryObj } from '@storybook/react';

import { ItemRow } from '../modules/ItemRow';
import { Seeds } from '../components/ItemCard';

const meta = {
    title: 'modules/ItemRow',
    component: ItemRow,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        title: { control: true },
        items: { control: true },
    },
} satisfies Meta<typeof ItemRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SeedRow: Story = {
    args: {
        title: 'seeds',
        items: [
            {
                type: Seeds.ChinookSeeds,
            },
            {
                type: Seeds.CintraSeeds,
            },
            {
                type: Seeds.FuggleSeeds,
            },
        ],
    },
};
