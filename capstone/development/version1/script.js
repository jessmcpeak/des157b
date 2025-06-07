(function() {
    `use strict`;
    console.log(`running js`);

    document.querySelector(`.choices li p`);

    async function getData(){
        const response = await fetch(`data/dialogue_data.json`);
        const result = await response.json();
        console.log(result);
        playScene(result);
    }
    getData();

    function playScene(data) {
        let scenePointer;
        if (scenePointer) {

        } else {
            for (let line of data.introduction.dialogue) {
                let msg = document.createElement(`p`);
                let string = ``;
                if (line.type === `spoken`) {
                    string = `<p class="${line.charID} ${line.type}">
                                    <span class="name">${line.charName}</span>
                                    <span class="spacer"> — </span>
                                    <span>&ldquo;</span><span class="text">${line.text}</span><span>&rdquo;</span>
                                </p>`;
                } else {
                    string = `<p class="${line.charID} ${line.type}">
                                    <span class="name">${line.charName}</span>
                                    <span class="spacer"> — </span>
                                    <span class="text">${line.text}</span>
                                </p>`;
                }
                msg.innerHTML = string;
                document.querySelector(`#dialogue-box`).appendChild(msg);
            }
        }

    }

    // scene start
    // display initial text
    // user hits continue
    // display next text
    // user hits continue
    // repeat until
    // display dialogue options
    // conintue button is inactive
    // user selects dialogue option
    // continue button is active
    // user hits continue
    // scene start

    // document.querySelector(`button .active`).addEventListener(`click`, function(event){
    //     event.preventDefault();
    // });
})();