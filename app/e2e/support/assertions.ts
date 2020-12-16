/**
 * Custom assertion to check if an item has the CSS property 
 * text-decoration: Line-through
 * @example
 ```
 cy.get('item').should("be.strikethrough");
 cy.get('item').should("not.be.strikethrough");
 ```
 */

const isStrikeThrough = (_chai: Chai.ChaiStatic, utils: Chai.ChaiUtils) => {
  function assertIsStrikeThrough(this: Chai.AssertionStatic, options: any[]) {
    console.log(this._obj[0].style.textDecoration);
    this.assert(
      this._obj[0].style.textDecoration === "line-through",
      "expected #{this} to have text-decoration: line-through",
      "expected #{this} to not have text-decoration: line-throug",
      this._obj
    );
  }

  _chai.Assertion.addMethod("strikethrough", assertIsStrikeThrough);
};

chai.use(isStrikeThrough);
