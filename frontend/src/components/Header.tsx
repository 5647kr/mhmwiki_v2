import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";

export default function Header() {
  const [menuActive, setMenuActive] = useState(false);

  const handleMenuActive = () => {
    setMenuActive((menuActive) => !menuActive);
  };

  return (
    <header className="bg-(--cream)">
      <div className="w-full max-w-7xl mx-auto flex justify-between p-5 relative md:items-center">
        <h1 className="heading">
          <Link to="/">MHMWIKI</Link>
        </h1>

        <button
          type="button"
          className="block md:hidden"
          onClick={handleMenuActive}>
          {menuActive ? <X /> : <Menu />}
        </button>

        <nav
          className={`absolute top-19 left-0 w-full p-5 border-t border-(--lgrey) bg-(--white) z-10 md:static md:bg-(--cream) md:border-(--cream) md:p-0 md:block ${menuActive ? "block" : "hidden md:block"}`}>
          <ul className="md:flex md:gap-5 md:justify-end">
            <li className="py-2.5 md:py-0">
              <NavLink
                className={({ isActive }) =>
                  `block text-base hover:text-(--black) w-full border-b p-1 ${isActive ? "text-(--black) border-(--black)" : "text-(--grey) border-(--white) md:border-(--cream)"}`
                }
                to="/history"
                onClick={() => setMenuActive(false)}>
                연혁
              </NavLink>
            </li>
            <li className="py-2.5 md:py-0">
              <NavLink
                className={({ isActive }) =>
                  `block text-base hover:text-(--black) w-full border-b p-1 ${isActive ? "text-(--black) border-(--black)" : "text-(--grey) border-(--white) md:border-(--cream)"}`
                }
                to="/roulette"
                onClick={() => setMenuActive(false)}>
                룰렛
              </NavLink>
            </li>
            <li className="py-2.5 md:py-0">
              <NavLink
                className={({ isActive }) =>
                  `block text-base hover:text-(--black) w-full border-b p-1 ${isActive ? "text-(--black) border-(--black)" : "text-(--grey) border-(--white) md:border-(--cream)"}`
                }
                to="/tier"
                onClick={() => setMenuActive(false)}>
                티어표
              </NavLink>
            </li>
            <li className="py-2.5 md:py-0">
              <NavLink
                className={({ isActive }) =>
                  `block text-base hover:text-(--black) w-full border-b p-1 ${isActive ? "text-(--black) border-(--black)" : "text-(--grey) border-(--white) md:border-(--cream)"}`
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
