import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../styles/Game.css";

const placeholderImage = "data:image/png;base64,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";

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
