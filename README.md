# Google Cloud Functions for Google Cloud Vision Api

This is a ProxyApiCall for secure my Google ApiKey for Google Cloud Vision Api

## Install Google Cloud Cli in your local machine

[Google Docs for install-sdk](https://cloud.google.com/sdk/docs/install-sdk)

## run the gcloud command line to deploy your Google Cloud Vision Function to Google Cloud Functions(1st gen)

```bash
gcloud functions deploy visionApiProxy --runtime nodejs20 --trigger-http --allow-unauthenticated
```

## run the gcloud command line to deploy your Google Cloud Vision Function to Google Cloud Functions(2nd gen)

```bash
gcloud functions deploy visionApiProxy --gen2 --runtime nodejs20 --trigger-http --allow-unauthenticated
```

## run the gcloud command line to deploy your Google Translate Function to Google Cloud Functions(2nd gen)

```bash
gcloud functions deploy googleTranslate --gen2 --runtime nodejs20 --trigger-http --allow-unauthenticated
```

## Because I used ApiKey to authenticate my request to Cloud Functions, don't forget to add Evironment Variables in Cloud Function

### The command to generate random string for customized ApiKey

```bash
openssl rand -base64 32
```

## Google Cloud Functions will be integrated into Google Cloud Run, try the command to deploy a new Cloud Run Functions:

```bash
gcloud beta run deploy cloud-vision-api --source . --function visionApiProxy --base-image nodejs20
```
