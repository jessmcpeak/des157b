(function() {
    `use strict`;
    console.log(`running js`);

// Getting Data and Creating Displays
    async function getData(){
        const response = await fetch(`data/color_data.json`);
        const result = await response.json();
        console.log(result);

        for (key in result) {
            console.log(key, result[key]);
            if (result[key].Gender === 1) {
                document.querySelector(`#masc-data`).innerHTML += `<img alt="Mars symbol" src="images/mars.png">`;
            }
            else if (result[key].Gender === 2) {
                document.querySelector(`#slight-masc-data`).innerHTML += `<img alt="Mars symbol without the arrow tip" src="images/notmars.png">`;
            }
            else if (result[key].Gender === 3) {
                document.querySelector(`#neutral-data`).innerHTML += `<img alt="Circle" src="images/neutral.png">`;
            }
            else if (result[key].Gender === 4) {
                document.querySelector(`#slight-fem-data`).innerHTML += `<img alt="Venus symbol without the crossbar" src="images/notvenus.png">`;
            }
            else if (result[key].Gender === 5) {
                document.querySelector(`#fem-data`).innerHTML += `<img alt="Venus symbol" src="images/venus.png">`;
            }
        }
    }

    getData();

/*     const colorData = getData();
    console.log(colorData);
    
    function makeDisplays(obj){
        console.log(`here`);
        console.log(obj);
        for (key in obj) {
            console.log(key, obj[key]);
            if (point.Gender === 1) {

                document.querySelector(`#masc-data`).innerHTML += `<img alt="Mars symbol" src="images/mars.png">`;
                console.log(`adding point`);
            }
        }
    }

    makeDisplays(colorData); */

// Button and Show/Hide UI

    const buttons = document.querySelectorAll(`button`);
    console.log(buttons);

    for (const button of buttons) {
        button.addEventListener(`click`, function(event){
            event.preventDefault();

            if (button.className === `active`) {
                button.removeAttribute(`class`);

                if (button.id === `masc`) {
                    document.querySelector(`#masc-data`).classList = `data-layer hidden`;
                    console.log(`hiding masc data`);
                }
                else if (button.id === `slight-masc`) {
                    document.querySelector(`#slight-masc-data`).classList = `data-layer hidden`;
                    console.log(`hiding slight masc data`);
                }
                else if (button.id === `neutral`) {
                    document.querySelector(`#neutral-data`).classList = `data-layer hidden`;
                    console.log(`hiding neutral data`);
                }
                else if (button.id === `slight-fem`) {
                    document.querySelector(`#slight-fem-data`).classList = `data-layer hidden`;
                    console.log(`hiding slight fem data`);
    
                }
                else if (button.id === `fem`) {
                    document.querySelector(`#fem-data`).classList = `data-layer hidden`;
                    console.log(`hiding fem data`);
                }
            }
            else {
                button.setAttribute(`class`, `active`);

                if (button.id === `masc`) {
                    document.querySelector(`#masc-data`).classList = `data-layer`;
                    console.log(`showing masc data`);
                }
                else if (button.id === `slight-masc`) {
                    document.querySelector(`#slight-masc-data`).classList = `data-layer`;
                    console.log(`showing slight masc data`);
                }
                else if (button.id === `neutral`) {
                    document.querySelector(`#neutral-data`).classList = `data-layer`;
                    console.log(`showing neutral data`);
                }
                else if (button.id === `slight-fem`) {
                    document.querySelector(`#slight-fem-data`).classList = `data-layer`;
                    console.log(`showing slight fem data`);
                }
                else if (button.id === `fem`) {
                    document.querySelector(`#fem-data`).classList = `data-layer`;
                    console.log(`showing fem data`);
                }
            }
        });
    }
})();