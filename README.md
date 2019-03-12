# (API) TP3 - IoT - M1 MIAGE - MQTT : ESP32 / Broker / Client

- <a href="https://tp3-iot-m1-miage.firebaseapp.com/" target="_blank">Notre client web hébergé sur Firebase (Eventuelle autorisation d'accès au site non sécurisé)</a>
- <a href="https://github.com/rlembo06/TP3-api-IoT-M1-MIAGE" target="_blank">Répertoire Github de notre API</a>
- <a href="http://www.i3s.unice.fr/~menez/M1Miage/TP3/tp3.pdf" target="_blank">Consignes du TP</a>

## Membres du projet :

- Romain LEMBO
- Victor MONSCH

## Executer le projet :

```
npm install
npm run start
```

## Description du projet :

### Architecture :
Les cartes ESP32 "publish" leurs températures (topic : "m1/miage/iot/temperatures") et leurs luminosités (topic : "m1/miage/iot/brightnesses") sur un broker gratuit (broker.hivemq.com). 
Une API hébergée sur Heroku se "subscribe" aux topics de luminosités et de températures, et reçoit ces valeurs pour les enregistrer en base de données sur Firestore. Suite à cela, l'API "publish" un message de notification (topic : "m1/miage/iot/notificationWeb") pour avertir le client web (en Vue.js) abonnée à ce même topic, de nouvelles valeurs de températures ou de luminosités, afin de rafraîchir les pages concernées (apparition d'une pop-up de notification).

<img src="https://firebasestorage.googleapis.com/v0/b/tp3-iot-m1-miage.appspot.com/o/archi-tp3-iot-m1-miage.png?alt=media&token=8c3eb28e-f4ac-4982-b17f-c4559d80fe57">

### Données 

La publication de données d'une carte ESP32 vers notre broker sur les topics de températures (topic : "m1/miage/iot/temperatures") ou de luminosités (topic : "m1/miage/iot/brightnesses") sont au format JSON.

Exemples de commandes "publisher" :
```
# Publish températures :
mosquitto_pub -h broker.hivemq.com -p 1883 -t m1/miage/iot/temperatures -m '{"macAddress": "test-1", "temperatureInCelsius": 12}'

# Publish luminosités :
mosquitto_pub -h broker.hivemq.com -p 1883 -t m1/miage/iot/brightnesses -m '{"macAddress": "test-1", "brightnessInLux": 1212}'
```