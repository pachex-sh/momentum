export const createClock = () => {
    const clockBlock = document.createElement('div');

    const clock = document.createElement('div');
    const displayHour = document.createElement('span');
    const displayMin = document.createElement('span');
    const displaySec = document.createElement('span');
    clock.append(displayHour, displayMin, displaySec);

    clockBlock.classList.add('text-secondary', 'clock-block');

    const day = document.createElement('div');
    const displayCurrentDay = document.createElement('span');
    const displayCurrentMonth = document.createElement('span');
    const displayCurrentWeekDay = document.createElement('span');
    day.append(displayCurrentDay, displayCurrentMonth, displayCurrentWeekDay);

    clockBlock.append(clock, day);

    function update() {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let weekDays = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
        let months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'ююня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

        let currentWeekDay = weekDays[date.getDay()];
        let currentMonth = months[date.getMonth()];
        let currentDay = date.getDate();

        displayCurrentDay.innerHTML = currentDay + ' ';
        displayCurrentMonth.innerHTML = currentMonth + ', ';
        displayCurrentWeekDay.innerHTML = currentWeekDay;

        if (hours < 10) hours = '0' + hours;
        displayHour.innerHTML = hours + ':';

        if (minutes < 10) minutes = '0' + minutes;
        displayMin.innerHTML = minutes + ':';

        if (seconds < 10) seconds = '0' + seconds;
        displaySec.innerHTML = seconds;
    };

    setInterval(update, 1000);

    return clockBlock;
};