import * as firebase from "firebase"; //(Do in cmd not terminal) npm install -g yarn //yarn add firebase


var firebaseConfig = {
  apiKey: "AIzaSyCFvxiVIVCVPNdshVgzfo8EEEde7WCaZGM",
  authDomain: "testfirebase-4f3dc.firebaseapp.com",
  databaseURL: "https://testfirebase-4f3dc.firebaseio.com",
  projectId: "testfirebase-4f3dc",
  storageBucket: "testfirebase-4f3dc.appspot.com",
  messagingSenderId: "444641889904",
  appId: "1:444641889904:web:8138f1d323b4eace8c2eb5",
  measurementId: "G-6G48DL4QGE"
};
// Initialize Firebase

if (firebaseConfig.apiKey != undefined && !firebase.inited) {
  firebase.initializeApp(firebaseConfig);
  firebase.inited = true;
}

global.user = null;
global.userkey = null;
global.proimage = null;

global.app = null;
global.event = null;

global.firebase = firebase,
  global.config = firebaseConfig,

  global.comma = function (num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

export default global;

/*Object {
    "apiKey": "AIzaSyCFvxiVIVCVPNdshVgzfo8EEEde7WCaZGM",
    "appName": "[DEFAULT]",
    "authDomain": "testfirebase-4f3dc.firebaseapp.com",
    "createdAt": "1594982018512",
    "displayName": null,
    "email": "test@mail.com",
    "emailVerified": false,
    "isAnonymous": false,
    "lastLoginAt": "1596272513697",
    "multiFactor": Object {
      "enrolledFactors": Array [],
    },
    "phoneNumber": null,
    "photoURL": null,
    "providerData": Array [
      Object {
        "displayName": null,
        "email": "test@mail.com",
        "phoneNumber": null,
        "photoURL": null,
        "providerId": "password",
        "uid": "test@mail.com",
      },
    ],
    "redirectEventId": null,
    "stsTokenManager": Object {
      "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU1NGE3NTQ3Nzg1ODdjOTRjMTY3M2U4ZWEyNDQ2MTZjMGMwNDNjYmMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGVzdGZpcmViYXNlLTRmM2RjIiwiYXVkIjoidGVzdGZpcmViYXNlLTRmM2RjIiwiYXV0aF90aW1lIjoxNTk2MjcyNTEzLCJ1c2VyX2lkIjoiaW9FMDFQVE9Eb2dCQkl4clVDUVRqWG9XMk9nMiIsInN1YiI6ImlvRTAxUFRPRG9nQkJJeHJVQ1FUalhvVzJPZzIiLCJpYXQiOjE1OTYyNzI1MTMsImV4cCI6MTU5NjI3NjExMywiZW1haWwiOiJ0ZXN0QG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3RAbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.RuUp4PTfkGuQ5J5f-3b_JAxmiCofeim4_Ww70bc1JSl2pO9RD1mlYIiRL90e78NM-Mjo0-oFjvB8T76FocXwJGp_m0QXJtS53k-43mYqYu_36CHWUO403GufOxk8XRGJW98-xSzGXcq17jh3EJAWgEJDVudZi_IUtBAaFi1bp3LALdDH-0Sgn220RC7RsTiRFNlsr5TuE8WyuL8_SChVqux79IA35DWN7n6g2lHHT2da8Z8DbCeCPpqUnddYSYiXHVwe7W-e5ibZVN6aZs8U6LKSsrkLSgeYTshf0XykQOy44EfS08y6ANqF98Vnc4yIZFbFzw4RdfJlhoccs862lg",
      "apiKey": "AIzaSyCFvxiVIVCVPNdshVgzfo8EEEde7WCaZGM",
      "expirationTime": 1596276113000,
      "refreshToken": "AE0u-NfkwEzTdqvUfcy1EXbeNoZ29P2e-LYs2kFVbJGiPlUTP3cAVfT5QoLeG3Zs8i8lti3kznkuO_eKzTsLh5gkQAJOcnqhulo615Qr9oh0TKciGBDQEVj6pAHYM6YDiJCVyvxd1kZEq0L4ebHJNc0NT3WxzbmiKWpPl88-LCzlDHMoBLezm76UJDjmyr0uRE8wN4L8SUSg0Q_iCtQRTDepyq6QXDhkKA",
    },
    "tenantId": null,
    "uid": "ioE01PTODogBBIxrUCQTjXoW2Og2",
  }*/