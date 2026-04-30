import { Outlet } from "react-router";
import NavBar from "./NavBar";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <NavBar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}

export default Layout;