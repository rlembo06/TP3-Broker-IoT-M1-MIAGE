const db = require('../firestore')

module.exports = {

    addBrightness: async ({macAddress, brightnessInLux}) => {
        try {
            const response = await db.collection("brightnesses").add({macAddress, brightnessInLux})
            console.log('[MODELS][BRIGHTNESSES][addBrightness] - Success')
        } catch (error) {
            console.error('[MODELS][BRIGHTNESSES][addBrightness] - Failure : ', error)
        }
    }

}