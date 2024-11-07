const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Atur VAPID keys (kamu bisa menggunakan web-push untuk membuat kunci ini)
const publicVapidKey = '<Your-VAPID-Public-Key>';
const privateVapidKey = '<Your-VAPID-Private-Key>';

webpush.setVapidDetails(
    'mailto:your-email@example.com',
    publicVapidKey,
    privateVapidKey
);

// Endpoint untuk menerima subscription dari klien
app.post('/subscribe', (req, res) => {
    const subscription = req.body;

    // Kirim respon sukses
    res.status(201).json({});

    // Data payload notifikasi
    const payload = JSON.stringify({
        title: 'Hello!',
        body: 'You have a new notification.'
    });

    // Kirim notifikasi menggunakan data subscription
    webpush.sendNotification(subscription, payload).catch(error => console.error(error));
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
