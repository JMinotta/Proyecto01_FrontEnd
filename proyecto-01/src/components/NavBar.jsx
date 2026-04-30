import { NavLink } from "react-router";

function NavBar() {
  return (
    <header>
      <nav className="flex justify-between items-center bg-[#1a1a2e] text-white fixed top-0 left-0 w-full px-10 py-2">
        <NavLink
          to="/"
          className="text-[28px] text-[#e94560] cursor-pointer"
        >
          AnimeFront
        </NavLink>
        <ul className="flex px-10 gap-4">
          
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `p-4 cursor-pointer hover:text-[#e94560] ${
                  isActive ? "text-[#e94560]" : ""
                }`
              }
            >
              Inicio
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/explorar"
              className={({ isActive }) =>
                `p-4 cursor-pointer hover:text-[#e94560] ${
                  isActive ? "text-[#e94560]" : ""
                }`
              }
            >
              Explorar
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/favoritos"
              className={({ isActive }) =>
                `p-4 cursor-pointer hover:text-[#e94560] ${
                  isActive ? "text-[#e94560]" : ""
                }`
              }
            >
              Favoritos
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `p-4 cursor-pointer hover:text-[#e94560] ${
                  isActive ? "text-[#e94560]" : ""
                }`
              }
            >
              Contacto
            </NavLink>
          </li>

        </ul>
      </nav>
    </header>
  );
}

export default NavBar;