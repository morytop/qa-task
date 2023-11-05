import { HomePage } from '../page/home.page';
import { expect, test } from '@playwright/test';

test.describe('Verify occupancy and hotel profit', () => {
  test('Check with Premium rooms: 7 and Economy rooms: 5', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.calculateRoomsOccupancy('7', '5');
    const freePremiumRooms = 1;
    const freeEconomyRooms = 1;
    const usagePremium = 1054;
    const usageEconomy = 189;
    await expect(
      page.getByText(`Free Premium rooms: ${freePremiumRooms}`),
    ).toBeInViewport();
    await expect(
      page.getByText(`Free Economy rooms: ${freeEconomyRooms}`),
    ).toBeInViewport();
    await expect(
      page.getByText(`Usage Premium: 6 (EUR ${usagePremium})`),
    ).toBeInViewport();
    await expect(
      page.getByText(`Usage Economy: 4 (EUR ${usageEconomy})`),
    ).toBeInViewport();
  });
});
