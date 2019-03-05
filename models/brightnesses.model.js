const firestore = require('../api/firestore');

module.exports = {

    addBrightness: async ({macAddress, brightnessInLux}) => {
        try {
            await firestore.post('brightnesses', {macAddress, brightnessInLux});
            console.log('[MODELS][BRIGHTNESSES][addBrightness] - Success')
        } catch (error) {
            console.error('[MODELS][BRIGHTNESSES][addBrightness] - Failure : ', error)
        }
    }

}