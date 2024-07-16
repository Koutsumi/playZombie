import { test } from "@playwright/test";
import { LandingPage } from "../pages/landingPage";
import { ToastComponent } from "../components/Toast";

let landingPage
let toastComponent

test.beforeEach(async ({page}) => {
  landingPage = new LandingPage(page);
  toastComponent = new ToastComponent(page);
})

test("Deve cadastrar um lead na fila de espera", async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("Teste de sistema", "teste@teste.com");

  const message = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";
  await toastComponent.haveText(message);
});

test("Não deve cadastrar quando o email é inválido", async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("Teste de sistema", "teste.com");
  
  await landingPage.alertHaveText('Email incorreto');
});

test("Não deve cadastrar quando o nome não é preenchido", async ({ page }) => { 
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("", "teste@teste.com");
  
  await landingPage.alertHaveText('Campo obrigatório');
  
});

test("Não deve cadastrar quando o email não é preenchido", async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("Teste de sistema", "");
  
  await landingPage.alertHaveText('Campo obrigatório');
});

test("Não deve cadastrar quando o nenhum campo é preenchido", async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("", "");
  
  await landingPage.alertHaveText(["Campo obrigatório", "Campo obrigatório"]);
});