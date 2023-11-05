import { Page } from '@playwright/test';

export class HomePage {
  url = '/';
  premiumInput = this.page.getByTestId('premium-input');
  economyInput = this.page.getByTestId('economy-input');
  premiumLabel = this.page.getByText('Premium Rooms:');
  economyLabel = this.page.getByText('Economy Rooms:');
  calculateButton = this.page.getByTestId('calculate-btn');

  constructor(private page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  async calculateRoomsOccupancy(
    premiumRooms: string,
    economyRooms: string,
  ): Promise<void> {
    await this.premiumInput.fill(premiumRooms);
    await this.economyInput.fill(economyRooms);
    await this.calculateButton.click();
  }
}
