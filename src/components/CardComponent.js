// components/CardComponent.js
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./CardComponent.css"; // コンポーネント固有のスタイル

const CardComponent = ({ content, isRevealed, onClick, isCharacter }) => {
  return (
    <Card className={`card ${isCharacter ? "character-card" : "item-card"}`} onClick={onClick}>
      <CardContent>
        <Typography variant="h5">
          {isRevealed ? content.name : "？？？"}
        </Typography>
        {isCharacter && content.imageUrl && (
          <img
            src={isRevealed ? content.imageUrl : "https://via.placeholder.com/150?text=%3F"}
            alt={content.name}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default CardComponent;
