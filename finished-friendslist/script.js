(function(){
    Parse.initialize("B2kZJW7QXMDTILSz5USV3ngQaQyIIgAfzjUZ6CgU", "RzrtpkaLWmpVJyECj6UghjrTgPdjZ50Kz9yTJ56Z");
    Parse.serverURL = "https://parseapi.back4app.com/";
    
    const newButton = document.querySelector(`#newbtn`);
    // const editButtons = document.querySelectorAll(`.fa-edit`);
    const addFriendForm = document.querySelector(`#add-friend`);
    const editFriendForm = document.querySelector(`#edit-friend`);
    const friendList = document.querySelector(`main ol`);
    const inputs = document.querySelectorAll(`#add-friend input:not([type=submit])`);
    let thisRecord;
    
    
    // Start read from database
    
    async function displayFriends(){
        const friends = Parse.Object.extend(`Friends`);
        const query = new Parse.Query(friends);
    
        try {
            const results = await query.ascending(`lname`).find();
            // console.log(results);
        
            results.forEach(function(eachFriend){
                const id = eachFriend.id;
                const lname = eachFriend.get(`lname`);
                const fname = eachFriend.get(`fname`);
                const email = eachFriend.get(`email`);
                const facebook = eachFriend.get(`facebook`);
                const twitter = eachFriend.get(`twitter`);
                const instagram = eachFriend.get(`instagram`);
                const linkedin = eachFriend.get(`linkedin`);
        
                const theListItem = document.createElement(`li`);
                theListItem.setAttribute(`id`, `r-${id}`); // the r- is so that no id ever starts with a number
                theListItem.innerHTML = `
                        <div class="name">
                            ${fname} ${lname}
                        </div>
                        <div class="email">
                            <i class="fas fa-envelope-square"></i> ${email}
                        </div>
                        <div class="social">
                            <a href="${facebook}"><i class="fab fa-facebook-square"></i></a>
                            <a href="${twitter}"><i class="fab fa-twitter-square"></i></a>
                            <a href="${instagram}"><i class="fab fa-instagram"></i></a>
                            <a href="${linkedin}"><i class="fab fa-linkedin"></i></a>
                        </div>
                        <i id="e-${id}" class="fas fa-edit"></i>
                        <i id="d-${id}" class="fas fa-times-circle"></i>`;
                friendList.append(theListItem);
            });
        } catch (error) {
            console.error(`Error while fetching friends`, error);
        }
    }
    displayFriends();
    
    // End read from database
    
    
    // Start create new friend
    
    newButton.addEventListener(`click`, function(event){
        event.preventDefault();
    
        addFriendForm.className = `add-friend-onscreen`;
    });
    
    addFriendForm.addEventListener(`submit`, function(event){
        event.preventDefault();
        // addFriendForm.className = `add-friend-offscreen`;
        addFriend();
    });
    
    async function addFriend() {
        const newFriend = {};
    
        for (const input of inputs) {
            const key = input.getAttribute(`name`);
            const value = input.value;
            newFriend[key] = value;
        }
    
        // If the required form fields have been filled
        if (newFriend.fname != `` && newFriend.lname != `` && newFriend.email != ``) {
            // Create an object with the keys of `Friends`
            const newFriendData = new Parse.Object(`Friends`);
    
            // Populate with form field data
            newFriendData.set(`fname`, newFriend.fname);
            newFriendData.set(`lname`, newFriend.lname);
            newFriendData.set(`email`, newFriend.email);
            newFriendData.set(`facebook`, newFriend.facebook);
            newFriendData.set(`twitter`, newFriend.twitter);
            newFriendData.set(`instagram`, newFriend.instagram);
            newFriendData.set(`linkedin`, newFriend.linkedin);
    
            try {
                // Save to B4A db
                const result = await newFriendData.save();
                // console.log(`friend created`, result);
    
                // Close and clear the form
                addFriendForm.className = `add-friend-offscreen`;
                resetFormFields();
    
                // Update the DOM
                friendList.innerHTML = ``;
                displayFriends();
            } catch (error) {
                console.error(`Error while creating friend: `, error);
            }
        } else {
            addFriendForm.className = `add-friend-offscreen`;
        }
    }
    
    function resetFormFields(){
        document.querySelector(`#fname`).value = ``;
        document.querySelector(`#lname`).value = ``;
        document.querySelector(`#email`).value = ``;
        document.querySelector(`#fbook`).value = `https://facebook.com`;
        document.querySelector(`#twitter`).value = `https://twitter.com`;
        document.querySelector(`#insta`).value = `https://instagram.com`;
        document.querySelector(`#linkedin`).value = `https://linkedin.com`;
    }
    
    // End create new friend
    
    
    // Start update friend info
    
    /* for (let i=0; i<editButtons.length; i++) {
        editButtons[i].addEventListener(`click`, function(event){
            event.preventDefault();
    
            editFriendForm.className = `edit-friend-onscreen`;
        });
    } */
    
    document.addEventListener(`click`, function(event){
        if (event.target.className === `fas fa-edit`) {
            // editFriendForm.className = `edit-friend-onscreen`;
            thisRecord = event.target.getAttribute(`id`).slice(2);
            // console.log(thisRecord);
            setForm(thisRecord);
        }
    
        if (event.target.className === `fas fa-times-circle`) {
            thisRecord = event.target.getAttribute(`id`).slice(2);
            deleteRecord(thisRecord);
        }
    }, false);
    
    async function setForm(recordId){
        const friends = Parse.Object.extend(`Friends`);
        const query = new Parse.Query(friends);
        query.equalTo(`objectId`, recordId);
    
        try {
            const results = await query.find();
    
            for (const thisFriend of results) {
                document.querySelector(`#fname-edit`).value = thisFriend.get(`fname`);
                document.querySelector(`#lname-edit`).value = thisFriend.get(`lname`);
                document.querySelector(`#email-edit`).value = thisFriend.get(`email`);
                document.querySelector(`#fbook-edit`).value = thisFriend.get(`facebook`);
                document.querySelector(`#twitter-edit`).value = thisFriend.get(`twitter`);
                document.querySelector(`#insta-edit`).value = thisFriend.get(`instagram`);
                document.querySelector(`#linkedin-edit`).value = thisFriend.get(`linkedin`);
            }
    
            editFriendForm.className = `edit-friend-onscreen`;
        } catch (error) {
            console.error(`Error while fetching friends`, error);
        }
    }
    
    editFriendForm.addEventListener(`submit`, function(event){
        event.preventDefault();
    
        // editFriendForm.className = `edit-friend-offscreen`;
    
        updateRecord(thisRecord);
    });
    
    async function updateRecord(recordId){
        const theFields = document.querySelectorAll(`#edit-friend input:not([type=submit])`);
        const editedRecord = {};
        let key;
        let value;
    
        for (const field of theFields) {
            key = field.getAttribute(`name`);
            value = field.value;
            editedRecord[key] = value;
        }
    
        const friends = Parse.Object.extend(`Friends`);
        const query = new Parse.Query(friends);
    
        try {
            // objectId to update
            const object = await query.get(recordId);
    
            // update each field
            object.set(`fname`, editedRecord.fname);
            object.set(`lname`, editedRecord.lname);
            object.set(`email`, editedRecord.email);
            object.set(`facebook`, editedRecord.facebook);
            object.set(`twitter`, editedRecord.twitter);
            object.set(`instagram`, editedRecord.instagram);
            object.set(`linkedin`, editedRecord.linkedin);
    
            try {
                // save to DB
                await object.save();
                // close form
                editFriendForm.className = `edit-friend-offscreen`;
                // clear old cards
                friendList.innerHTML = ``;
                // display updated cards
                displayFriends();
            } catch (error) {
                console.error(`Error while updating friends`, error);
            }
        } catch (error) {
            console.error(`Error while retrieving object friends`, error);
        }
    }
    
    // End update friend info
    
    
    // Start delete friend
    
    async function deleteRecord(recordId) {
        const youAreSure = confirm(`Are you sure you want to delete this friend?`);
    
        if (youAreSure) {
            // get the record in the DB
            const query = new Parse.Query(`Friends`);
            try {
                const object = await query.get(recordId);
                try {
                    // delete the record from the database
                    await object.destroy();
                    // update the DOM
                    document.querySelector(`#r-${recordId}`).className = `remove`;
                    setTimeout(function(){
                        const elem = document.querySelector(`#r-${recordId}`);
                        elem.parentNode.removeChild(elem);
                    }, 1500);
                } catch (error) {
                    console.error(`Error while deleting friend`, error);
                }
            } catch (error) {
                console.error(`Error while retrieving friend to delete`, error);
            }
        }
    }
})();