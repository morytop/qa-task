import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("Check with Premium rooms: 3 and Economy rooms: 3", () => {
  render(<App />);
  const premiumRoomsInput = screen.getByTestId("premium-input");
  const economyRoomsInput = screen.getByTestId("economy-input");
  const calculateButton = screen.getByTestId("calculate-btn");

  fireEvent.change(premiumRoomsInput, { target: { value: "3" } });
  fireEvent.change(economyRoomsInput, { target: { value: "3" } });
  fireEvent.click(calculateButton);

  const premiumRoomsText = screen.getByText(/Free Premium rooms: 0/i);
  const economyRoomsText = screen.getByText(/Free Economy rooms: 0/i);
  const premiumUsageText = screen.getByText(/Usage Premium: 3 \(EUR 738\)/i);
  const economyUsageText = screen.getByText(/Usage Economy: 3 \(EUR 167\)/i);

  expect(premiumRoomsText).toBeVisible();
  expect(economyRoomsText).toBeVisible();
  expect(premiumUsageText).toBeVisible();
  expect(economyUsageText).toBeVisible();
});
