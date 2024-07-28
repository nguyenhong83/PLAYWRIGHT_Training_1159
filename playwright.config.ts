import { defineConfig, devices } from '@playwright/test';


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Set timeout */
  timeout: 45 * 1000,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    baseURL: 'https://the-internet.herokuapp.com/',
    //baseURL: '',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup', testMatch: /.*\.setup\.ts/
    },
    {
      name: 'TC004url',
      use: {
        baseURL: 'https://www.globalsqa.com/demo-site/frames-and-windows/',
         ...devices['Desktop Chrome'],
      },
      testMatch: 'Assignment4_4.spec.ts'
    },
    
    {
      name: 'TC0078url',
        use: {
        baseURL: 'hhttps://testautomationpractice.blogspot.com/',
        ...devices['Desktop Chrome'],
      },
      testMatch: 'Assignment4_78.spec.ts'
    },

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'] ,
        viewport: {width: 1366, height: 768 },
        video: 'on',
        storageState: 'playwright/.auth/user.json'
      },
      dependencies: ['setup']
    },

    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        viewport: {width: 1920, height: 1080 },
        video: 'on',
        storageState: 'playwright/.auth/user.json'
      },
      dependencies: ['setup']
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
     {
       name: 'edge',
       use: { 
        ...devices['Desktop Edge'],
        viewport: {width: 1366, height: 768 },
        storageState: 'playwright/.auth/user.json',
        channel: 'msedge'
       },
        dependencies: ['setup']
     },
     {
       name: 'chrome',
       use: { 
        ...devices['Desktop Chrome'],
        viewport: {width: 1920, height: 1080 },
        storageState: 'playwright/.auth/user.json',
        channel: 'chrome' 
      },
        dependencies: ['setup']
     },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },

 
});

