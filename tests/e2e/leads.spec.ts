
import { test, expect } from "../support";
import { faker } from '@faker-js/faker';
import { executeSQL } from "../support/database";

test.beforeAll(async () => {
  await executeSQL(`DELETE from leads`)
})

test("Deve cadastrar um lead na fila de espera", async ({ page }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();
  
  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm(leadName, leadEmail);

  const message = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.";
  await page.popup.haveText(message);
});

test("Não deve cadastrar um lead quando e-mail já cadastrado", async function({page, request}){
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  const newLead = await request.post(`${process.env.BASE_API}/leads`,{
    data:{
      name: leadName,
      email: leadEmail
    }
  })

  await expect(newLead.ok()).toBeTruthy();

  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm(leadName, leadEmail);

  const message = /Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços./;
  await page.popup.haveText(message);
})

test("Não deve cadastrar quando o email é inválido", async ({ page }) => {
  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm("Teste de sistema", "teste.com");
  
  await page.landing.alertHaveText('Email incorreto');
});

test("Não deve cadastrar quando o nome não é preenchido", async ({ page }) => { 
  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm("", "teste@teste.com");
  
  await page.landing.alertHaveText('Campo obrigatório');
  
});

test("Não deve cadastrar quando o email não é preenchido", async ({ page }) => {
  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm("Teste de sistema", "");
  
  await page.landing.alertHaveText('Campo obrigatório');
});

test("Não deve cadastrar quando o nenhum campo é preenchido", async ({ page }) => {
  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm("", "");
  
  await page.landing.alertHaveText(["Campo obrigatório", "Campo obrigatório"]);
});