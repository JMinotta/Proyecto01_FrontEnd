import { NavLink } from "react-router";

function NavBar() {
  const linkClass = ({ isActive }) =>
    `cursor-pointer hover:text-[#e94560] ${
      isActive ? "text-[#e94560]" : ""
    }`;

  return (
    <header>
      <nav className="flex flex-col md:flex-row md:justify-between md:items-center bg-[#1a1a2e] text-white fixed top-0 left-0 w-full px-6 py-3">
        
        <NavLink to="/" className="flex items-center gap-2 mb-2 md:mb-0">
          {/* SVG inline logo */}
          <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="AnimeFront logo">
            <rect width="100" height="100" rx="20" fill="#e94560" />
            <path d="M30 40 L50 60 L70 40" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="75" r="4" fill="white" />
          </svg>
          <span className="text-2xl text-[#e94560]">AnimeFront</span>
        </NavLink>

        <ul className="flex flex-col md:flex-row gap-2 md:gap-6">
          <li><NavLink to="/" className={linkClass}>Inicio</NavLink></li>
          <li><NavLink to="/explorar" className={linkClass}>Explorar</NavLink></li>
          <li><NavLink to="/favoritos" className={linkClass}>Favoritos</NavLink></li>
          <li><NavLink to="/contacto" className={linkClass}>Contacto</NavLink></li>
        </ul>

      </nav>
    </header>
  );
}

export default NavBar;