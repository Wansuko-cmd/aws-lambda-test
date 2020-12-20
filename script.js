const config = {
    apiKey: "AIzaSyAZ5_7auNFgG_LsHUsTMv8kL4PPAx7_qu8",
    authDomain: "test-project-b27c3.firebaseapp.com",
    projectId: "test-project-b27c3",
    storageBucket: "test-project-b27c3.appspot.com",
    messagingSenderId: "365055222501",
    appId: "1:365055222501:web:d4c0f797261c6d5a57ea0c",
    measurementId: "G-MQ1DMPZBTR"
  };

firebase.initializeApp(config)

const database = firebase.database();

const ref = database.ref("todo");

ref.push({
    test: "Hello"
})

console.log("success")