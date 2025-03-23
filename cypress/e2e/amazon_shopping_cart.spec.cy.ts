// This test validates the Amazon shopping cart functionality by searching for an item, adding it to the cart, selecting a variant, and verifying cart updates.
// It ensures the end-to-end shopping flow works correctly, which is useful for confirming a reliable purchasing experience for users.

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
    // Step 1: Search for the product using the provided search input
    cy.searchAndSubmit(testData.searchInput);

    // Step 2: Locate and click the first "Add to Cart" button on the search results
    cy.findAllByRole("button", { name: testData.buttons.addToCart })
      .first()
      .should("exist")
      .should("be.visible")
      .should("be.enabled")
      .wait(1000)
      .click({ scrollBehavior: "center" });

    // Step 3: Navigate to the specific product page
    cy.visit(testData.productUrl);

    // Step 4: Select a product variant based on image alt text and input name
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

    // Step 5: Add the selected variant to the cart
    cy.get("#add-to-cart-button", { timeout: 15000 })
      .should("exist")
      .should("be.visible")
      .and("not.be.disabled")
      .click({ force: true });

    // Step 6: Verify the confirmation messages after adding to cart
    cy.get(".a-padding-medium")
      .should("be.visible")
      .and("contain.text", testData.expected.variantConfirmation)
      .and("contain.text", testData.expected.cartAddedText);

    // Step 7: Navigate to the cart from the confirmation page
    cy.get("#sw-atc-buy-box")
      .within(() => {
        cy.findByRole("link", {
          name: new RegExp(testData.buttons.goToCart, "i"),
          timeout: 5000,
        }).click();
      })
      .end();

    // Step 8: Increment the item quantity and validate the updated count
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

    // Step 9: Verify free shipping eligibility and progress bar
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
