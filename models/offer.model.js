const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
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
        //enum: ["creatividad", "trabajo en equipo", "organización", "motivación", "comunicación", "compromiso", "trabajo bajo presión"],
    },
    category: {
        type: String,
        //enum: ["Adm.empresas", "Atención al cliente", "Compras, logística y almacen", "Educación y formación", "Finanzas y banca", "Informática y telecomunicaciones", "Ingenieros y tecnicos", "Legal", "Marketing y comunicación", "RR.HH", "Sanidad", "Turismo", "Otros"]
    },
    contract: {
        type: String,
        //enum: ["Indefinido", "De duración determinada", "Autónomo", "Otros contractos"]
    },
    studies: {
        type: String,
        //enum: ["Sin estudios", "Educación secundaria Obligatoria", "Grado medio", "Grado superior", "Grado"]
    },
    experience: {
        type: Number,
    },
    salary: {
        type: String,
        //enum: ["6K - 12k", "12K - 20K", "20K - 30K", "+ 30K"]
    },
    offers_publishedByCompany: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Company",
        required: true
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
        cityd,
        country
    } = this.address
    return `${streetName} nº${number}, ${zipCode} ${city} (${country})`
}

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;