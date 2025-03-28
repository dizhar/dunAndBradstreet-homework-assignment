// This test verifies navigation to Amazon's Customer Service page, searches for "where is my stuff," and validates the result page.
// It ensures the menu, search functionality, and page content work as expected, which is useful for confirming a seamless user experience.

interface AmazonMenuData {
  main_menu: string[];
  main_menu_option: {
    customer_service: string;
  };
  search_queries: {
    customer_service: string;
  };
}

describe("Amazon Customer Service Navigation", () => {
  let testData: AmazonMenuData;

  beforeEach(() => {
    cy.fixture("amazon_customer_service_where_is_my_stuff_navigation").then(
      (data: AmazonMenuData) => {
        testData = data;
      }
    );
    // Step 1: Navigate to the Ontopo homepage (using the full URL for clarity)
    cy.navigateToHome();
  });
  it('should navigate to Customer Service, search for "where is my stuff", and validate the first result page', () => {
    // Step 2: Verify each main menu item is present
    testData.main_menu.forEach((menuItem: string) => {
      cy.VerifyMenuItem(menuItem);
    });

    // Step 3: Click the "Customer Service" link from the menu
    cy.findByRole("link", {
      name: new RegExp(testData.main_menu_option.customer_service, "i"),
    }).click({ force: true });

    // Step 4: Enter the search query "where is my stuff" and submit it
    cy.searchAndSubmit(
      testData.search_queries.customer_service,
      "#hubHelpSearchInput"
    );

    // Step 5: Validate the search result page content
    cy.get("h1")
      .invoke("text")
      .then((text) => {
        const normalize = (str: string) =>
          str
            .toLowerCase()
            .replace(/['’]s\b/g, " is") // replace contractions like "where's" -> "where is"
            .replace(/[^a-z\s]/gi, "") // remove other punctuation like ?
            .replace(/\s+/g, " ") // normalize extra spaces
            .trim();

        // Step 5a: Normalize and compare the page header with the expected search query
        const actual = normalize(text);
        const expected = normalize(testData.search_queries.customer_service);
        expect(actual).to.contain(expected);

        // Step 5b: Ensure the "Help & Customer Service" link is visible on the page
        cy.findByRole("link", {
          name: /help\s*&\s*customer service/i,
        }).should("be.visible");

        // Step 5c: Take a snapshot of the page and compare it to the baseline
        cy.matchImageSnapshot("wheres-my-stuff-page", {
          failureThreshold: 0.3,
          failureThresholdType: "percent",
        });
      });
  });
});
