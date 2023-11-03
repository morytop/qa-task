import { useState } from "react";
import "./App.css";

const GUESTS = [23, 45, 155, 374, 22, 99, 100, 101, 115, 209];

function calculateOccupancy(premiumRooms: number, economyRooms: number) {
  const sortedGuests = [...GUESTS].sort((a, b) => b - a);
  let premiumOccupancy = 0;
  let economyOccupancy = 0;
  let premiumRevenue = 0;
  let economyRevenue = 0;

  for (const guest of sortedGuests) {
    if (guest >= 100 && premiumRooms > premiumOccupancy) {
      premiumOccupancy++;
      premiumRevenue += guest;
    } else if (guest < 100 && economyRooms > economyOccupancy) {
      economyOccupancy++;
      economyRevenue += guest;
    }
  }

  return {
    premiumOccupancy,
    economyOccupancy,
    premiumRevenue,
    economyRevenue,
  };
}

function App() {
  const [premiumRooms, setPremiumRooms] = useState(0);
  const [economyRooms, setEconomyRooms] = useState(0);
  const [occupancy, setOccupancy] = useState<any>(null);

  const handleSubmit = (event: any) => {
    if (isNaN(premiumRooms) || isNaN(economyRooms)) {
      alert("Please enter valid number for Premium and Economy rooms.");
      return;
    }
    event.preventDefault();
    const result = calculateOccupancy(premiumRooms, economyRooms);
    setOccupancy(result);
  };

  return (
    <div className="root">
      <div className="main">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="premium-rooms">Premium Rooms:</label>
            <input
              data-testid="premium-input"
              type="number"
              value={isNaN(premiumRooms) ? "" : premiumRooms.toString()}
              min={0}
              onChange={(event) =>
                setPremiumRooms(parseInt(event.target.value, 10))
              }
            />
          </div>
          <br />
          <div>
            <label htmlFor="economy-rooms">Economy Rooms:</label>
            <input
              data-testid="economy-input"
              type="number"
              value={isNaN(economyRooms) ? "" : economyRooms.toString()}
              min={0}
              onChange={(event) =>
                setEconomyRooms(parseInt(event.target.value, 10))
              }
            />
          </div>
          <br />
          <button data-testid="calculate-btn" type="submit">
            Calculate Occupancy
          </button>
        </form>
        {occupancy && (
          <div>
            <p>
              Free Premium rooms:{" "}
              {isNaN(premiumRooms - occupancy.premiumOccupancy)
                ? 0
                : premiumRooms - occupancy.premiumOccupancy}
            </p>
            <p>
              Free Economy rooms:{" "}
              {isNaN(economyRooms - occupancy.economyOccupancy)
                ? 0
                : economyRooms - occupancy.economyOccupancy}
            </p>
            <p>
              Usage Premium: {occupancy.premiumOccupancy} (EUR{" "}
              {occupancy.premiumRevenue})
            </p>
            <p>
              Usage Economy: {occupancy.economyOccupancy} (EUR{" "}
              {occupancy.economyRevenue})
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
