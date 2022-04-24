/// <reference types="cypress" />

describe("demoblaze", () => {
  it("Afficher https://www.demoblaze.com", () => {
    cy.visit("https://www.demoblaze.com");
  });

  it("Sign up", () => {
    cy.get("#signin2").click();
    cy.get("#signInModalLabel").should("contains.text", "Sign up");
    cy.get("#sign-username").type("user");
    cy.get("#sign-password").type("mdp");
  });
});
