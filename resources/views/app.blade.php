<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class([
    'dark' => ($appearance ?? 'system') == 'dark',
    'light' => ($appearance ?? 'system') == 'light',
])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const isDark = appearance === 'dark' || (appearance === 'system' && prefersDark);

                document.documentElement.classList.toggle('dark', isDark);
                document.documentElement.classList.toggle('light', !isDark && appearance === 'light');
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }

            @media (prefers-color-scheme: dark) {
                html:not(.light, .dark) {
                    background-color: oklch(0.145 0 0);
                }
            }
        </style>

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        <x-inertia::head />
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
