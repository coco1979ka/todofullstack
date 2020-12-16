const getTaskLabel = (id: number) => {
  return cy.dataCy(`task-item-label-${id}`);
};

const task = (index: number) => {
  return cy.dataCy("task").eq(index);
};

const DELETE_DONE = "delete-done";
const TOGGLE_HIDE_DONE = "toggle-hide-done";
const MORE_MENU = "more-menu";
const TOGGLE = "toggle";
const TASK = "task";
const LABEL = "label";

describe("Test Todo App", () => {
  beforeEach(() => {
    cy.resetDb();
    cy.visit("/");
  });

  it("Shows tasks from server", () => {
    task(0).within((task) => {
      cy.wrap(task).should("contain.text", "First Task");
      cy.dataCy(LABEL).should("be.strikethrough");
    });
    task(1).within((task) => {
      cy.wrap(task).should("contain.text", "Second Task");
      cy.dataCy(LABEL).should("not.be.strikethrough");
    });
  });

  it("Can add a task to the list", () => {
    const NEW_TASK_TEXT = "Write a test";
    cy.get("#text").type(NEW_TASK_TEXT);
    cy.get("#submit").click();
    task(2).within(() => {
      cy.dataCy(LABEL).should("contain.text", NEW_TASK_TEXT);
    });
    //cy.contains("Write a test").should("exist");
  });

  it("Can set a toggle done", () => {
    task(1).within(() => {
      cy.dataCy(TOGGLE).click();
      cy.dataCy(LABEL).should("be.strikethrough");
      cy.dataCy(TOGGLE).click();
      cy.dataCy(LABEL).should("not.be.strikethrough");
    });
  });

  it("Can delete a task", () => {
    task(1).within(() => {
      cy.dataCy("delete-button").click();
    });
    task(1).should("not.exist");
  });

  it("Can delete all done tasks", () => {
    task(1).within(() => {
      cy.dataCy(TOGGLE).click();
    });
    cy.dataCy(MORE_MENU).click();
    cy.dataCy(DELETE_DONE).click();
    cy.dataCy(TASK).should("not.exist");
  });

  it("Can hide done tasks", () => {
    cy.dataCy(MORE_MENU).click();
    cy.dataCy(TOGGLE_HIDE_DONE).click();
    task(0).should("not.contain", "First Task");

    cy.dataCy(TOGGLE_HIDE_DONE).click();
    task(0).should("contain", "First Task");
  });

  it("Can edit an existing task", () => {
    task(1).within(() => {
      cy.dataCy("edit-button").click();
    });
    cy.get("#text").should("have.value", "Second Task").type(" Append");
    cy.get("#submit").click();
    task(1).should("contain", "Second Task Append");
  });

  it("Can reset editing an existing task", () => {
    task(1).within(() => {
      cy.dataCy("edit-button").click();
    });
    cy.get("#text").should("have.value", "Second Task").type(" Append");
    cy.get("#reset").click();
    task(1).should("contain", "Second Task");
  });
});
