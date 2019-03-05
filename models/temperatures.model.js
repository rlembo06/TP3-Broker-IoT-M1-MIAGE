const firestore = require('../api/firestore');

module.exports = {

    addTemperature: async ({macAddress, temperatureInCelsius}) => {
        try {
            await firestore.post('temperatures', {macAddress, temperatureInCelsius});
            console.log('[MODELS][TEMPERATURES][addTemperature] - Success')
        } catch (error) {
            console.error('[MODELS][TEMPERATURES][addTemperature] - Failure : ', error)
        }
    }

}