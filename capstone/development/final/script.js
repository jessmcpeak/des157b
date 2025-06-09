(function() {
    `use strict`;
    // console.log(`running js`);

    let scenePointer = `introduction`;
    let lineCounter = 0;
    let dialogueData;
    let pointerTracker = [];

    async function getData() {
        const response = await fetch(`data/dialogue_data.json`);
        const result = await response.json();
        dialogueData = result;
        document.querySelector(`button`).addEventListener(`click`, playScene);
    }
    getData();

    function playScene() {
        // make conclusion available after visiting every main section
        if (scenePointer === `whatIsMoralStand` && dialogueData.discussCC.visited === true && dialogueData.discussPsyCap.visited === true && dialogueData.discussPhilCon.visited === true && dialogueData.discussBRC.visited === true) {
            dialogueData.whatIsMoralStand.choice.push({
                "type": "spoken",
                "text": "I'm ready to make my decision.",
                "nextScene": "conclusion"
            });
        }

        // update pointerTracker
        if (scenePointer != pointerTracker[pointerTracker.length - 1]) {
            pointerTracker.push(scenePointer);
            console.log(pointerTracker);
        }

        // change button to continue after start
        document.querySelector(`button`).innerText = `continue →`;
        document.querySelector(`img`).classList.remove(`invisible`);

        // disable old dialogue choices
        const oldLists = document.querySelectorAll(`ol li`);
        for (item of oldLists) {
            item.removeEventListener(`click`, choiceFunc);
            item.classList.remove(`select-active`);
            item.classList.add(`select-inactive`);
        }

        // if this scene is new, play dialogue line by line
        if (dialogueData[scenePointer].visited === false) {
            // if there's dialogue, play the dialogue line by line
            let line = dialogueData[scenePointer].dialogue[lineCounter];
            if (lineCounter < dialogueData[scenePointer].dialogue.length - 1) {
                addDialogue(line);
                lineCounter++;
                document.querySelector(`button`).addEventListener(`click`, playScene);
            }
            // if the dialogue is finished, present the choices
            else if (lineCounter >= dialogueData[scenePointer].dialogue.length - 1) {
                addDialogue(line);

                // end scene
                if (scenePointer === `conclusion`) {
                    document.querySelector(`button`).removeEventListener(`click`, playScene);
                    document.querySelector(`button`).addEventListener(`click`, function() {
                        window.location.reload();
                    });
                    document.querySelector(`button`).innerText = `restart →`;
                }
                // all other scenes
                else {
                    addChoices();
                }
            }
            document.querySelector(`#dialogue-box`).scrollTo(0, document.querySelector(`#dialogue-box`).scrollHeight);
        }
        // if the scene has been visited before, play the whole scene at once, skipping to the choice
        else if (dialogueData[scenePointer].visited === true) {
            // play the whole dialogue
            for (line of dialogueData[scenePointer].dialogue) {
                addDialogue(line);
            }
            // present the choices
            addChoices();
        }
    }

    function addDialogue(line) {
        let newLine = document.createElement(`p`);
        newLine.setAttribute(`class`, `${line.charID} ${line.type}`);
        let string = ``;
        if (line.type === `spoken`) {
            string = `<span class="name">${line.charName}</span>
                        <span class="spacer"> — </span>
                        <span>&ldquo;</span><span class="text">${line.text}</span><span>&rdquo;</span>`;
        }
        else {
            string = `<span class="name">${line.charName}</span>
                        <span class="spacer"> — </span>
                        <span class="text">${line.text}</span>`;
        }
        newLine.innerHTML = string;
        document.querySelector(`#dialogue-box`).insertBefore(newLine, document.querySelector(`button`));
    }

    function addChoices() {
        dialogueData[scenePointer].visited = true;

        // disable continue button
        document.querySelector(`button`).setAttribute(`class`, `inactive`);
        document.querySelector(`button`).removeEventListener(`click`, playScene);

        // create list and add to DOM
        let list = document.createElement(`ol`);
        document.querySelector(`#dialogue-box`).insertBefore(list, document.querySelector(`button`));

        // populate list
        for (let option of dialogueData[scenePointer].choice) {
            let listItem = document.createElement(`li`);
            listItem.setAttribute(`class`, `${option.type} unselected select-active`);
            listItem.setAttribute(`scene-pointer`, `${option.nextScene}`);
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

            // make choice functional
            document.querySelector(`ol:last-of-type li:last-of-type`).addEventListener(`click`, choiceFunc);
        }
    }

    const choiceFunc = function(event) {
        // grey out all choices
        const theseChoices = document.querySelectorAll(`ol:last-of-type li`);
        for (let choice of theseChoices) {
            choice.classList.remove(`selected`);
            choice.classList.add(`unselected`);
        }

        // make selected white
        event.currentTarget.classList.remove(`unselected`);
        event.currentTarget.classList.add(`selected`);

        // prep new scene
        scenePointer = event.currentTarget.getAttribute(`scene-pointer`);
        lineCounter = 0;

        // activate continue
        document.querySelector(`button`).setAttribute(`class`, `active`);
        document.querySelector(`button`).addEventListener(`click`, playScene);
    }
})();