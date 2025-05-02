(function() {
    `use strict`;
    console.log(`running js`);

    const buttons = document.querySelectorAll(`button`);
    console.log(buttons);

    for (const button of buttons) {
        button.addEventListener(`click`, function(event){
            event.preventDefault();

            if (button.className === `active`) {
                button.removeAttribute(`class`);

                if (button.id === `masc`) {
                    document.querySelector(`#masc-data`).classList = `data-layer hidden`;
                }
                else if (button.id === `slight-masc`) {
                    document.querySelector(`#slight-masc-data`).classList = `data-layer hidden`;
                }
                else if (button.id === `neutral`) {
                    document.querySelector(`#neutral-data`).classList = `data-layer hidden`;
                }
                else if (button.id === `slight-fem`) {
                    document.querySelector(`#slight-fem-data`).classList = `data-layer hidden`;
    
                }
                else if (button.id === `fem`) {
                    document.querySelector(`#fem-data`).classList = `data-layer hidden`;
                }
            }
            else {
                button.setAttribute(`class`, `active`);

                if (button.id === `masc`) {
                    document.querySelector(`#masc-data`).classList = `data-layer`;
                }
                else if (button.id === `slight-masc`) {
                    document.querySelector(`#slight-masc-data`).classList = `data-layer`;
                }
                else if (button.id === `neutral`) {
                    document.querySelector(`#neutral-data`).classList = `data-layer`;
                }
                else if (button.id === `slight-fem`) {
                    document.querySelector(`#slight-fem-data`).classList = `data-layer`;
    
                }
                else if (button.id === `fem`) {
                    document.querySelector(`#fem-data`).classList = `data-layer`;
                }
            }
        });
    }
})();