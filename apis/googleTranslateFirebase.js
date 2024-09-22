const functions = require("@google-cloud/functions-framework");
const { Translate } = require("@google-cloud/translate").v2;
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
admin.initializeApp();

// Instantiates a client
const translate = new Translate();

module.exports = functions.http("googleTranslateFirebase", async (req, res) => {
  // Set CORS headers for all responses
  res.set("Access-Control-Allow-Origin", "*");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
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

  // Get the ID token from the Authorization header
  const idToken = req.get("Authorization")?.split("Bearer ")[1];
  if (!idToken) {
    return res.status(403).json({ error: "No token provided" });
  }

  try {
    // Verify the ID token
    await admin.auth().verifyIdToken(idToken);
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(403).json({ error: "Invalid token" });
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
