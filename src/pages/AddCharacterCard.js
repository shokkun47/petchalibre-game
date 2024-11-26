import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/AddCharacterCard.css";

function AddCharacterCard() {
  const [name, setName] = useState(""); // キャラクター名
  const [imageUrl, setImageUrl] = useState(""); // 画像URL
  const navigate = useNavigate(); // ナビゲート用

  const handleAddCard = async () => {
    // 入力チェック: キャラクター名と画像URLが両方入力されていない場合
    if (!name || !imageUrl) {
      alert("キャラクター名と画像URLを入力してください。");
      return;
    }

    try {
      // Firestore にデータを追加
      const docRef = await addDoc(collection(db, "character-card"), {
        name,
        imageUrl,
      });
      alert(`キャラクターカードを追加しました (ID: ${docRef.id})`);
      setName(""); // 入力フィールドをリセット
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
