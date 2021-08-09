/// <reference types="Cypress" />

describe("Landing Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.reload();
  });

  it("Check if at least one pipe was rendered", () => {
    cy.get(`[aria-label="pipe-item"]`).should("be.visible");
    cy.get(`[aria-label="pipe-item"]`).its("length").should("be.gte", 1);
  });

  it(`Click pipe and check if number of cards fetched match the number of cards on the pipe description`, () => {
    cy.get(`[aria-label="pipe-item"]:first-child`).click();
    cy.get(
      `[aria-label="pipe-item"]:first-child [aria-label="pipe-cards-count"]`
    ).then((item) => {
      const numberPattern = /\d+/g;
      const numberOfCards = parseInt(item.text().match(numberPattern)[0]);
      cy.get(`[aria-label="card-item"]`)
        .its("length")
        .should("be.equal", numberOfCards);
    });
  });

  it(`Click on the 'load-more-btn' and check if more card were rendered, 
  after all of them are rendered, check for 'no-more-pipes' text`, () => {
    cy.get(`[aria-label="pipe-item"]`).should("be.visible");
    cy.get(`[aria-label="pipe-item"]`).its("length").should("be.gte", 1);
    cy.get(`[aria-label="load-more-btn"]`).then((button) => {
      let pipesOnTheScreen = Cypress.$(`[aria-label="pipe-item"]`).length;
      const totalPipes = parseInt(
        Cypress.$(`[aria-label="total-of-pipes"]`).text()
      );
      while (pipesOnTheScreen < totalPipes) {
        cy.get(`[aria-label="load-more-btn"]`).click();
        cy.get(`[aria-label="pipe-item"]`).its("length").should("be.gte", 10);
        pipesOnTheScreen =
          pipesOnTheScreen + Cypress.$(`[aria-label="pipe-item"]`).length;
      }
    });
    cy.get(`[aria-label="no-more-pipes"]`).should("be.visible");
  });
});
