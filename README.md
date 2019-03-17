# (API) TP3 - IoT - M1 MIAGE - MQTT : ESP32 / Broker / Client

- <a href="https://tp3-iot-m1-miage.firebaseapp.com/" target="_blank">Notre client web hébergé sur Firebase (Eventuelle autorisation d'accès au site non sécurisé)</a>
- <a href="https://github.com/rlembo06/TP3-client-IoT-M1-MIAGE" target="_blank">Répertoire Github de nos client web et ESP32</a>
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

### Architecture et logique générale :
Les micro-controlleurs ESP32, après avoir récupéré les valeurs des capteurs de température et de luminosité, publient (MQTT publish) les données via le protocole MQTT sur un broker gratuit (broker.hivemq.com), respectivement sur les topics "m1/miage/iot/temperatures" et "m1/miage/iot/brightnesses".

Une API Node.js hébergée sur Heroku s'abonne (MQTT subscribe) aux topics de luminosités et de températures à son initialisation. Lorsqu'elle reçoit une valeur, elle l'enregistre en base de données dans la collection correspondante (temperatures/brightnesses).
Ensuite, et seulement si l'enregistrement en base de données s'est effectué avec succès, l'API publie (MQTT publish) un message de notification sur le topic "m1/miage/iot/notificationWeb" afin d'avertir le client web énoncé dans le paragraphe suivant. 

Un client web Vue.js récupère les données persistées en base de donnée lorsqu'il s'initialise. Bien qu'il soit possible de rafraîchir les données manuellement afin de vérifier si de nouvelles données sont arrivées, nous avons implémenté un mécanisme de rafraîchissement automatique grâce aux notifications MQTT. Ce client est ainsi abonné au topic de notification "m1/miage/iot/notificationWeb" afin de rafraîchir la page concernée tout en affichant une pop-up à l'utilsateur lorsqu'une nouvelle valeur est entrée en base de données.

En plus de s'assurer de la bonne persistence des données avant d'en informer les consommeurs des données de la database Firestore, le topic de notification nous permet également de nous assurer du bon fonctionnement du client web dans un contexte asynchrone, afin d'éviter par exemple que les graphiques côté utilisateur ne se rafraîchissent avant que la donnée ne soit persistée.

<img src="https://firebasestorage.googleapis.com/v0/b/tp3-iot-m1-miage.appspot.com/o/archi-tp3-iot-m1-miage-v3.png?alt=media&token=c18c1e69-bdfe-4f7c-9196-af575cb61a32">

### ESP32 MQTT Publisher
Ayant utilisé un micro-controlleur unique lors du développement de ce projet, nous désignerons le client ESP32 de manière singulière, bien que l'ensemble de nos applications aient été pensées pour gérer plusieurs micro-controlleurs en parallèle (un par salle de cours, par exemple).

Lorsqu'il s'initialise (méthode setup()), le micro-controlleur ESP32 commence par se connecter à la WiFi. S'il a réussi à se connecter au routeur Wifi, il entame ensuite la connexion avec le broker MQTT distant. Lorsque le client est connecté avec succès à la fois au WiFi et au broker distant, il en notifie l'utilisateur via le hardware (double clignotement de la led verte).

L'ESP32 procède alors à la collecte des valeurs environnementales : la luminosité et la température, via leurs capteurs respectifs. Une fois ces valeurs connectées, il entame l'envoi MQTT vers le broker pour chacune d'entre elles. Pour ce faire, il crée d'abord un objet JSON, dans lequel il renseigne son adresse MAC (qui est utilisé plus tard comme identifiant unique des ESP32) ainsi que la valeur récoltée plus tôt. L'utilisateur final est à nouveau notifié de la progression via le hardware par 20 clignotements de la led verte dans le cas d'un succès et de la led rouge dans le cas contraire.

Une fois les données envoyées (avec succès ou pas), l'ESP32 reste éveillé pendant le nombre de milli-secondes spécifiées dans la configuration. Lorsque ce délai est écoulé, il se met en veille (deep sleep) pendant le nombre de micro-secondes spécifiées dans la configuration.

A toutes les étapes de ce processus, le micro-controlleur écrit dans la sortie série afin d'informer le développeur/constructeur de sa progression et des données récoltées.

### Node.js (server-side) MQTT Subscriber

L'API développée en Node.js, hébergée sur Heroku, se subscribe aux topics de températures et de luminosités via la librairie NPM nommée "mqtt", à la réception de données envoyées par une carte ESP 32 :
1. L'API parse l'information reçue en JSON.
2. L'API enregistre les données en base de données Firebase via la librairie NPM "firebase-admin" (valeurs + données temporelles par adresse MAC stockées sur la base de données Firestore):
    - Dans une collection "temperatures" si ce sont des données de températures.
    - Dans une collection "brightnesses" si ce sont des données de luminosités.
3. L'API publish un message sur le topic de notification pour prévenir le client web en Vue.js de rafraîchir ses informations de températures, ou de luminosités.


### Vue.js (client-side) MQTT Subscriber

1. Comme dans le <a href="https://github.com/rlembo06/TP2-IoT-M1-MIAGE">TP2</a> à l'ouverture du client web, celui-ci effectue des requêtes HTTP GET vers la base de données Firestore pour récupérer les informations sur les températures ou sur la luminosités (valeurs + données temporelles par adresse MAC stockées sur la base de données Firestore), à travers des URI de l'API REST Firestore.
2. Les données collectées sont ensuite restructurées pour les afficher dans des graphiques linéaires (via la librairie v-chart). Il y a une courbe par client ESP 32, identifiée par adresse MAC. Les fonctionnalités ci-dessous sont disponibles :
    - La dernière date de capture de données est notifiée, avec le nombre de collecte effectué.
    - Il est possible de modifier le seuil pour la température (C°) ou pour la luminosité (LDR).
    - Il est possible de rafraîchir les données à travers un bouton.
3. Ce client est abonné au topic de notification sur le broker (broker.hivemq.com), via une librairie NPM nommée "mqtt", lui permettant de rafraîchir les données de températures ou de luminosités, en refaisant une requête HTTP GET (voir étape 1). Suite à ça, un message de notification apparaît pour informer l'utilisateur de la mise-à-jour des données.