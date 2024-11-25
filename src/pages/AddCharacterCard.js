import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/AddCharacterCard.css";

function AddCharacterCard() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate(); // ナビゲート用

  const handleAddCard = async () => {
    try {
      const docRef = await addDoc(collection(db, "character-card"), {
        name,
        imageUrl,
      });
      alert(`キャラクターカードを追加しました (ID: ${docRef.id})`);
      setName("");
      setImageUrl("");
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  };

  return (
    <div className="add-character-container">
      <h1>キャラクターカードを追加</h1>
      <input
        type="text"
        placeholder="キャラクター名"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="画像URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <div className="button-container">
        <button className="add-button" onClick={handleAddCard}>
          追加する
        </button>
        <button className="back-button" onClick={() => navigate("/")}>
          戻る
        </button>
      </div>
    </div>
  );
}

export default AddCharacterCard;
