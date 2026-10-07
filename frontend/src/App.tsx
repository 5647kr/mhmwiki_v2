import { createBrowserRouter, RouterProvider } from "react-router";
import Default from "./routes/layout/Default";
import Home from "./routes/pages/Home";
import Detail from "./routes/pages/Detail";
import History from "./routes/pages/History";
import Roulette from "./routes/pages/Roulette";
import Tier from "./routes/pages/Tier";
import Inquiry from "./routes/pages/Inquiry";
import PageSkeleton from "./components/detail/PageSkeleton";

const router = createBrowserRouter([
  {
    path: "",
    Component: Default,
    children: [
      { path: "/", Component: Home },
      { path: "/monster/:id", Component: Detail },
      { path: "/monster/1", Component: PageSkeleton },
      { path: "/history", Component: History },
      { path: "/roulette", Component: Roulette },
      { path: "/tier", Component: Tier },
      { path: "/inquiry", Component: Inquiry },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
