/// <reference types="cypress" />
const { faker } = require("@faker-js/faker");

const username = faker.internet.userName();
const email = faker.internet.email();
const name = faker.name.firstName();
const password = faker.internet.password(10);
const country = faker.address.country();
const city = faker.address.city();
const card = faker.finance.creditCardNumber();
const month = faker.date.month();
const year = "2026";

describe("demoblaze", () => {
  it("Afficher https://www.demoblaze.com", () => {
    cy.visit("https://www.demoblaze.com");
  });

  it("Sign up", () => {
    cy.get("#signin2").click();
    cy.get("#signInModalLabel")
      .should("be.visible")
      .and("contains.text", "Sign up");
    cy.get("#sign-username")
      .should("be.visible")
      .type(username)
      .should("have.value", username);
    cy.get("#sign-password").should("be.visible").type(password);
    cy.get(
      "#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary"
    ).click();
    cy.get("#login2").should("be.visible").and("contains.text", "Log in");
  });

  it("Log in", () => {
    cy.get("#login2").click({ force: true });
    cy.wait(1000);
    cy.get("#logInModalLabel")
      .should("be.visible")
      .and("contains.text", "Log in");
    cy.get("#loginusername")
      .should("be.visible")
      .type(username)
      .should("have.value", username);
    cy.get("#loginpassword").should("be.visible").type(password);
    cy.get(
      "#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary"
    )
      .should("be.visible")
      .click({ force: true });
    cy.url().should("eq", "https://www.demoblaze.com/");
  });

  it("Ajouter un produit au panier", () => {
    cy.get("#nameofuser").should("contains.text", "Welcome " + username);
    cy.get(".card-block").eq(2).find(".card-title").click();
    cy.get(".name").should("be.visible").and("contains.text", "Nexus 6");
    cy.get(".btn-success").click();
    cy.get("#cartur").click();
    cy.contains("Nexus 6").should("be.visible").and("contains.text", "Nexus 6");
  });

  it("Confirmer la commande et valider le paiement", () => {
    cy.get("#page-wrapper > div > div.col-lg-1 > button").click();
    cy.get("#name").type(name);
    cy.get("#country").type(country);
    cy.get("#city").type(city);
    cy.get("#card").type(card);
    cy.get("#month").type(month);
    cy.get("#year").type(year);
    cy.get(
      "#orderModal > div > div > div.modal-footer > button.btn.btn-primary"
    ).click();
    cy.get("body > div.sweet-alert.showSweetAlert.visible > h2")
      .should("be.visible")
      .and("contains.text", "Thank you for your purchase!");
    cy.get(
      "body > div.sweet-alert.showSweetAlert.visible > div.sa-button-container > div > button"
    ).click();
    cy.get("#cartur").click();
    cy.get("#tbodyid").find("tr").should("not.exist");
  });

  it("Supprimer un produit du panier", () => {
    cy.get(".nav-link").eq(0).and("contains.text", "Home").click();
    cy.get(".card-block").eq(2).find(".card-title").click();
    cy.get(".name").should("be.visible").and("contains.text", "Nexus 6");
    cy.get(".btn-success").click();
    cy.get("#cartur").click();
    cy.contains("Nexus 6").should("be.visible").and("contains.text", "Nexus 6");
    cy.get(".success > :nth-child(4) > a").click();
    cy.get("#tbodyid").find("tr").should("not.exist");
  });
});
