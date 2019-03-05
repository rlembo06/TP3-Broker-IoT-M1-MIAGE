var async  = require('express-async-await')
var fetch = require('node-fetch');

const url = 'https://firestore.googleapis.com/v1/projects/tp3-iot-m1-miage/databases/(default)/documents'

module.exports = {

    getAll: async collection => {
        try {
            const response = await fetch(`${url}/${collection}`);
            const { documents } = await response.json()
            return documents;
        } catch (error) {
            console.error('[API][Firestore] getAll: ', error);
        }
    },

    /* post: async (collection, payload) => {
        try {
            const response = await fetch(`${url}/${collection}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    fields: {
                        macAddress: {
                            stringValue: 'TEST'
                        },
                        temperatureInCelsius: {
                            stringValue: 'TEST REST'
                        },
                    },
                })
            });
            return await response.json();
        } catch (error) {
            console.error('[API][Firestore] post: ', error);
        }
    }, */

    post: async (collection, fields) => {
        try {
            const response = await fetch(`${url}/${collection}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ fields })
            });
            console.log('[API][Firestore] post:', collection, 'SUCCESS');
            return await response.json();
        } catch (error) {
            console.error('[API][Firestore] post: ', error);
        }
    },

}