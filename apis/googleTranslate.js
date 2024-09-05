const functions = require("@google-cloud/functions-framework");
const { Translate } = require("@google-cloud/translate").v2;

module.exports = functions.http("googleTranslate", async (req, res) => {
  // Instantiates a client
  const translate = new Translate();

  // Set CORS headers for all responses
  res.set("Access-Control-Allow-Origin", "*");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
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

  const text = req.body.text;
  const target = req.body.targetLanguage;

  try {
    const [translation] = await translate.translate(text, target);
    res.status(200).json({
      originalText: text,
      translatedText: translation,
      targetLanguage: target,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred during translation");
  }
});