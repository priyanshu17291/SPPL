// src/pages/api/login.js

import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    // Create a line in CSV format: "username,password\n"
    const csvLine = `${username},${password}\n`;

    // Resolve the absolute path to public/CSVs/login.csv
    const csvFilePath = path.join(process.cwd(), "public", "CSVs", "login.csv");

    fs.appendFile(csvFilePath, csvLine, (err) => {
      if (err) {
        console.error("Error writing to CSV:", err);
        return res.status(500).json({ error: "Failed to write to CSV" });
      }
      return res.status(200).json({ message: "Login saved successfully" });
    });
  } else {
    // Only allow POST
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
