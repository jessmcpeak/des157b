(function() {
    'use strict';
    console.log(`running js`);

    const sections = document.querySelectorAll(`section`);
    const anchors = document.querySelectorAll(`a`);
    let mode = `light`;

    document.querySelector(`button`).addEventListener('click', function(event){
        if (mode === `light`) {
            console.log(`switching to dark mode`);

            document.querySelector(`img`).setAttribute(`src`, `images/mug-empty.png`);
            document.querySelector(`body`).className = `dark`;
            document.querySelector(`button`).className =`dark`;
            document.querySelector(`button`).innerText = `Refill`;
            for (const section of sections) {
                section.className = `dark`;
            }
            for (const a of anchors) {
                a.className = `dark`;
            }

            mode = `dark`;
        } else if (mode === `dark`) {
            console.log(`switching to light mode`);

            document.querySelector(`img`).setAttribute(`src`, `images/mug-full.png`);
            document.querySelector(`body`).removeAttribute(`class`);
            document.querySelector(`button`).removeAttribute(`class`);
            document.querySelector(`button`).innerText = `Drink`;
            for (const section of sections) {
                section.removeAttribute(`class`);
            }
            for (const a of anchors) {
                a.removeAttribute(`class`);
            }

            mode = `light`;
        }
    });
})()