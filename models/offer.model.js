const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String // Test
        // Test
        // streetName: String,
        // number: String,
        // zipCode: String,
        // city: String,
        // country: String
    },
    description: {
        type: String,
    },
    skills: {
        type: [String],
        // TODO (extra): mix enum with [String] to allow users either to add new skills or select them from a select input.
        //enum: ["creatividad", "trabajo en equipo", "organización", "motivación", "comunicación", "compromiso", "trabajo bajo presión"],
    },
    offers_publishedByCompany: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Company",
        //required: true
    },
},
    {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    }
);

offerSchema.virtual('applications', {
    ref: 'Application',
    localField: '_id',
    foreignField: 'offer'
})


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