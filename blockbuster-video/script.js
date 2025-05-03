(function(){
    `use strict`;
    console.log(`running js`);

    const fs = document.querySelector(`.fa-expand`);

    const intervalID = setInterval(checkTime, 100);

    const titles = {
        start: [1, 2, 3, 4, 5, 6, 11, 12, 13, 14, 15, 19, 20, 21, 22],
        stop: [7, 7, 7, 7, 7, 7, 16, 16, 16, 16, 16, 24, 24, 24, 24],
        line: document.querySelectorAll(`section p`)
    }

    const myVideo = document.querySelector(`#myVideo`);
    
    fs.addEventListener(`click`, function(){
        // The fullscreenElement attribute returns null if the element is in windowed mode
        if (!document.fullscreenElement) {
            // document.documentElement returns the element that is a direct child of the document, which is the html element
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    function checkTime() {
        for (let i=0; i<titles.start.length; i++) {
            if (titles.start[i] < myVideo.currentTime && myVideo.currentTime < titles.stop[i]) {
                titles.line[i].className = `showing`;
            } else {
                titles.line[i].className = `hidden`;
            }
        }

        if (myVideo.currentTime >= 0 && myVideo.currentTime < (myVideo.duration / 2)) {
            myVideo.style.filter = `grayscale(100%)`;
        } else {
            myVideo.style.filter = `grayscale(${(((myVideo.duration - myVideo.currentTime) / myVideo.duration) * 100) * 2}%`;
        }
    }
})();