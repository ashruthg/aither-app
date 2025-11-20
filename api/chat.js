export default async function handler(req, res) {
  console.log("SERVER: API ROUTE HIT");

  try {
    const apiKey = process.env.GROQ_API_KEY;
    console.log("SERVER: apiKey exists?", !!apiKey);

    if (!apiKey) {
      return res.status(500).json({ error: "API key missing on server" });
    }

    let body = req.body;

    // If body is a string, parse it
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (err) {
        console.log("SERVER: JSON parse error", err);
        return res.status(400).json({ error: "Invalid JSON body" });
      }
    }

    // Log parsed body
    console.log("SERVER: parsed body =", body);

    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      console.log("SERVER: No messages array found");
      return res.status(400).json({ error: "Messages array is required" });
    }

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

    const data = await groqResponse.json();
    console.log("SERVER: Groq data =", data);

    return res.status(200).json(data);
  } catch (err) {
    console.log("SERVER ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}
