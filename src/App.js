import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import cookies from "js-cookie";
import "./components/CharactersAndComics.scss";
// components
import Header from "./components/Header";
import Footer from "./components/Footer";
// pages
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Characters />} />
          <Route path="/characters/:id" element={<Character />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
