import { test, expect } from "@playwright/test";
import { LandingPage } from "./pages/landingPage";

test("Deve cadastrar um lead na fila de espera", async ({ page }) => {
  const landingPage = new LandingPage(page);
  
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("Teste de sistema", "teste@teste.com");

  const message = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";
  await landingPage.toastHaveText(message);
});

test("Não deve cadastrar quando o email é inválido", async ({ page }) => {
  const landingPage = new LandingPage(page);
  
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("Teste de sistema", "teste.com");
  
  await landingPage.alertHaveText('Email incorreto');
});

test("Não deve cadastrar quando o nome não é preenchido", async ({ page }) => {
  const landingPage = new LandingPage(page);
  
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("", "teste@teste.com");
  
  await landingPage.alertHaveText('Campo obrigatório');
  
});

test("Não deve cadastrar quando o email não é preenchido", async ({ page }) => {
  const landingPage = new LandingPage(page);
  
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("Teste de sistema", "");
  
  await landingPage.alertHaveText('Campo obrigatório');
});

test("Não deve cadastrar quando o nenhum campo é preenchido", async ({ page }) => {
  const landingPage = new LandingPage(page);
  
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("", "");
  
  await landingPage.alertHaveText(["Campo obrigatório", "Campo obrigatório"]);
});