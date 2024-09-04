# Google Cloud Functions for Google Cloud Vision Api

This is a ProxyApiCall for secure my Google ApiKey for Google Cloud Vision Api

## Install Google Cloud Cli in your local machine

[Google Docs for install-sdk](https://cloud.google.com/sdk/docs/install-sdk)

## run the gcloud command line to deploy your Google Cloud Functions to Google Cloud Platform

```bash
gcloud functions deploy visionApiProxy --runtime nodejs20 --trigger-http --allow-unauthenticated
```
