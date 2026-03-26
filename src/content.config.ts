import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
    docs: defineCollection({
        loader: docsLoader(),
        schema: docsSchema({
            extend: z.object({
                tags: z.array(z.string()).default([]),
                draft: z.boolean().default(false),
                lastUpdated: z.date().optional(),
            }),
        }),
    }),
    blog: defineCollection({
        loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
        schema: z.object({
            title: z.string(),
            description: z.string(),
            date: z.date(),
            tags: z.array(z.string()).default([]),
            draft: z.boolean().default(false),
            lastUpdated: z.date().optional(),
        }),
    }),
};
