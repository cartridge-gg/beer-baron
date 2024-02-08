import type { Preview } from '@storybook/react';
import { withRouter, reactRouterParameters } from 'storybook-addon-react-router-v6';
import '../src/index.css';

const preview: Preview = {
    decorators: [withRouter],
    parameters: {
        reactRouter: reactRouterParameters({
            location: {
                pathParams: { userId: '42' },
                searchParams: { tab: 'activityLog' },
                state: { fromPage: 'homePage' },
            },
            routing: {
                path: '/',
                handle: 'Profile',
            },
        }),

        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
