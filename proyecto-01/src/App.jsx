import { Routes, Route } from "react-router";
import Layout from "./components/layout";
import Home from "./pages/home";
import N404 from "./pages/n404";
import Explore from "./pages/explore";
import Detail from "./pages/detail";
import { FavoritesProvider } from "./context/favoritesContext";
import ToastContainer from "./components/toast";
import Favorites from "./pages/favorites";
import Contact from "./pages/contact";

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
