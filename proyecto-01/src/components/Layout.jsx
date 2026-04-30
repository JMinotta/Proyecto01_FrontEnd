import { Outlet } from "react-router";
import NavBar from "./navBar";
import Footer from "./footer";

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