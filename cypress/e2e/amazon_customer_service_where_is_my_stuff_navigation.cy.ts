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
    testData.main_menu.forEach((menuItem: string) => {
      cy.VerifyMenuItem(menuItem);
    });

    cy.findByRole("link", {
      name: new RegExp(testData.main_menu_option.customer_service, "i"),
    }).click({ force: true });

    cy.searchAndSubmit(
      testData.search_queries.customer_service,
      "#hubHelpSearchInput"
    );

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

        const actual = normalize(text);
        const expected = normalize(testData.search_queries.customer_service);

        expect(actual).to.contain(expected);

        cy.findByRole("link", {
          name: /help\s*&\s*customer service/i,
        }).should("be.visible");

        cy.matchImageSnapshot("wheres-my-stuff-page", {
          failureThreshold: 0.3,
          failureThresholdType: "percent",
        });
      });
  });
});
