# Google Cloud Functions for Google APIs

This project provides secure proxy APIs for various Google services, including Cloud Vision, Translate, Text-to-Speech, and Gemini. It uses Google Cloud Functions (now integrated with Cloud Run) to securely manage API keys and provide authenticated access to these services.

## Prerequisites

- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install-sdk) installed on your local machine
- A Google Cloud Project with the necessary APIs enabled
- Firebase project (for Firebase Authentication version)

## Deployment

### Standard Deployment (API Key Authentication)

Deploy functions to Google Cloud Functions (2nd gen):

```bash
gcloud functions deploy visionApiProxy --gen2 --runtime nodejs20 --trigger-http --allow-unauthenticated
gcloud functions deploy googleTranslate --gen2 --runtime nodejs20 --trigger-http --allow-unauthenticated
gcloud functions deploy googleTextToSpeech --gen2 --runtime nodejs20 --trigger-http --allow-unauthenticated
gcloud functions deploy googleGemini --gen2 --runtime nodejs20 --trigger-http --allow-unauthenticated
```

### Firebase Authentication Deployment

Set the default region (optional):

```bash
gcloud config set functions/region europe-central2
```

Deploy functions with Firebase Authentication:

```bash
gcloud functions deploy visionApiProxyFirebase --gen2 --runtime nodejs20 --trigger-http --allow-unauthenticated
gcloud functions deploy googleTranslateFirebase --gen2 --runtime nodejs20 --trigger-http --allow-unauthenticated
gcloud functions deploy googleTextToSpeechFirebase --gen2 --runtime nodejs20 --trigger-http --allow-unauthenticated
gcloud functions deploy googleGemini --gen2 --runtime nodejs20 --trigger-http --allow-unauthenticated
```

### Deployment to Google Cloud Run

```bash
gcloud beta run deploy cloud-vision-api --source . --function visionApiProxy --base-image nodejs20
gcloud beta run deploy google-translate-api --source . --function googleTranslate --base-image nodejs20
gcloud beta run deploy google-tts-api --source . --function googleTextToSpeech --base-image nodejs20
```

## Environment Variables

Set these environment variables in your Google Cloud Function or Cloud Run service:

```
VISION_API_KEY=[YOUR_API_KEY]
GOOGLE_TRANSLATE_API_KEY=[YOUR_API_KEY]
GOOGLE_TTS_API_KEY=[YOUR_API_KEY]
GOOGLE_GEMINI_API_KEY=[YOUR_API_KEY]
```

To generate a random string for a custom API key:

```bash
openssl rand -base64 32
```

## Updating Deployed Functions

To update an existing function (e.g., googleGemini):

```bash
gcloud functions deploy googleGemini --gen2 --runtime nodejs20 --trigger-http --allow-unauthenticated --source .
```

## Firebase Admin SDK Initialization

To avoid multiple initializations of Firebase, use a singleton pattern in your code. For example:

```javascript
// firebaseAdmin.js
const admin = require("firebase-admin");

let adminApp;

function getFirebaseAdmin() {
  if (!adminApp) {
    adminApp = admin.initializeApp();
  }
  return admin;
}

module.exports = getFirebaseAdmin;
```

Then, in your function files:

```javascript
const getFirebaseAdmin = require("./firebaseAdmin");

// In your function
const admin = getFirebaseAdmin();
// Use admin as needed
```

## Security Considerations

- Ensure that your API keys and Firebase configuration are kept secure and not exposed in your source code.
- Use appropriate IAM roles and permissions for your Google Cloud resources.
- Regularly rotate your API keys and review access logs.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
