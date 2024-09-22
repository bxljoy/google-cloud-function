const functions = require("@google-cloud/functions-framework");
const vision = require("@google-cloud/vision");
const getFirebaseAdmin = require("./firebaseAdmin");

const client = new vision.ImageAnnotatorClient();

module.exports = functions.http("visionApiProxyFirebase", async (req, res) => {
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

  // Handle only POST requests
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
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

  try {
    const { image, features } = req.body;

    if (!image || !features) {
      res.status(400).send("Missing image or features in request body");
      return;
    }

    const [result] = await client.annotateImage({
      image: { content: image },
      features: features,
    });

    const detections = result.textAnnotations;

    if (detections && detections.length > 0) {
      res.status(200).json({ text: detections[0].description });
    } else {
      res.status(200).json({ text: "No text detected" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error occurred during text extraction");
  }
});
