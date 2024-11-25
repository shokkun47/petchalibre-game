import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/ItemCardList.css";

function ItemCardList() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate(); // 戻るためのナビゲーション

  useEffect(() => {
    const fetchItems = async () => {
      const snapshot = await getDocs(collection(db, "item-card"));
      setItems(snapshot.docs.map((doc) => doc.data()));
    };
    fetchItems();
  }, []);

  return (
    <div className="card-list-container">
      <h1>アイテムカード一覧</h1>
      <div className="card-list">
        {items.map((item, index) => (
          <div key={index} className="card">
            <h3>{item.name}</h3>
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

export default ItemCardList;
