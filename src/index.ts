import { handlerPath } from '@libs/handlerResolver';


export const dealership = {
    handler: `${handlerPath(__dirname)}/handler.graphql`,
    events: [
        {
            http: {
                method: 'post',
                path: 'graphql',
            },
        },
    ],
};