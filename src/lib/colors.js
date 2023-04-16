import { readable, writable } from 'svelte/store';

let windowHeight= 0;
let windownWidth = 0;

function updateSize() {
    windowHeight = window.innerHeight;
    windownWidth = window.innerWidth;
    console.log(windownWidth);
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
    console.log(sidebar_width_em);
    
}
window.addEventListener("resize", updateSize);


export const yellow_color = "rgba(255, 218, 26, 1)";
export const outline_width_em = 0.3;
export let sidebar_width_em = writable({
    width: 15,
    display: "none"
});
export const outline_style = "outline-color:"  + yellow_color + ";" +
                             "outline-width: " + outline_width_em+"em;"+
                             "outline-style: solid;";