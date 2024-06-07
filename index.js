const express = require('express');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');
const sheepRoutes = require('./routes/sheepRoutes');
const vaccineRoutes = require('./routes/vaccineRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const db = require('./models');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// QR code generation route
async function generateQR(sheepId) {
    try {
        const uniqueId = uuidv4();
        const url = await QRCode.toDataURL(sheepId);
        return url;
    } catch (err) {
        console.error(err);
    }
}

app.post('/generate-qr', async (req, res) => {
    const { sheepId } = req.body;
    if (sheepId) {
        const qrDataUrl = await generateQR(sheepId);  // Adjust your generateQR function to accept only sheep id
        res.status(200).json({ [sheepId]: qrDataUrl });  // Return QR code with sheep id as key
    } else {
        res.status(400).send('Bad Request: Invalid sheepId provided');
    }
});

// Registering model routes
app.use('/users', userRoutes);
app.use('/groups', groupRoutes);
app.use('/sheep', sheepRoutes);
app.use('/vaccines', vaccineRoutes);
app.use('/medicines', medicineRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    // Optionally sync database models
    // await db.sequelize.sync({ force: true });
    // console.log('Database synced');
});
