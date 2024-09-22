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

## Firebase Authentication Version

### deploy your Google Translate Firebase Authentication Function to Google Cloud Functions(2nd gen)

```bash
gcloud functions deploy googleTranslateFirebase --gen2 --runtime nodejs20 --trigger-http --allow-unauthenticated
```
