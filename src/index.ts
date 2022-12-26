import { handlerPath } from '@libs/handler-resolver';


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