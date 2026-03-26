import {defineConfig} from '@playwright/test';

export default defineConfig({
    testDir: './tests/e2e',
    use: {
        baseURL: 'http://localhost:4321',
    },
    webServer: {
        command: 'npm run dev -- --host 0.0.0.0 --port 4321',
        url: 'http://localhost:4321',
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
    },
});
