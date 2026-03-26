import { describe, expect, it } from 'vitest';
import {
    formatBlogDate,
    getPostHref,
    getPublishedPosts,
    getRecentPosts,
    sortPostsByDate,
    type BlogEntry,
} from './blog';

function createPost(overrides: Partial<BlogEntry['data']> & Pick<BlogEntry['data'], 'title' | 'description' | 'date'>) {
    return {
        id: overrides.title.toLowerCase().replaceAll(' ', '-'),
        collection: 'blog',
        slug: overrides.title.toLowerCase().replaceAll(' ', '-'),
        body: '',
        data: {
            tags: [],
            draft: false,
            ...overrides,
        },
    } as BlogEntry;
}

describe('blog helpers', () => {
    it('filters draft posts', () => {
        const posts = [
            createPost({ title: 'Published', description: 'visible', date: new Date('2026-03-25') }),
            createPost({ title: 'Draft', description: 'hidden', date: new Date('2026-03-26'), draft: true }),
        ];

        expect(getPublishedPosts(posts).map((post) => post.data.title)).toEqual(['Published']);
    });

    it('sorts posts by descending date', () => {
        const posts = [
            createPost({ title: 'Older', description: 'first', date: new Date('2026-03-24') }),
            createPost({ title: 'Newer', description: 'second', date: new Date('2026-03-25') }),
        ];

        expect(sortPostsByDate(posts).map((post) => post.data.title)).toEqual(['Newer', 'Older']);
    });

    it('returns recent published posts up to a limit', () => {
        const posts = [
            createPost({ title: 'One', description: 'one', date: new Date('2026-03-23') }),
            createPost({ title: 'Two', description: 'two', date: new Date('2026-03-24') }),
            createPost({ title: 'Three', description: 'three', date: new Date('2026-03-25'), draft: true }),
            createPost({ title: 'Four', description: 'four', date: new Date('2026-03-26') }),
        ];

        expect(getRecentPosts(posts, 2).map((post) => post.data.title)).toEqual(['Four', 'Two']);
    });

    it('formats dates consistently', () => {
        expect(formatBlogDate(new Date('2026-03-25T00:00:00Z'))).toBe('Mar 25, 2026');
    });

    it('builds stable hrefs from entry ids', () => {
        expect(getPostHref(createPost({ title: 'Hello World', description: 'post', date: new Date('2026-03-25') }))).toBe(
            '/blog/hello-world/'
        );
    });
});
