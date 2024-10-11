export const changeBackground = () => {
    function update() {
        let date = new Date();
        let hours = date.getHours();
        
        if (hours >= 0 &&  hours < 6) {
            document.body.style.backgroundImage = "url(./img/01.jpg)";
        } else if (hours >= 6 && hours < 12) {
            document.body.style.backgroundImage = "url(./img/02.jpg)";
        } else if (hours >= 12 && hours < 18) {
            document.body.style.backgroundImage = "url(./img/03.jpg)";
        } else {
            document.body.style.backgroundImage = "url(./img/04.jpg)";
        };
    };

    setInterval(() => update(), 1000);
};