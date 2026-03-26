import { describe, expect, it } from 'vitest';

import { getAllTags, getTagGroups, getTagHref, getTagLabelFromSlug, getTaggedItems } from './tags';

function createDoc({
    id,
    title,
    description,
    tags = [],
    lastUpdated,
}: {
    id: string;
    title: string;
    description: string;
    tags?: string[];
    lastUpdated?: Date;
}) {
    return {
        id,
        slug: id,
        body: '',
        collection: 'docs',
        data: {
            title,
            description,
            tags,
            draft: false,
            lastUpdated,
        },
    };
}

function createPost({
    id,
    title,
    description,
    date,
    tags = [],
}: {
    id: string;
    title: string;
    description: string;
    date: Date;
    tags?: string[];
}) {
    return {
        id,
        slug: id,
        body: '',
        collection: 'blog',
        data: {
            title,
            description,
            date,
            tags,
            draft: false,
        },
    };
}

describe('tag helpers', () => {
    it('builds stable tag hrefs', () => {
        expect(getTagHref('Node.js')).toBe('/tags/node.js/');
        expect(getTagHref('Astro Content', '/wiki/')).toBe('/wiki/tags/astro-content/');
    });

    it('deduplicates and normalizes tags across docs and blog posts', () => {
        const docs = [
            createDoc({ id: 'backend/node/cache', title: 'Cache', description: 'Cache notes', tags: ['Node', 'Cache'] }),
        ];
        const posts = [
            createPost({
                id: '2026-03-25-node',
                title: 'Node log',
                description: 'Notes',
                date: new Date('2026-03-25'),
                tags: ['node', 'Performance'],
            }),
        ];

        expect(getAllTags(docs as never, posts as never)).toEqual(['cache', 'node', 'performance']);
    });

    it('finds the display label from a tag slug', () => {
        expect(getTagLabelFromSlug('astro-content', ['node', 'astro content'])).toBe('astro content');
    });

    it('returns tagged docs and posts for a given tag', () => {
        const docs = [
            createDoc({
                id: 'backend/node/cache',
                title: 'Node Cache',
                description: 'Wiki note',
                tags: ['node', 'cache'],
                lastUpdated: new Date('2026-03-24'),
            }),
        ];
        const posts = [
            createPost({
                id: '2026-03-25-node-log',
                title: 'Node Log',
                description: 'Blog note',
                date: new Date('2026-03-25'),
                tags: ['node'],
            }),
        ];

        const tagged = getTaggedItems('node', docs as never, posts as never);

        expect(tagged.total).toBe(2);
        expect(tagged.docs[0]?.href).toBe('/backend/node/cache/');
        expect(tagged.posts[0]?.href).toBe('/blog/2026-03-25-node-log/');
    });

    it('sorts tag groups by number of matching items', () => {
        const docs = [
            createDoc({ id: 'meta/a', title: 'A', description: 'A', tags: ['astro'] }),
            createDoc({ id: 'meta/b', title: 'B', description: 'B', tags: ['astro', 'mdx'] }),
        ];
        const posts = [
            createPost({
                id: '2026-03-25-post',
                title: 'Post',
                description: 'Post',
                date: new Date('2026-03-25'),
                tags: ['mdx'],
            }),
        ];

        const groups = getTagGroups(docs as never, posts as never);

        expect(groups.map((group) => `${group.label}:${group.items.length}`)).toEqual(['astro:2', 'mdx:2']);
    });
});
