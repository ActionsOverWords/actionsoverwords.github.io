import type { CollectionEntry } from 'astro:content';

import { formatBlogDate, getPostHref, sortPostsByDate } from './blog';

export type DocEntry = CollectionEntry<'docs'>;
export type BlogEntry = CollectionEntry<'blog'>;

export type TagItem = {
    collection: 'docs' | 'blog';
    href: string;
    title: string;
    description: string;
    tags: string[];
    dateLabel?: string;
};

export type TagGroup = {
    label: string;
    slug: string;
    items: TagItem[];
};

function normalizeTag(tag: string) {
    return tag.trim().toLowerCase();
}

export function getTagSlug(tag: string) {
    return normalizeTag(tag).replace(/\s+/g, '-');
}

export function getTagHref(tag: string, basePath = '/') {
    const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`;
    const slug = encodeURIComponent(getTagSlug(tag));
    return new URL(`tags/${slug}/`, `https://example.com${normalizedBase}`).pathname;
}

export function getTagLabelFromSlug(slug: string, tags: string[]) {
    const normalizedSlug = normalizeTag(slug);
    return tags.find((tag) => getTagSlug(tag) === normalizedSlug);
}

export function getAllTags(docs: DocEntry[], posts: BlogEntry[]) {
    return [...docs, ...posts]
        .flatMap((entry) => entry.data.tags)
        .map(normalizeTag)
        .filter(Boolean)
        .filter((tag, index, source) => source.indexOf(tag) === index)
        .sort((left, right) => left.localeCompare(right));
}

function getDocHref(doc: Pick<DocEntry, 'id'>, basePath = '/') {
    const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`;
    return new URL(`${doc.id}/`, `https://example.com${normalizedBase}`).pathname;
}

export function getTaggedItems(tag: string, docs: DocEntry[], posts: BlogEntry[], basePath = '/') {
    const normalizedTag = normalizeTag(tag);
    const docItems = docs
        .filter((doc) => doc.data.tags.some((entryTag) => normalizeTag(entryTag) === normalizedTag))
        .map((doc) => ({
            collection: 'docs' as const,
            href: getDocHref(doc, basePath),
            title: doc.data.title,
            description: doc.data.description,
            tags: doc.data.tags,
            dateLabel: doc.data.lastUpdated ? `Updated ${formatBlogDate(doc.data.lastUpdated)}` : undefined,
        }));
    const postItems = sortPostsByDate(posts)
        .filter((post) => post.data.tags.some((entryTag) => normalizeTag(entryTag) === normalizedTag))
        .map((post) => ({
            collection: 'blog' as const,
            href: getPostHref(post, basePath),
            title: post.data.title,
            description: post.data.description,
            tags: post.data.tags,
            dateLabel: formatBlogDate(post.data.date),
        }));

    return {
        docs: docItems,
        posts: postItems,
        total: docItems.length + postItems.length,
    };
}

export function getTagGroups(docs: DocEntry[], posts: BlogEntry[], basePath = '/') {
    const tags = getAllTags(docs, posts);

    return tags
        .map((tag) => {
            const { docs: docItems, posts: postItems } = getTaggedItems(tag, docs, posts, basePath);

            return {
                label: tag,
                slug: getTagSlug(tag),
                items: [...docItems, ...postItems],
            };
        })
        .filter((group) => group.items.length > 0)
        .sort((left, right) => right.items.length - left.items.length || left.label.localeCompare(right.label));
}
