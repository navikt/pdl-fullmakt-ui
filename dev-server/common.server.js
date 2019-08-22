const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const delayMs = 1000;
const app = express();
const upload = multer();

function lesMockFil(filnavn) {
    return fs.readFileSync(path.join(__dirname, '/mock/' + filnavn), 'UTF-8');
}

app.get('/pdl-fullmakt-api/api/tekster', function(req, res) {
    setTimeout(() => res.send(lesMockFil('tekster.json')), delayMs);
});

app.get('/pdl-fullmakt-api/api/land', function(req, res) {
    setTimeout(() => res.send(lesMockFil('land.json')), delayMs);
});

app.get('/pdl-fullmakt-api/api/status/ping', function(req, res) {
    setTimeout(() => res.status(200).send(), delayMs);
});

app.get('/api/feature', function(req, res) {
    setTimeout(() => res.send(lesMockFil('toggles.json')), delayMs);
});

app.get('/pdl-fullmakt-api/api/soker', function(req, res) {
    setTimeout(() => res.status(200).send(lesMockFil('soker.json')), delayMs);
});

app.get('/pdl-fullmakt-api/api/barn', function(req, res) {
    setTimeout(() => res.status(200).send(lesMockFil('barn.json')), delayMs);
});

app.post('/pdl-fullmakt-api/api/sendinn', function(req, res) {
    setTimeout(() => res.send(lesMockFil('innsending-respons.json')), delayMs);
});

app.post('/pdl-fullmakt-api/api/vedlegg/', upload.single('file'), function(req, res) {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
    const randomDelay = Math.random() * (3000 - delayMs) + delayMs;
    const sizeLimit = 20 * 1000 * 1000; // 20mb

    // Out of memory
    if (req.file.size > sizeLimit * 3) {
        setTimeout(() => res.status(500).send(), randomDelay);
        return;
    }

    // Filen er for stor
    if (req.file.size > sizeLimit) {
        setTimeout(() => res.status(413).send(), randomDelay);
        return;
    }

    setTimeout(() => res.send({ vedleggsId: uuid, filnavn: req.file.originalname }), randomDelay);
});

module.exports = app;
