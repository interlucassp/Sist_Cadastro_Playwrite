// ===== 8. tests/specs/cadastro-erro.spec.js =====
import { test, expect } from '@playwright/test';
import { CadastroPage } from '../pages/cadastro.page.js';
import { TestHelpers } from '../utils/helpers.js';

test.describe('Cadastro de Usuário - Cenários de Erro', () => {
  let cadastroPage;

  test.beforeEach(async ({ page }) => {
    cadastroPage = new CadastroPage(page);
    await cadastroPage.navegarPara();
  });

  test('Deve exibir erro com email inválido', async ({ page }) => {
    const dadosInvalidos = {
      nome: 'Carlos Silva',
      email: 'email-sem-arroba',
      telefone: '(11) 99999-5678',
      senha: 'senha789'
    };

    await cadastroPage.preencherFormulario(dadosInvalidos);
    await cadastroPage.submeterFormulario();
    await cadastroPage.aguardarProcessamento();

    await cadastroPage.verificarMensagemErro();
  });

  test('Deve exibir erro com senha muito curta', async ({ page }) => {
    const dadosInvalidos = {
      nome: 'Pedro Santos',
      email: 'pedro@exemplo.com',
      telefone: '(11) 88888-9999',
      senha: '123' // Senha muito curta
    };

    await cadastroPage.preencherFormulario(dadosInvalidos);
    await cadastroPage.submeterFormulario();
    await cadastroPage.aguardarProcessamento();

    await cadastroPage.verificarMensagemErro();
  });

  test('Deve manter dados no formulário após erro', async ({ page }) => {
    const dadosInvalidos = TestHelpers.gerarDadosInvalidos();

    await cadastroPage.preencherFormulario(dadosInvalidos);
    await cadastroPage.submeterFormulario();
    await cadastroPage.aguardarProcessamento();

    // Verifica se os dados permanecem no formulário
    await expect(page.locator('#nome')).toHaveValue(dadosInvalidos.nome);
    await expect(page.locator('#email')).toHaveValue(dadosInvalidos.email);
  });
});
