import { expect, test } from '@playwright/test';

test('homepage loads and links to blog', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: "LeeHK's Wiki" })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Read Recent Posts' })).toBeVisible();
});

test('blog index shows seeded posts', async ({ page }) => {
    await page.goto('/blog/');

    await expect(page.getByRole('heading', { name: 'Recent writing and dated implementation notes.' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Bootstrapping the Wiki' })).toBeVisible();
});

test('docs page renders quality gates content', async ({ page }) => {
    await page.goto('/testing/quality-gates/');

    await expect(page.getByRole('heading', { name: 'Quality Gates' })).toBeVisible();
    await expect(page.getByText('npm run test:e2e')).toBeVisible();
});
