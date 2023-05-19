import { writable } from 'svelte/store';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7OGMwN2GwdTbFhvP_H5Ndx8ZpW2admck",
  authDomain: "sga-voting-app.firebaseapp.com",
  projectId: "sga-voting-app",
  storageBucket: "sga-voting-app.appspot.com",
  messagingSenderId: "553750076505",
  appId: "1:553750076505:web:6e63fc269c884a21aee548",
  measurementId: "G-7XYJE30TY4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export async function getSomeList() {
    const citiesCol = doc(db, 'PHS IDs/420420');
    console.log("start");
    const smth = getDoc(citiesCol);
    console.log((await smth).data());
    let cityList = "filler";
    /*
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());*/
    console.log("end");
    console.log(cityList);
    return cityList;
  }

let windowHeight= 0;
let windownWidth = 0;

// user
export function resetUser() {
    user.set({
        name:undefined, 
        email:undefined, 
        loggedIn: false, 
        confirmed: false,
        grade: undefined
    });
    sidebar_width_em.set({
        width: 15,
        display: "none"
    });
}
export let user = writable({
    confirmed: false,
    name:undefined, 
    email:undefined, 
    loggedIn: false,
    grade: undefined
});

let confirmedValue;
export const unsubscribe = user.subscribe(value => {
    confirmedValue = value.confirmed;
});

// sidebar
export function updateSize() {
    windowHeight = window.innerHeight;
    windownWidth = window.innerWidth;
    console.log('doing something'); // TODO: why?? (works with this?)
    if (confirmedValue) {
        if (windownWidth < 800){
            sidebar_width_em.set({
                width: 0,
                display: "none"
            });
        } else {
            sidebar_width_em.set({
                width: 15,
                display: "block"
            });
        }
    }
}
window.addEventListener("resize", updateSize);
export let sidebar_width_em = writable({
    width: 15,
    display: "none"
});

// constants
export const title_size_em = 3;
export const subtitle_size_em = 1.5;
export const yellow_color = "rgba(255, 218, 26, 1)";
export const red_color = "rgb(248, 72, 72)";
export const green_color = "rgb(101, 255, 144)"
export const outline_width_em = 0.3;
export const outline_style = "outline-color:"  + yellow_color + ";" +
                             "outline-width: " + outline_width_em+"em;"+
                             "outline-style: solid;";