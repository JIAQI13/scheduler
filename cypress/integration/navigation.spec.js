describe("Navigation", () => {
    it("white background color on select", () => {
        cy.visit("/");
        cy.contains("li", "Tuesday")
            .click()
            .should("have.css", "background-color", "rgb(0, 0, 0)");
    });

    it("should navigate to Tuesday", () => {
        cy.visit("/");

        cy.contains("[data-testid=day]", "Tuesday")
            .click()
            .should("have.class", "day-list__item--selected")
    });
});