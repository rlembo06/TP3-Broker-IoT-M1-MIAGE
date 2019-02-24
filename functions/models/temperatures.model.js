const db = require('../firestore')

module.exports = {

    addTemperature: async ({macAddress, temperatureInCelsius}) => {
        try {
            const response = await db.collection("temperatures").add({macAddress, temperatureInCelsius})
            console.log('[MODELS][TEMPERATURES][addTemperature] - Success : ', response)
        } catch (error) {
            console.error('[MODELS][TEMPERATURES][addTemperature] - Success : ', error)
        }
    }

}