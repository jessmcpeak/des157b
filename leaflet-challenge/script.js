(function(){
    'use strict';
    console.log(`running js`);

    // create map
    var map = L.map(`map`).setView([38.67052563290006, -121.14582464529994], 10);

    // define map tileset
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // mercy folsom
    var mercy = L.marker([38.67052563290006, -121.14582464529994]).addTo(map);
    mercy.bindPopup("<b>Mercy Hospital of Folsom, Folsom</b><br>I was born here on December 21st, 2001.").openPopup();

    // crestshire house
    var crestshire = L.marker([38.68147279246238, -121.25336411506119]).addTo(map);
    crestshire.bindPopup("<b>8236 Crestshire Cir, Orangevale</b><br>My family lived here from before I was born until 2009.");

    // river bank house
    var riverBank = L.marker([38.72695139677706, -121.34082264830964]).addTo(map);
    riverBank.bindPopup("<b>3185 River Bank Ct, Roseville</b><br>My family moved here in 2009 and lived here until the summer of 2020.");

    // marlee apartment
    var marlee = L.marker([38.79208155791048, -121.2635750239949]).addTo(map);
    marlee.bindPopup("<b>3355 Marlee Way, Rocklin</b><br>My family lived here from the summer of 2020 until the fall of 2024.");

    // jade
    var jade = L.marker([38.54144826130834, -121.77708836803971]).addTo(map);
    jade.bindPopup("<b>2231 Jade Street, Davis</b><br>I moved here when I transferred to UC Davis in the fall of 2022.");

    // sol
    var sol = L.marker([38.54257545476013, -121.76993007310173]).addTo(map);
    sol.bindPopup("<b>301D N Sage St, Davis</b><br>I moved here for my second year at UCD in the summer of 2023.");

    // the spoke
    var spoke = L.marker([38.55436700465377, -121.74024424424955]).addTo(map);
    spoke.bindPopup("<b>945 J St, Davis</b><br>I moved here for my third and final year at UCD in the summer of 2024.");

    // cool house
    var cool = L.marker([38.89636252342547, -120.99889971842973]).addTo(map);
    cool.bindPopup("<b>1395 Blue Tent Ct, Cool</b><br>My family moved here in the fall of 2024.");
}());