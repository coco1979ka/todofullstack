import axios from "axios";
import Chai from "chai";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
});

Cypress.Commands.add("resetDb", async () => {
  console.log("Resetting Database");
  try {
    const response = await apiClient.get("/tasks");
    await Promise.all(
      Object.keys(response.data).map(async (key) => {
        await apiClient.delete("/tasks/" + key);
      })
    );
    await apiClient.post("/tasks", {
      id: "1",
      text: "First Task",
      done: true,
    });
    await apiClient.post("/tasks", {
      id: "2",
      text: "Second Task",
      done: false,
    });
  } catch (error) {
    console.log(error);
  }
});

Cypress.Commands.add("dataCy", (selector: string) => {
  return cy.get(`[data-cy=${selector}]`);
});

export {};
