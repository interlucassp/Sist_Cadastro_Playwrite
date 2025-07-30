export class TestHelpers {
  static gerarDadosUsuario() {
    const timestamp = Date.now();
    return {
      nome: `Usuário Teste ${timestamp}`,
      email: `teste${timestamp}@exemplo.com`,
      telefone: `(11) 99999-${timestamp.toString().slice(-4)}`,
      senha: 'senha123'
    };
  }

  static gerarDadosInvalidos() {
    return {
      nome: 'Usuário Inválido',
      email: 'email-sem-arroba',
      telefone: '123456789',
      senha: '123' // Senha muito curta
    };
  }

  static async tirarScreenshot(page, nome) {
    await page.screenshot({ 
      path: `screenshots/${nome}-${Date.now()}.png`,
      fullPage: true 
    });
  }
}
