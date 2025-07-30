// ===== 9. tests/specs/cadastro-visual.spec.js =====
import { test, expect } from '@playwright/test';
import { CadastroPage } from '../pages/cadastro.page.js';

test.describe('Cadastro de Usuário - Testes Visuais', () => {
  let cadastroPage;

  test.beforeEach(async ({ page }) => {
    cadastroPage = new CadastroPage(page);
    await cadastroPage.navegarPara();
  });

  test('Deve exibir formulário corretamente', async ({ page }) => {
    // Teste visual da página inicial
    await expect(page).toHaveScreenshot('formulario-inicial.png');
  });

  test('Deve exibir mensagem de sucesso visualmente', async ({ page }) => {
    const dadosUsuario = {
      nome: 'Teste Visual',
      email: 'visual@teste.com',
      telefone: '(11) 99999-0000',
      senha: 'senha123'
    };

    await cadastroPage.preencherFormulario(dadosUsuario);
    await cadastroPage.submeterFormulario();
    await cadastroPage.aguardarProcessamento();

    // Screenshot da mensagem de sucesso
    await expect(page).toHaveScreenshot('mensagem-sucesso.png');
  });

  test('Deve exibir mensagem de erro visualmente', async ({ page }) => {
    const dadosInvalidos = {
      nome: 'Teste Erro',
      email: 'email-invalido',
      telefone: '123456789',
      senha: '123'
    };

    await cadastroPage.preencherFormulario(dadosInvalidos);
    await cadastroPage.submeterFormulario();
    await cadastroPage.aguardarProcessamento();

    // Screenshot da mensagem de erro
    await expect(page).toHaveScreenshot('mensagem-erro.png');
  });

  test('Deve funcionar em dispositivos móveis', async ({ page }) => {
    // Simula dispositivo móvel
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();

    await expect(page).toHaveScreenshot('formulario-mobile.png');
  });
});
