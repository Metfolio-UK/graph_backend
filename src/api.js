
import axios from 'axios';
import express from 'express';
import ServerlessHttp from 'serverless-http';
const app = express();
import { scheduleJob } from 'node-schedule';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc,collection  } from "firebase/firestore"; 
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyB-TtiSJnxzOMLNWPiUdd1Ayt_Yo-sx18I",
    authDomain: "metfolio-a4114.firebaseapp.com",
    databaseURL: "https://metfolio-a4114-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "metfolio-a4114",
    storageBucket: "metfolio-a4114.appspot.com",
    messagingSenderId: "1081224747539",
    appId: "1:1081224747539:web:674f6d7cae4f5676af3de6",
    measurementId: "G-9E7K37VNBB"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseapp);
const job = scheduleJob('* * * * *', async () => {
    console.log('Job has been triggered at: ', new Date());
    console.log("Gold data fectching starts");
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", "goldapi-80u6tl6xz09oy-io");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    
    fetch("https://www.goldapi.io/api/XAU/GBP", requestOptions)
    .then(response => response.text())
    .then(async (result)=>{
        const goldData = JSON.parse(result);
        console.log(goldData['price_gram_24k']);
        console.log(goldData.price_gram_22k);
        
        const data = {
            date: new Date().toISOString(),
            price: goldData['price_gram_24k'],
        };
        console.log(data);
        const uid = uuidv4().toString();
        await setDoc(doc(db, "graph",uid ), data);
    })
    .catch(error => console.log('error', error));
    console.log("Gold data fectching ends");
    
})
const PORT = process.env.PORT || 3001;
// Create a router to handle routes
const router = express.Router();

// Define a route that responds with a JSON object when a GET request is made to the root path
router.get("/", (req, res) => {
  res.json({
    hello: "Running Graph Server"
  });
});

// Use the router to handle requests to the `/.netlify/functions/api` path
app.use(`/.netlify/functions/api`, router);
app.listen(PORT, () => {console.log("Server started at port 3001")});
// Export the app and the serverless function
module.exports = app;


module.exports.handler = ServerlessHttp(app);