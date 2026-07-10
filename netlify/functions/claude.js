exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error("ANTHROPIC_API_KEY is missing in Netlify.");
    }

    const body = JSON.parse(event.body || "{}");
    const prompt = body.prompt;

    if (!prompt || typeof prompt !== "string") {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "A valid prompt is required." }),
      };
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 8000,
        temperature: 0.2,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = await response.json();

    console.log("Anthropic response status:", response.status);
    console.log("Anthropic stop reason:", data.stop_reason || "unknown");
    console.log("Anthropic usage:", JSON.stringify(data.usage || {}));

    if (!response.ok || data.error) {
      const message =
        data?.error?.message ||
        `Anthropic request failed with status ${response.status}.`;

      return {
        statusCode: response.status || 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: message }),
      };
    }

    const text = (data.content || [])
      .filter((block) => block.type === "text")
      .map((block) => block.text || "")
      .join("");

    if (!text) {
      throw new Error("Anthropic returned an empty response.");
    }

    if (data.stop_reason === "max_tokens") {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error:
            "The Blueprint response was cut off because it reached the output limit.",
        }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        result: text,
        stopReason: data.stop_reason || null,
        usage: data.usage || null,
      }),
    };
  } catch (err) {
    console.error("Claude function error:", err);

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: err.message || "Unexpected server error.",
      }),
    };
  }
};
