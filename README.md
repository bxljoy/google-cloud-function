# Google Cloud Functions (Google Cloud Run) for Google APIs

This is a ProxyApiCall for secure my Google ApiKey for Google Cloud Vision Api

## Install Google Cloud Cli in your local machine

[Google Docs for install-sdk](https://cloud.google.com/sdk/docs/install-sdk)

## run the gcloud command line to deploy Google Cloud Functions

### deploy your Google Cloud Vision Function to Google Cloud Functions(1st gen)

```bash
gcloud functions deploy visionApiProxy --runtime nodejs20 --trigger-http --allow-unauthenticated
```

### deploy your Google Cloud Vision Function to Google Cloud Functions(2nd gen)

```bash
gcloud functions deploy visionApiProxy --gen2 --runtime nodejs20 --trigger-http --allow-unauthenticated
```

### deploy your Google Translate Function to Google Cloud Functions(2nd gen)

```bash
gcloud functions deploy googleTranslate --gen2 --runtime nodejs20 --trigger-http --allow-unauthenticated
```

### deploy your Google TTS Function to Google Cloud Functions(2nd gen)

```bash
gcloud functions deploy googleTextToSpeech --gen2 --runtime nodejs20 --trigger-http --allow-unauthenticated
```

## Because I used ApiKey to authenticate my request to Cloud Functions, don't forget to add Evironment Variables in Cloud Function

### The command to generate random string for customized ApiKey

```bash
openssl rand -base64 32
```

## Google Cloud Functions will be integrated into Google Cloud Run, deploy functions to Google Cloud Run

### Google Cloud Run to deploy Google Cloud Vision

```bash
gcloud beta run deploy cloud-vision-api --source . --function visionApiProxy --base-image nodejs20
```

### Google Cloud Run to deploy Google Translate

```bash
gcloud beta run deploy google-translate-api --source . --function googleTranslate --base-image nodejs20
```

### Google Cloud Run to deploy Google TTS

```bash
gcloud beta run deploy google-tts-api --source . --function googleTextToSpeech --base-image nodejs20
```

## In all the functions, using customized ApiKey to authenticate, don't forget to set the Environment Variables

### For Cloud Vision Api

```bash
VISION_API_KEY = [YOUR_API_KEY]
```

### For Google Translate Api

```bash
GOOGLE_TRANSLATE_API_KEY = [YOUR_API_KEY]
```

### For Google TTS Api

```bash
GOOGLE_TTS_API_KEY = [YOUR_API_KEY]
```

### For Google Gemini Api

```bash
GOOGLE_GEMINI_API_KEY = [YOUR_API_KEY]
```

## Firebase Authentication Version

### To make this the default region, run

```bash
gcloud config set functions/region europe-central2
```

### deploy your Google Translate Firebase Authentication Function to Google Cloud Functions(2nd gen)

```bash
gcloud functions deploy googleTranslateFirebase --gen2 --runtime nodejs20 --trigger-http --allow-unauthenticated
```

### deploy your Google Cloud Vision Firebase Authentication Function to Google Cloud Functions(2nd gen)

```bash
gcloud functions deploy visionApiProxyFirebase --gen2 --runtime nodejs20 --trigger-http --allow-unauthenticated
```

### deploy your Google TTS Firebase Authentication Function to Google Cloud Functions(2nd gen)

```bash
gcloud functions deploy googleTextToSpeechFirebase --gen2 --runtime nodejs20 --trigger-http --allow-unauthenticated
```

### deploy your Google Gemini Function to Google Cloud Functions(2nd gen)

```bash
gcloud functions deploy googleGemini --gen2 --runtime nodejs20 --trigger-http --allow-unauthenticated
```

### For Google Gemini Api updating

```bash
gcloud functions deploy googleGemini --gen2 --runtime nodejs20 --trigger-http --allow-unauthenticated --source .
```

## About Firebase Admin SDK initialization

### Error Description and Solution

#### There is an error suggests that Firebase is being initialized more than once in your application. This error can happen if you have multiple functions or modules that are all trying to initialize Firebase independently. To resolve this issue, you can use a singleton pattern to ensure Firebase is only initialized once
