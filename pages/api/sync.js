/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import { createClient } from "@supabase/supabase-js";
import Airtable from "airtable";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_ANON_KEY,
      );

      Airtable.configure({
        apiKey: process.env.AIRTABLE_API_KEY,
      });

      const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
      const airtableTable = process.env.AIRTABLE_TABLE_NAME;
      const supabaseTable = process.env.SUPABASE_TABLE_NAME;

      // sync Airtable - Supabase
      await syncAirtableToSupabase(
        base,
        airtableTable,
        supabase,
        supabaseTable,
      );

      res.status(200).json({ message: "sync successful" });
    } catch (error) {
      console.error("sync failed:", error);
      res.status(500).json({ message: "sync failed", error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function syncAirtableToSupabase(
  base,
  airtableTable,
  supabase,
  supabaseTable,
) {
  const records = await base(airtableTable).select().all();

  const recordsForSupabase = records.map((record) => ({
    title: record.get("Title"),
    image: record.get("Image"),
    short_description: record.get("Short Description"),
  }));

  for (const record of recordsForSupabase) {
    await supabase.from(supabaseTable).upsert(record, {
      returning: "minimal",
      onConflict: "Title",
    });
  }
}
