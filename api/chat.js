export default async function handler(req, res) {
  console.log("SERVER: API ROUTE HIT");

  try {
    const apiKey = process.env.GROQ_API_KEY;

    console.log("SERVER: apiKey exists?", !!apiKey);

    if (!apiKey) {
      console.log("SERVER: Missing key");
      return res.status(500).json({ error: "API key missing on server" });
    }

    // ----------------------------
    // 1. Log RAW body
    // ----------------------------
    console.log("SERVER: raw req.body =", req.body);

    let body;
    try {
      body = JSON.parse(req.body);
      console.log("SERVER: parsed body =", body);
    } catch (err) {
      console.log("SERVER: JSON parse error", err);
      return res.status(400).json({ error: "Invalid JSON body" });
    }

    const { messages } = body;

    if (!messages) {
      console.log("SERVER: messages missing");
      return res.status(400).json({ error: "Messages array is required" });
    }

    // ----------------------------
    // 2. Call Groq API
    // ----------------------------
    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages,
          temperature: 0.7,
          max_tokens: 2000,
        }),
      }
    );

    console.log("SERVER: groqResponse.status =", groqResponse.status);

    const data = await groqResponse.json();
    console.log("SERVER: Groq data =", data);

    return res.status(200).json(data);

  } catch (err) {
    console.log("SERVER ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}
