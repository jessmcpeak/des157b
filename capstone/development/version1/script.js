(function() {
    `use strict`;
    console.log(`running js`);

    let scenePointer = `introduction`;
    let lineCounter = 0;
    let dialogueData;

    async function getData(){
        const response = await fetch(`data/dialogue_data.json`);
        const result = await response.json();
        console.log(result);
        dialogueData = result;
        playScene(dialogueData, lineCounter);
    }
    getData();

    function playScene(data, counter) {
        let line = data[scenePointer].dialogue[counter];
        let newLine = document.createElement(`p`);
        newLine.setAttribute(`class`, `${line.charID} ${line.type}`);
        let string = ``;
        if (line.type === `spoken`) {
            string = `<span class="name">${line.charName}</span>
                        <span class="spacer"> — </span>
                        <span>&ldquo;</span><span class="text">${line.text}</span><span>&rdquo;</span>`;
        } else {
            string = `<span class="name">${line.charName}</span>
                        <span class="spacer"> — </span>
                        <span class="text">${line.text}</span>`;
        }
        newLine.innerHTML = string;
        // document.querySelector(`#dialogue-box`).appendChild(newLine);
        document.querySelector(`#dialogue-box`).insertBefore(newLine, document.querySelector(`button`));

        if (counter === 0) {
            document.querySelector(`button`).classList.remove(`hidden`);
        }

        document.querySelector(`#dialogue-box`).scrollTo(0, document.querySelector(`#dialogue-box`).scrollHeight);
    }

    document.querySelector(`button`).addEventListener(`click`, function(event){
        event.preventDefault();
        lineCounter++;
        playScene(dialogueData, lineCounter);
    });

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
})();