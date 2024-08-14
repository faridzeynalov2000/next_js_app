/* eslint-disable prettier/prettier */
import React from "react";

export interface CardProps {
  title: string;
  image: string;
  short_description: string;
}

const CardComponent: React.FC<CardProps> = ({
  title,
  image,
  short_description,
}) => {

  return (
    <div style={{ border: "1px solid gray", padding: "20px", margin: "10px" }}>
      <h2>{title}</h2>
      {image ? (
        <img
          alt={title}
          src={image}
          style={{ width: "100%", height: "auto" }}
        />
      ) : null}
      <p>{short_description}</p>
    </div>
  );
};

export default CardComponent;
