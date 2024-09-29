const functions = require("@google-cloud/functions-framework");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const getFirebaseAdmin = require("./firebaseAdmin");

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

module.exports = functions.http("googleGemini", async (req, res) => {
  const admin = getFirebaseAdmin();
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

  if (!req.body.prompt) {
    res.status(400).send("Please provide a prompt in the request body");
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

  const { prompt, image } = req.body;

  try {
    // Use the Gemini Pro Vision model for multimodal inputs
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    let content;
    if (image) {
      // If an image is provided, create a multimodal content array
      content = [
        { text: prompt },
        {
          inlineData: {
            mimeType: image.mimeType,
            data: image.data,
          },
        },
      ];
    } else {
      // If no image, just use the text prompt
      content = prompt;
    }

    // Generate content
    const result = await model.generateContent(content);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({
      generatedText: text,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred during text generation");
  }
});
