const visionApiProxy = require("./apis/visionApiProxy");
const googleTranslate = require("./apis/googleTranslate");
const googleTextToSpeech = require("./apis/googleTextToSpeech");

const visionApiProxyFirebase = require("./apis/visionApiProxyFirebase");
const googleTranslateFirebase = require("./apis/googleTranslateFirebase");
const googleTextToSpeechFirebase = require("./apis/googleTextToSpeechFirebase");

const googleGemini = require("./apis/googleGemini");

exports.visionApiProxy = visionApiProxy;
exports.googleTranslate = googleTranslate;
exports.googleTextToSpeech = googleTextToSpeech;

exports.visionApiProxyFirebase = visionApiProxyFirebase;
exports.googleTranslateFirebase = googleTranslateFirebase;
exports.googleTextToSpeechFirebase = googleTextToSpeechFirebase;

exports.googleGemini = googleGemini;
