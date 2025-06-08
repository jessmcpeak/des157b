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
        playScene();
    }
    getData();

    function playScene() {
        if (lineCounter < dialogueData[scenePointer].dialogue.length) {
            let line = dialogueData[scenePointer].dialogue[lineCounter];
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
            document.querySelector(`#dialogue-box`).insertBefore(newLine, document.querySelector(`button`));

            document.querySelector(`button`).classList.remove(`hidden`);
            lineCounter++;
            document.querySelector(`button`).addEventListener(`click`, playScene);
        }
        else if (lineCounter >= dialogueData[scenePointer].dialogue.length) {
            document.querySelector(`button`).setAttribute(`class`, `inactive`);
            document.querySelector(`button`).removeEventListener(`click`, playScene);
            let list = document.createElement(`ol`);
            document.querySelector(`#dialogue-box`).insertBefore(list, document.querySelector(`button`));
            for (let option of dialogueData[scenePointer].choice) {
                let listItem = document.createElement(`li`);
                listItem.setAttribute(`class`, `${option.type} unselected`);
                let string = ``;
                if (option.type === `spoken`) {
                    string = `<span class="spacer"> — </span>
                        <span>&ldquo;</span><span class="text">${option.text}</span><span>&rdquo;</span>`;
                } else {
                        string = `<span class="spacer"> — </span>
                        <span class="text">${option.text}</span>`;
                }
                listItem.innerHTML = string;
                list.appendChild(listItem);
                function optionListener(para) {
                    items = document.querySelectorAll(`ol li`);
                    for (item of items) {
                        item.classList.remove(`selected`);
                        item.classList.add(`unselected`);
                    }
                    scenePointer = `${option.nextScene}`;
                    para.classList.remove(`unselected`);
                    para.classList.add(`selected`);
                    lineCounter = 0;

                    document.querySelector(`button`).setAttribute(`class`, `active`);
                    document.querySelector(`button`).addEventListener(`click`, playScene);
                }
                const oldLists = document.querySelectorAll(`ol:not(:last-of-type) li`);
                for (item of oldLists) {
                    console.log(item);
                    item.removeEventListener(`click`, function(event) { optionListener(event.currentTarget) });
                }
                document.querySelector(`ol:last-of-type li:last-of-type`).addEventListener(`click`, function(event) { optionListener(event.currentTarget) });
            }
        }

        document.querySelector(`#dialogue-box`).scrollTo(0, document.querySelector(`#dialogue-box`).scrollHeight);
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
})();