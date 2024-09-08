const functions = require("@google-cloud/functions-framework");
const { Translate } = require("@google-cloud/translate").v2;

// Instantiates a client
const translate = new Translate();
const API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;

module.exports = functions.http("googleTranslate", async (req, res) => {
  // Set CORS headers for all responses
  res.set("Access-Control-Allow-Origin", "*");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type, X-API-Key");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
    return;
  }

  if (!req.body.text || !req.body.targetLanguage) {
    res
      .status(400)
      .send("Please provide text and targetLanguage in the request body");
    return;
  }

  // Check for API key
  const providedApiKey = req.get("X-API-Key");
  if (!providedApiKey || providedApiKey !== API_KEY) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const text = req.body.text;
  const target = req.body.targetLanguage;

  try {
    const [translations] = await translate.translate(text, target);
    const [translation] = Array.isArray(translations)
      ? translations
      : [translations];

    // Get the detected source language
    const [detections] = await translate.detect(text);
    const detection = Array.isArray(detections) ? detections[0] : detections;

    res.status(200).json({
      originalText: text,
      originalLanguage: detection.language,
      translatedText: translation,
      targetLanguage: target,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred during translation");
  }
});
