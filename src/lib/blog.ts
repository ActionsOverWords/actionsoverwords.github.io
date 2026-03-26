import type { CollectionEntry } from 'astro:content';

export type BlogEntry = CollectionEntry<'blog'>;

export function getPublishedPosts(posts: BlogEntry[]) {
    return posts.filter((post) => !post.data.draft);
}

export function sortPostsByDate(posts: BlogEntry[]) {
    return [...posts].sort((left, right) => right.data.date.valueOf() - left.data.date.valueOf());
}

export function getRecentPosts(posts: BlogEntry[], limit = 3) {
    return sortPostsByDate(getPublishedPosts(posts)).slice(0, limit);
}

export function getPostHref(post: Pick<BlogEntry, 'id'>, basePath = '/') {
    const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`;
    return new URL(`blog/${post.id}/`, `https://example.com${normalizedBase}`).pathname;
}

export function formatBlogDate(date: Date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(date);
}
