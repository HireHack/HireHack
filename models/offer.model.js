const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        streetName: String,
        number: Number,
        zipCode: Number,
        city: String,
        country: String
    },
    description: {
        type: String,
    },
    skills: {
        type: [String],
        enum: ["creatividad", "trabajo en equipo", "organización", "motivación", "comunicación", "compromiso", "trabajo bajo presión"],
    },
    offers_publishedbyCompany: {
        // Relacionar oferta con empresa
    },
    candidatesApplies: {
        type: [ObjectID]
        // Relacionar oferta con candidato
    },
});

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;