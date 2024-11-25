import React from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  const fetchCards = async () => {
    try {
      const characterSnapshot = await getDocs(collection(db, "character-card"));
      const itemSnapshot = await getDocs(collection(db, "item-card"));
  
      const characterArray = characterSnapshot.docs.map((doc) => doc.data());
      const itemArray = itemSnapshot.docs.map((doc) => doc.data());
  
      // 上部のキャラクターカード
      const randomCharacterTop =
        characterArray[Math.floor(Math.random() * characterArray.length)];
      const remainingCharactersForBottom = characterArray.filter(
        (char) => char !== randomCharacterTop
      );
  
      // 下部のキャラクターカード
      const randomCharacterBottom =
        remainingCharactersForBottom[
          Math.floor(Math.random() * remainingCharactersForBottom.length)
        ];
  
      // 上部のアイテムカード
      const randomItemsTop = [];
      const remainingItemsForBottom = [...itemArray]; // 下部のアイテムカード用にコピーを作成
  
      while (randomItemsTop.length < 2) {
        const randomIndex = Math.floor(Math.random() * remainingItemsForBottom.length);
        const randomItem = remainingItemsForBottom[randomIndex];
        randomItemsTop.push(randomItem);
        remainingItemsForBottom.splice(randomIndex, 1); // 選ばれたカードを除外
      }
  
      // 下部のアイテムカード
      const randomItemsBottom = [];
      while (randomItemsBottom.length < 2) {
        const randomIndex = Math.floor(Math.random() * remainingItemsForBottom.length);
        const randomItem = remainingItemsForBottom[randomIndex];
        randomItemsBottom.push(randomItem);
        remainingItemsForBottom.splice(randomIndex, 1); // 選ばれたカードを除外
      }
  
      const data = {
        topCards: { character: randomCharacterTop, items: randomItemsTop },
        bottomCards: { character: randomCharacterBottom, items: randomItemsBottom },
      };
  
      // カードデータを渡しつつ `/game` に遷移
      navigate("/game", { state: data });
    } catch (error) {
      console.error("Error fetching cards: ", error);
    }
  };
  

  return (
    <div className="home-container">
      <h1>ペチャリブレへようこそ</h1>
      <p>カードを引いて、対戦相手と勝負しましょう。</p>

      <div className="button-container">
        {/* ゲーム開始ボタン */}
        <button className="start-button" onClick={fetchCards}>
          ゲーム開始
        </button>

        {/* キャラクターカードを追加 */}
        <button
          className="add-button"
          onClick={() => navigate("/add-character-card")}
        >
          キャラクターカードを追加
        </button>

        {/* アイテムカードを追加 */}
        <button
          className="add-button"
          onClick={() => navigate("/add-item-card")}
        >
          アイテムカードを追加
        </button>

        {/* キャラクターカードの一覧表示 */}
        <button
          className="list-button"
          onClick={() => navigate("/character-card-list")}
        >
          キャラクターカードの一覧
        </button>

        {/* アイテムカードの一覧表示 */}
        <button
          className="list-button"
          onClick={() => navigate("/item-card-list")}
        >
          アイテムカードの一覧
        </button>
      </div>
    </div>
  );
}

export default Home;
