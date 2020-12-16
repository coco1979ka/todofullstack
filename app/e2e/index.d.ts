// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    resetDb(): void;
    dataCy(selector: string): Chainable<Subject>;
  }
  interface Chainer<Subject> {
    (chainer: "be.strikethrough"): Chainable<Subject>;
  }
}
