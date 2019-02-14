const timesUtils = require('../utils/times');

module.exports = {
    bigBen: res => {
        const date = new Date();
        const hours = (date.getHours() % 12) + 1; // London is UTC + 1hr;
        // [START_EXCLUDE silent]
        res.set('Cache-Control', `public, max-age=${timesUtils.secondsLeftBeforeEndOfHour(date)}`);
        // [END_EXCLUDE silent]
        res.send(`
        <!doctype html>
        <head>
            <title>Time</title>
            <link rel="stylesheet" href="/style.css">
            <script src="/script.js"></script>
        </head>
        <body>
            <p>In London, the clock strikes: <span id="bongs">${'BONG '.repeat(hours)}</span></p>
            <button onClick="refresh(this)">Refresh</button>
        </body>
        </html>`);
    },

    pong: res => res.send("PONG !!!")
}