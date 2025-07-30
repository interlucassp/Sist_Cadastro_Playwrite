import { test, expect } from '@playwright/test';
import { CadastroPage } from '../pages/cadastro.page.js';
import { TestHelpers } from '../utils/helpers.js';

test.describe('Cadastro de Usuário - Cenários de Sucesso', () => {
  let cadastroPage;

  test.beforeEach(async ({ page }) => {
    // Boa prática: Setup antes de cada teste
    cadastroPage = new CadastroPage(page);
    await cadastroPage.navegarPara();
  });

  test('Deve cadastrar usuário com dados válidos', async ({ page }) => {
    // Arrange - Preparar dados
    const dadosUsuario = TestHelpers.gerarDadosUsuario();

    // Act - Executar ações
    await cadastroPage.preencherFormulario(dadosUsuario);
    await cadastroPage.submeterFormulario();
    await cadastroPage.aguardarProcessamento();

    // Assert - Verificar resultados
    await cadastroPage.verificarMensagemSucesso();
    await cadastroPage.verificarFormularioLimpo();
  });

  test('Deve limpar formulário após cadastro bem-sucedido', async ({ page }) => {
    const dadosUsuario = {
      nome: 'Ana Costa',
      email: 'ana.costa@exemplo.com',
      telefone: '(11) 98765-4321',
      senha: 'senha456'
    };

    await cadastroPage.preencherFormulario(dadosUsuario);
    await cadastroPage.submeterFormulario();
    await cadastroPage.aguardarProcessamento();
    
    // Verifica se o formulário foi limpo
    await cadastroPage.verificarFormularioLimpo();
  });
});