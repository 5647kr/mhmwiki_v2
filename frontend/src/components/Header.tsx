import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";

export default function Header() {
  const [menuActive, setMenuActive] = useState(false);

  const handleMenuActive = () => {
    setMenuActive((menuActive) => !menuActive);
  };

  return (
    <header className="bg-(--black) border-b-2 border-(--red)">
      <div className="w-full max-w-7xl mx-auto flex justify-between p-5 relative md:items-center">
        <h1 className="heading text-(--red)">
          <Link to="/">MHMWIKI</Link>
        </h1>

        <button
          type="button"
          className="block md:hidden text-(--white)"
          onClick={handleMenuActive}>
          {menuActive ? <X /> : <Menu />}
        </button>

        <nav
          className={`absolute top-21 left-0 w-full p-5  bg-(--white) z-10 md:static md:bg-(--black) md:border-(--black) md:p-0 md:block ${menuActive ? "block" : "hidden md:block"}`}>
          <ul className="md:flex md:gap-5 md:justify-end">
            <li className="py-2.5 md:py-0">
              <NavLink
                className={({ isActive }) =>
                  `block text-base hover:text-(--red) w-full border-b p-1 ${isActive ? "text-(--red) border-(--red)" : "text-(--grey) border-(--white) md:border-(--black)"}`
                }
                to="/history"
                onClick={() => setMenuActive(false)}>
                연혁
              </NavLink>
            </li>
            <li className="py-2.5 md:py-0">
              <NavLink
                className={({ isActive }) =>
                  `block text-base hover:text-(--red) w-full border-b p-1 ${isActive ? "text-(--red) border-(--red)" : "text-(--grey) border-(--white) md:border-(--black)"}`
                }
                to="/roulette"
                onClick={() => setMenuActive(false)}>
                룰렛
              </NavLink>
            </li>
            <li className="py-2.5 md:py-0">
              <NavLink
                className={({ isActive }) =>
                  `block text-base hover:text-(--red) w-full border-b p-1 ${isActive ? "text-(--red) border-(--red)" : "text-(--grey) border-(--white) md:border-(--black)"}`
                }
                to="/tier"
                onClick={() => setMenuActive(false)}>
                티어표
              </NavLink>
            </li>
            <li className="py-2.5 md:py-0">
              <NavLink
                className={({ isActive }) =>
                  `block text-base hover:text-(--red) w-full border-b p-1 ${isActive ? "text-(--red) border-(--red)" : "text-(--grey) border-(--white) md:border-(--black)"}`
                }
                to="/worldcup"
                onClick={() => setMenuActive(false)}>
                월드컵
              </NavLink>
            </li>
            <li className="py-2.5 md:py-0">
              <NavLink
                className={({ isActive }) =>
                  `block text-base hover:text-(--red) w-full border-b p-1 ${isActive ? "text-(--red) border-(--red)" : "text-(--grey) border-(--white) md:border-(--black)"}`
                }
                to="/inquiry"
                onClick={() => setMenuActive(false)}>
                문의
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
