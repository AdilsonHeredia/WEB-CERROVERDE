

const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: String,
        },
        sender: {
            type: String,
        },
        text: {
            type: String,
        },
        file: {
            type: String,
        },
        patientId: {
            type: mongoose.Schema.Types.ObjectId,  // Assuming patient ID is an ObjectId
            ref: 'Paciente',  // Reference to the 'Paciente' model
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Mensajes', MessageSchema);

