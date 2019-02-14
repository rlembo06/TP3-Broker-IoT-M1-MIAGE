module.exports = {
    secondsLeftBeforeEndOfHour(date) {
        const m = date.getMinutes();
        const s = date.getSeconds();
        return 3600 - (m*60) - s;
    }
}