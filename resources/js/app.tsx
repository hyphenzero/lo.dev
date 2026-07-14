import { createInertiaApp } from '@inertiajs/react';
import { initializeTheme } from '@/hooks/use-appearance';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import PublicLayout from '@/Layouts/PublicLayout';

const appName = import.meta.env.VITE_APP_NAME || 'LOHS CS Club';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name === 'Home':
            case name === 'About':
            case name === 'Meetings':
            case name === 'Officers':
            case name === 'Join':
                return PublicLayout;
            case name.startsWith('Auth/'):
                return GuestLayout;
            default:
                return AuthenticatedLayout;
        }
    },
    strictMode: true,
    progress: {
        color: '#2563eb',
    },
});

initializeTheme();
