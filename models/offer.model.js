const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    description: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true,
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
        type: String,
        // min: 1,
        // max: 60,
    },
    salary: {
        type: String,
        //enum: ["6K - 12k", "12K - 20K", "20K - 30K", "+ 30K"]
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    offers_publishedByCompany: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Company",
        required: true
    },
    paid: {
        type: Boolean,
        default: false,
    },
},
    {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    }
);

offerSchema.index({ location: '2dsphere' });

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