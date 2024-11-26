import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/AddItemCard.css";

function AddItemCard() {
  const [name, setName] = useState(""); // アイテム名
  const navigate = useNavigate(); // ナビゲート用

  const handleAddCard = async () => {
    // 入力チェック: アイテム名が空の場合
    if (!name) {
      alert("アイテム名を入力してください。");
      return;
    }

    try {
      // Firestore にデータを追加
      const docRef = await addDoc(collection(db, "item-card"), {
        name,
      });
      alert(`アイテムカードを追加しました (ID: ${docRef.id})`);
      setName(""); // 入力フィールドをリセット
    } catch (error) {
      alert(`カードを追加する権限がありません`);
    }
  };

  return (
    <div className="add-item-container">
      <h1>アイテムカードを追加</h1>
      <input
        type="text"
        placeholder="アイテム名"
        value={name}
        onChange={(e) => setName(e.target.value)}
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

export default AddItemCard;
