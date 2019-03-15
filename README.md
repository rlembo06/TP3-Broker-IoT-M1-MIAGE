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
Les micro-controlleurs ESP32, après avoir récupéré les valeurs des capteurs de température et de luminosité, publient (MQTT publish) les données via le protocole MQTT sur un broker gratuit (broker.hivemq.com), respectivement sur les topics "m1/miage/iot/temperatures" et "m1/miage/iot/brightnesses".

Une API Node.js hébergée sur Heroku s'abonne (MQTT subscribe) aux topics de luminosités et de températures à son initialisation. Lorsqu'elle reçoit une valeur, elle l'enregistre en base de données dans la collection correspondante (temperatures/brightnesses).
Ensuite, et seulement si l'enregistrement en base de données s'est effectué avec succès, l'API publie (MQTT publish) un message de notification sur le topic "m1/miage/iot/notificationWeb" afin d'avertir le client web énoncé dans le paragraphe suivant. 

Un client web Vue.js récupère les données persistées en base de donnée lorsqu'il s'initialise. Bien qu'il soit possible de rafraîchir les données manuellement afin de vérifier si de nouvelles données sont arrivées, nous avons implémenté un mécanisme de rafraîchissement automatique grâce aux notifications MQTT. Ce client est ainsi abonné au topic de notification "m1/miage/iot/notificationWeb" afin de rafraîchir la page concernée tout en affichant une pop-up à l'utilsateur lorsqu'une nouvelle valeur est entrée en base de données.

En plus de s'assurer de la bonne persistence des données avant d'en informer les consommeurs des données de la database Firestore, le topic de notification nous permet également de nous assurer du bon fonctionnement du client web dans un contexte asynchrone, afin d'éviter par exemple que les graphiques côté utilisateur ne se rafraîchissent avant que la donnée ne soit persistée.

<img src="https://firebasestorage.googleapis.com/v0/b/tp3-iot-m1-miage.appspot.com/o/archi-tp3-iot-m1-miage-v2.png?alt=media&token=7c2ea55c-5782-454d-bcef-ea3d48961307">

### Données 

La publication de données d'une carte ESP32 vers notre broker sur les topics de températures (topic : "m1/miage/iot/temperatures") ou de luminosités (topic : "m1/miage/iot/brightnesses") sont au format JSON.

Exemples de commandes "publisher" :
```
# Publish températures :
mosquitto_pub -h broker.hivemq.com -p 1883 -t m1/miage/iot/temperatures -m '{"macAddress": "test-1", "temperatureInCelsius": 12}'

# Publish luminosités :
mosquitto_pub -h broker.hivemq.com -p 1883 -t m1/miage/iot/brightnesses -m '{"macAddress": "test-1", "brightnessInLux": 1212}'
```
