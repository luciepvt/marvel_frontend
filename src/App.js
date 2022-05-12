import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import cookies from "js-cookie";
import "./components/CharactersAndComics.scss";
// components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
// pages
import Characters from "./pages/Characters/Characters";
import Character from "./pages/Character/Character";
import Comics from "./pages/Comics/Comics";
import Favorites from "./pages/Favorites/Favorites";

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
