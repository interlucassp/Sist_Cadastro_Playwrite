export class CadastroPage {
  constructor(page) {
    this.page = page;
    
    // Seletores - Boa prática: centralizar seletores
    this.selectors = {
      nomeInput: '#nome',
      emailInput: '#email',
      telefoneInput: '#telefone',
      senhaInput: '#senha',
      submitButton: '#submitBtn',
      successMessage: '#successMessage',
      errorMessage: '#errorMessage',
      loadingSpinner: '.loading'
    };
  }

  async navegarPara() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async preencherFormulario(dados) {
    // Comandos básicos: fill
    await this.page.fill(this.selectors.nomeInput, dados.nome);
    await this.page.fill(this.selectors.emailInput, dados.email);
    await this.page.fill(this.selectors.telefoneInput, dados.telefone);
    await this.page.fill(this.selectors.senhaInput, dados.senha);
  }

  async submeterFormulario() {
    // Comando básico: click
    await this.page.click(this.selectors.submitButton);
  }

  async aguardarProcessamento() {
    // Aguarda o loading aparecer e desaparecer
    await this.page.waitForSelector(this.selectors.loadingSpinner, { state: 'visible' });
    await this.page.waitForSelector(this.selectors.loadingSpinner, { state: 'hidden' });
  }

  async verificarMensagemSucesso() {
    // Comando básico: expect - Verificação de mensagem de sucesso
    await expect(this.page.locator(this.selectors.successMessage)).toBeVisible();
    await expect(this.page.locator(this.selectors.successMessage))
      .toContainText('Usuário cadastrado com sucesso');
  }

  async verificarMensagemErro() {
    // Comando básico: expect - Verificação de mensagem de erro
    await expect(this.page.locator(this.selectors.errorMessage)).toBeVisible();
    await expect(this.page.locator(this.selectors.errorMessage))
      .toContainText('Erro ao cadastrar usuário');
  }

  async verificarFormularioLimpo() {
    await expect(this.page.locator(this.selectors.nomeInput)).toHaveValue('');
    await expect(this.page.locator(this.selectors.emailInput)).toHaveValue('');
    await expect(this.page.locator(this.selectors.telefoneInput)).toHaveValue('');
    await expect(this.page.locator(this.selectors.senhaInput)).toHaveValue('');
  }
}
