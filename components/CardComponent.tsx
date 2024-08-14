/* eslint-disable prettier/prettier */
import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";

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
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">{title} </h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        {image ? (
          <img
            alt={title}
            src={image}
            style={{ width: "100%", height: "auto" }}
          />
        ) : null}
        <p>{short_description}</p>
      </CardBody>
    </Card>
  );
};

export default CardComponent;
