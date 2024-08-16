import { test, expect } from "../support"
import { Account } from "../support/actions/LoginXp";

let account:Account = {
    username: 'qa',
    password: 'xperience'
}

test('Deve logar com sucesso no LoginXP', async ({ page }) => {
    // Comando para usar o gerador de código
    // * npx playwright codegen https://loginxp.vercel.app
    await page.loginXp.submit(account)
    const popupContent = await page.loginXp.getPopupContent();
    await expect(popupContent).toContainText('Suas credenciais são válidas :)');
});

test('Não deve logar com credenciais inválidas', async ({ page }) => {
    // Comando para usar o gerador de código
    // * npx playwright codegen https://loginxp.vercel.app
    account.password = '123Errado'
    await page.loginXp.submit(account)
    await page.loginXp.assertToast('Oops! Credenciais inválidas :(')
});

test('Não deve logar quando não preencho os campos', async ({ page }) => {
    // Comando para usar o gerador de código
    // * npx playwright codegen https://loginxp.vercel.app
    await page.goto('https://loginxp.vercel.app/');;
    await page.getByRole('button', { name: 'Entrar' }).click();
    await page.loginXp.assertToast('Informe o seu nome de usuário!')
});