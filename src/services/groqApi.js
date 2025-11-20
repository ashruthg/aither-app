export const sendMessageToAI = async (messages) => {
  try {
    // Call your backend API route instead of Groq directly
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ messages })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Server error");
    }

    const data = await response.json();

    return data.choices[0].message.content;

  } catch (error) {
    console.error("Error:", error.message);
    return "❌ Something went wrong: " + error.message;
  }
};
