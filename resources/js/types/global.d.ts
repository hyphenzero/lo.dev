declare module 'react' {
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: {
                user: {
                    id: number;
                    name: string;
                    email: string;
                    role: string;
                    email_verified_at?: string;
                } | null;
            };
            [key: string]: unknown;
        };
    }
}
