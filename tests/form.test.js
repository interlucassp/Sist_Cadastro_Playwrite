//pra correr o teste mais lento npx playwright test --headed --project=chromium --slow-mo=1000

const { test, expect } = require('@playwright/test');

test('preenche formulário de login com sucesso', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  await page.fill('#username', 'tomsmith');
  await page.waitForTimeout(2000); // espera 2 segundos
  await page.fill('#password', 'SuperSecretPassword!');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1000);
  await expect(page.locator('.flash.success')).toContainText('You logged into a secure area!');
});


//Teste negativo
test('erro ao usar credenciais inválidas', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  await page.fill('#username', 'usuarioErrado');
  await page.waitForTimeout(2000); // espera 2 segundos
  await page.fill('#password', 'senhaErrada');
  await page.waitForTimeout(1000); // espera 1 segundos
  await page.click('button[type="submit"]');

  await expect(page.locator('.flash.error')).toContainText('Your username is invalid!');
});
