import { createBrowserRouter, RouterProvider } from "react-router";
import Default from "./routes/layout/Default";
import Home from "./routes/pages/Home";
import Detail from "./routes/pages/Detail";
import History from "./routes/pages/History";
import Roulette from "./routes/pages/Roulette";
import Tier from "./routes/pages/Tier";
import WorldCup from "./routes/pages/WorldCup";
import NotFound from "./routes/pages/NotFound";
import Report from "./routes/pages/Report";

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
      { path: "/report", Component: Report },
      { path: "*", Component: NotFound },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
