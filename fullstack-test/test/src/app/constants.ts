export const API_QUERY = {
    ROOT: 'http://localhost:4300/api',
    PUBLISHERS: {
        GET: {
            ALL: () => `${API_QUERY.ROOT}/publishers`,
            ONE: (publisherName: string) => `${API_QUERY.ROOT}/domains?publisherName=${publisherName}`,
        },
        POST: {
            ADD: () => `${API_QUERY.ROOT}/publishers`,
        },
        DELETE: {
            ONE: (publisherName: string) => `${API_QUERY.ROOT}/publishers/${publisherName}`,
        },
    },
    DOMAINS: (publisherName: string) => ({
        GET: {
            ALL: (publisherName: string) => `${API_QUERY.ROOT}/domains?publisherName=${publisherName}`,
        },
    }),
} as const;
