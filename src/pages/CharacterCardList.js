import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/CharacterCardList.css";

function CharacterCardList() {
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate(); // 戻るためのナビゲーション

  useEffect(() => {
    const fetchCharacters = async () => {
      const snapshot = await getDocs(collection(db, "character-card"));
      setCharacters(snapshot.docs.map((doc) => doc.data()));
    };
    fetchCharacters();
  }, []);

  return (
    <div className="card-list-container">
      <h1>キャラクターカード一覧</h1>
      <div className="card-list">
        {characters.map((character, index) => (
          <div key={index} className="card">
            <h3>{character.name}</h3>
            {character.imageUrl && (
              <img src={character.imageUrl} alt={character.name} />
            )}
          </div>
        ))}
      </div>
      {/* 戻るボタン */}
      <button className="back-button" onClick={() => navigate("/")}>
        戻る
      </button>
    </div>
  );
}

export default CharacterCardList;
