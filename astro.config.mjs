// @ts-check
import {defineConfig} from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
    site: 'https://actionsoverwords.github.io',
    integrations: [
        starlight({
            title: 'ActionsOverWords',
            favicon: '/favicon.ico',
            customCss: ['./src/styles/custom.css'],
            head: [
                {
                    tag: 'script',
                    content: `
                        if (window.location.pathname.slice(-1) !== '/') {
                            window.location.replace(window.location.pathname + '/' + window.location.search);
                        }
                    `,
                },
            ],
            disable404Route: true,
            lastUpdated: true,
            components: {
                Header: './src/components/starlight/Header.astro',
            },
            defaultLocale: 'ko',
            social: [],
            sidebar: [
                { label: 'Java / Kotlin', autogenerate: { directory: 'java-kotlin' } },
                { label: 'Spring', autogenerate: { directory: 'spring' } },
                { label: 'JPA', autogenerate: { directory: 'jpa' } },
                {
                    label: 'Etc',
                    items: [
                        { label: 'Messaging', autogenerate: { directory: 'messaging' } },
                        { label: 'Docker', autogenerate: { directory: 'docker' } },
                    ],
                },
                {
                    label: '도움말',
                    items: [
                        { label: '위키 작성 방법', slug: 'help/how-to-write' },
                        { label: 'MDX 기본', slug: 'help/mdx-basics' },
                        { label: 'MDX 확장 (Starlight 컴포넌트)', slug: 'help/mdx-advanced' },
                    ],
                },
            ],
        }),
    ],
});
