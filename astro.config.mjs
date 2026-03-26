// @ts-check
import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
    site: 'https://actionsoverwords.github.io',
    integrations: [
        starlight({
            title: "LeeHK's Wiki",
            description: 'Technical notes, learning logs, and architecture references in MDX.',
            tagline: 'A local-first technical knowledge base built with Astro and Starlight.',
            disable404Route: true,
            lastUpdated: true,
            components: {
                Header: './src/components/starlight/Header.astro',
                PageFrame: './src/components/starlight/PageFrame.astro',
                PageSidebar: './src/components/starlight/PageSidebar.astro',
                Sidebar: './src/components/starlight/Sidebar.astro',
            },
            social: [],
            sidebar: [
                {
                    label: 'Backend',
                    autogenerate: {directory: 'backend'},
                },
            ],
        }),
        mdx(),
    ],
});
