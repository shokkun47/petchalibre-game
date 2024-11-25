import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../styles/Game.css";

const placeholderImage = "https://via.placeholder.com/150?text=%3F";

function Game() {
  const location = useLocation();
  const navigate = useNavigate(); // 画面遷移用
  const { topCards, bottomCards } = location.state || {
    topCards: { character: null, items: [] },
    bottomCards: { character: null, items: [] },
  };

  const [isStarted, setIsStarted] = useState(false); // スタートボタンが押されたかどうか
  const [timeLeft, setTimeLeft] = useState(5); // 2分のタイマー（秒単位）
  const [revealed, setRevealed] = useState({}); // 各カードの表示状態
  const [isFinished, setIsFinished] = useState(false); // ゲームが終了したかどうか

  useEffect(() => {
    let timer;
    if (isStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer);
      setIsFinished(true); // ゲーム終了状態にする
    }
    return () => clearInterval(timer);
  }, [isStarted, timeLeft]);

  // カードをタップして内容を表示する関数
  const revealCard = (key) => {
    setRevealed((prev) => ({ ...prev, [key]: true }));
  };

  // カードをレンダリングする関数
  const renderCard = (key, content, isCharacter = false) => {
    const isRevealed = revealed[key]; // 現在のカードの表示状態を取得
    const cardClass = isCharacter ? "character-card" : "item-card";

    return (
      <Card
        className={`card ${cardClass}`}
        onClick={() => revealCard(key)}
      >
        <CardContent>
          <Typography variant="h5">
            {isRevealed ? content.name : "？？？"}
          </Typography>
          {isCharacter && (
            <img
              src={isRevealed ? content.imageUrl : placeholderImage}
              alt={content.name || "？？？"}
            />
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="game-container">
      {/* 上部のプレイヤー */}
      <div className="player-section reverse">
        {topCards.character &&
          renderCard("topCharacter", topCards.character, true)}
        <div className="card-row">
          {topCards.items.map((item, index) =>
            renderCard(`topItem${index}`, item)
          )}
        </div>
      </div>

      {/* 真ん中のスタートボタンとタイマー */}
      <div className="center-container">
        {!isStarted && !isFinished && (
          <button
            className="start-button"
            onClick={() => setIsStarted(true)}
          >
            スタート
          </button>
        )}
        {isStarted && !isFinished && (
          <div className="timer">
            <h2>
              残り時間:{" "}
              {Math.floor(timeLeft / 60)}:
              {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
            </h2>
          </div>
        )}
        {isFinished && (
          <div className="game-over">
            <h1>ゲーム終了</h1>
            <button
              className="home-button"
              onClick={() => navigate("/")}
            >
              ホームに戻る
            </button>
          </div>
        )}
      </div>

      {/* 下部のプレイヤー */}
      <div className="player-section">
        {bottomCards.character &&
          renderCard("bottomCharacter", bottomCards.character, true)}
        <div className="card-row">
          {bottomCards.items.map((item, index) =>
            renderCard(`bottomItem${index}`, item)
          )}
        </div>
      </div>
    </div>
  );
}

export default Game;
