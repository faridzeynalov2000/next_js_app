/* eslint-disable no-console */
// pages/page.tsx
"use client";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import CardComponent from "../components/CardComponent";

interface Card {
  title: string;
  image: string;
  short_description: string;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
);

const Page = () => {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    async function loadCards() {
      const { data, error } = await supabase
        .from(process.env.NEXT_PUBLIC_SUPABASE_TABLE_NAME || "")
        .select("*");

      if (error) {
        console.error("Error loading cards:", error);
      } else if (data) {
        setCards(data);
      }
    }

    loadCards();
  }, []);

  return (
    <div>
      {cards.map((card, index) => (
        <CardComponent
          key={index}
          image={card.image}
          short_description={card.short_description}
          title={card.title}
        />
      ))}
    </div>
  );
};

export default Page;
