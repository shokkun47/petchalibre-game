import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import AddCharacterCard from "./pages/AddCharacterCard";
import AddItemCard from "./pages/AddItemCard";
import CharacterCardList from "./pages/CharacterCardList";
import ItemCardList from "./pages/ItemCardList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/add-character-card" element={<AddCharacterCard />} />
        <Route path="/add-item-card" element={<AddItemCard />} />
        <Route path="/character-card-list" element={<CharacterCardList />} />
        <Route path="/item-card-list" element={<ItemCardList />} />
      </Routes>
    </Router>
  );
}

export default App;
