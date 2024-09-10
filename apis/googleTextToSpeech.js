const functions = require("@google-cloud/functions-framework");
const textToSpeech = require("@google-cloud/text-to-speech");

// Instantiates a client
const client = new textToSpeech.TextToSpeechClient();
const API_KEY = process.env.GOOGLE_TTS_API_KEY;

module.exports = functions.http("googleTextToSpeech", async (req, res) => {
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

  if (!req.body.text || !req.body.languageCode) {
    res
      .status(400)
      .send("Please provide text and languageCode in the request body");
    return;
  }

  // Check for API key
  const providedApiKey = req.get("X-API-Key");
  if (!providedApiKey || providedApiKey !== API_KEY) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const text = req.body.text;
  const languageCode = req.body.languageCode;

  try {
    // Construct the request
    const request = {
      input: { text: text },
      // Select the language and SSML voice gender (optional)
      voice: { languageCode: languageCode, ssmlGender: "NEUTRAL" },
      // Select the type of audio encoding
      audioConfig: { audioEncoding: "MP3" },
    };

    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);

    // Send the audio content as base64 encoded string
    res.status(200).json({
      audioContent: response.audioContent.toString("base64"),
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred during text-to-speech conversion");
  }
});
