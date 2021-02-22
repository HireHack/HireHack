const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        streetName: String,
        number: String,
        zipCode: String,
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
        //type: [ObjectID]
        // Relacionar oferta con candidato
    },
});

offerSchema.methods.getAddress = function () {
    const {
        streetName,
        number,
        zipCode,
        city,
        country
    } = this.address
    return `${streetName} nº${number}, ${zipCode} ${city} (${country})`
}

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;