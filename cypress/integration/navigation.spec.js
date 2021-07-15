describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.contains("li", "Tuesday")
      .click()
     .should("have.css", "background-color", "rgb(242, 242, 242)");
  });



  it("should also navigate to Tuesday", () => {
    let element = undefined
    cy.visit("/");

    cy.contains("[data-testid='Tuesday']", "Tuesday").click().should("have.class", "day-list__item--selected")
     
  });
  

});