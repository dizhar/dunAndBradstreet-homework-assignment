interface AmazonShoppingData {
  searchInput: string;
  productUrl: string;
  variant: {
    imageAlt: string;
    inputName: string;
  };
  buttons: {
    addToCart: string;
    goToCart: string;
  };
  expected: {
    quantityAfterIncrement: number;
    variantConfirmation: string;
    cartAddedText: string;
    freeShippingMessage: string;
    emptyCartMessage: string;
  };
}

describe("Amazon Shopping Cart Tests", () => {
  let testData: AmazonShoppingData;

  beforeEach(() => {
    cy.fixture("simple_amazon_data").then((data: AmazonShoppingData) => {
      testData = data;
    });
    cy.navigateToHome();
  });

  afterEach(() => {
    cy.emptyCart(testData.expected.emptyCartMessage);
  });

  it("Test Case 1: Verify items are added to cart", () => {
    cy.searchAndSubmit(testData.searchInput);

    cy.findAllByRole("button", { name: testData.buttons.addToCart })
      .first()
      .should("exist")
      .should("be.visible")
      .should("be.enabled")
      .wait(1000)
      .click({ scrollBehavior: "center" });

    cy.visit(testData.productUrl);

    cy.get("li")
      .filter(`:has(img[alt="${testData.variant.imageAlt}"])`)
      .within(() => {
        cy.get(`input[name="${testData.variant.inputName}"]:visible`).click();
        cy.get(
          ".a-button.a-button-toggle.image-swatch-button-with-slots.a-button-selected",
          { timeout: 15000 }
        )
          .should("be.visible")
          .wait(6000);
      });

    cy.get("#add-to-cart-button", { timeout: 15000 })
      .should("exist")
      .should("be.visible")
      .and("not.be.disabled")
      .click({ force: true });

    cy.get(".a-padding-medium")
      .should("be.visible")
      .and("contain.text", testData.expected.variantConfirmation)
      .and("contain.text", testData.expected.cartAddedText);

    cy.findByRole("link", {
      name: new RegExp(testData.buttons.goToCart, "i"),
      timeout: 15000,
    }).click();

    const getBostitchItem = () =>
      cy.findItemByText(new RegExp(testData.searchInput.split(",")[0]));

    Cypress._.times(testData.expected.quantityAfterIncrement - 1, (index) => {
      const expectedQuantity = (index + 2).toString();
      getBostitchItem().should("be.visible");
      getBostitchItem().find('[data-action="a-stepper-increment"]').click();
      getBostitchItem()
        .find('[data-a-selector="spinbutton"]')
        .should("contain", expectedQuantity);
    });

    cy.get(".sc-sss-box").within(() => {
      cy.get(".a-meter-bar")
        .invoke("attr", "style")
        .should("contain", "width: 100%");
      cy.get(".a-alert-inline-success").contains(
        new RegExp(testData.expected.freeShippingMessage, "i")
      );
    });
  });
});
