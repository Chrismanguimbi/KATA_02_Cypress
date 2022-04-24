/// <reference types="cypress" />
const { faker } = require("@faker-js/faker");

//const username = faker.internet.userName();
const username = faker.name.firstName();
const password = faker.internet.password(10);
console.log(username);
console.log(password);

describe("demoblaze", () => {
  it("Afficher https://www.demoblaze.com", () => {
    cy.visit("https://www.demoblaze.com");
  });

  it("Sign up", () => {
    cy.get("#signin2").click();
    cy.get("#signInModalLabel")
      .should("be.visible")
      .and("contains.text", "Sign up");
    cy.get("#sign-username").type(username);
    cy.get("#sign-password").type(password);
    cy.get(
      "#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary"
    ).click();
    cy.get("#login2").should("be.visible").and("contains.text", "Log in");
    console.log(username);
    console.log(password);
  });

  it("Log in", () => {
    cy.get("#login2").click();
    cy.get("#logInModalLabel")
      .should("be.visible")
      .and("contains.text", "Log in");
    cy.get("#loginusername").type(username);
    cy.get("#loginpassword").type(password);
    cy.get(
      "#logInModal > div > div > div.modal-footer > button.btn.btn-primary"
    ).click();
    cy.get("#nameofuser").should("contains.text", "Welcome " + username);
  });
});
