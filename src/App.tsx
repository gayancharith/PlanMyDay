import { Home } from "./Home/Home";
import { GroceryList } from "./GroceryList/GroceryList";
import { PlanMyDay } from "./PlanMyDay/PlanMyDay";

function App() {
  const path = window.location.pathname;
  switch (path) {
    case "/plan-my-day":
      return <PlanMyDay />;
    case "/grocery-list":
      return <GroceryList />;
    default:
      return <Home />;
  }
}

export default App;
