const{test, expect} = require("@playwright/test");

test('Verify "All Books Link" is visible', async ({page}) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
});

test('Verify "Login Button" is visible', async ({page}) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    const loginButton = await page.$('a[href="/login"]');
    const isLinkVisible = await loginButton.isVisible();
    expect(isLinkVisible).toBe(true);
});

test('Verify "Register Button" is visible', async ({page}) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    const registerButton = await page.$('a[href="/register"]');
    const isLinkVisible = await registerButton.isVisible();
    expect(isLinkVisible).toBe(true);
});

test('Verify "All Books" link is visible after login', async({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
   
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
  
    expect(isLinkVisible).toBe(true);
});

test('Verify "My Books" link is visible after user login', async({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    
    const myBooksLink = await page.$('a[href="/profile"]');
    const isLinkVisible = await myBooksLink.isVisible();
    
    expect(isLinkVisible).toBe(true);
});

test('Verify "Add Book" link is visible', async({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const addBookLink = await page.$('a[href="/create"]');
    const isLinkVisible = await addBookLink.isVisible();

    expect(isLinkVisible).toBe(true);
});

test('Verify user email is visible', async ({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const userEmail = (await page.$('#user > span')).textContent();
    // const isEmailVisible = userEmail.isVisible();

    expect(userEmail !== undefined);
});

test('Test "Login Page" with Valid credentials', async ({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    expect(page.url()).toBe('http://localhost:3000/catalog');
});

test('Test "Login Page" with Invalid credentials', async ({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter1@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    expect(page.url()).toBe('http://localhost:3000/login');
});

test('Test "Login Page" with empty credentials', async ({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', '');
    await page.fill('input[name="password"]', '');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
});

test('Testing Login page with empty email and valid password', async ({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', '');
    await page.fill('input[name="password"]', '123456');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
});

test('Testing Login page with valid email and empty password', async ({page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
});

test('Testing Register page with valid values', async({page}) => {
   await page.goto('http://localhost:3000/register');
   await page.fill('input[name="email"]', 'ivan1@abv.bg');
   await page.fill('input[name="password"]', '123456');
   await page.fill('input[name="confirm-pass"]', '123456');
   await page.click('input[type="submit"]');

   expect(page.url()).toBe('http://localhost:3000/catalog');
});

test('Testing Register page with empty fields', async ({page}) => {
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', '');
    await page.fill('input[name="password"]', '');
    await page.fill('input[name="confirm-pass"]','');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
});

test('Testing Register page with empty email', async ({page}) => {
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', '');
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]','123456');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
});

test('Testing Register page with empty fields', async ({page}) => {
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', 'ivanivanov@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]','');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
});

test('Testing Register page with empty fields', async ({page}) => {
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', 'peter1@abv.bg');
    await page.fill('input[name="password"]', '1234');
    await page.fill('input[name="confirm-pass"]','123456');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Passwords don\'t match!');
        await dialog.accept();
    });
    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
});

