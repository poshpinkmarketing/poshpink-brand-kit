exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try {
    const { prompt } = JSON.parse(event.body);
    
    console.log("API Key exists:", !!process.env.ANTHROPIC_API_KEY);
    console.log("API Key length:", (process.env.ANTHROPIC_API_KEY || "").length);
    
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }]
      })
    });
    
    const data = await response.json();
    console.log("Response status:", response.status);
    console.log("Response data:", JSON.stringify(data).slice(0, 200));
    
    if (data.error) {
      console.log("Anthropic error:", data.error.type, data.error.message);
      return { statusCode: 500, body: JSON.stringify({ error: data.error.message }) };
    }
    
    const text = (data.content || []).map(b => b.text || "").join("");
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ result: text })
    };
  } catch (err) {
    console.log("Caught error:", err.message);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
