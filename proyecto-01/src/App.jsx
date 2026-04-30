import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/home";
import N404 from "./pages/N404";
import Explore from "./pages/Explore";
import Detail from "./pages/Detail";
import { FavoritesProvider } from "./context/FavoritesContext";
import ToastContainer from "./components/Toast";
import Favorites from "./pages/Favorites";
import Contact from "./pages/Contact";

function App() {
  return (
    <FavoritesProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/explorar" element={<Explore />} />
          <Route path="/explorar/:id" element={<Detail />} />
          <Route path="/favoritos" element={<Favorites />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="*" element={<N404 />} />
        </Route>
      </Routes>
      <ToastContainer />
    </FavoritesProvider>
  );
}

export default App;
