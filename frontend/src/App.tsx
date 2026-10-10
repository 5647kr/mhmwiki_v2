import { createBrowserRouter, RouterProvider } from "react-router";
import Default from "./routes/layout/Default";
import Home from "./routes/pages/Home";
import Detail from "./routes/pages/Detail";
import History from "./routes/pages/History";
import Roulette from "./routes/pages/Roulette";
import Tier from "./routes/pages/Tier";
import Inquiry from "./routes/pages/Inquiry";
import WorldCup from "./routes/pages/WorldCup";

const router = createBrowserRouter([
  {
    path: "",
    Component: Default,
    children: [
      { path: "/", Component: Home },
      { path: "/monster/:id", Component: Detail },
      { path: "/history", Component: History },
      { path: "/roulette", Component: Roulette },
      { path: "/tier", Component: Tier },
      { path: "/worldcup", Component: WorldCup },
      { path: "/inquiry", Component: Inquiry },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
