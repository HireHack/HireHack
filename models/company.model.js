const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { company } = require('faker');
const { v4: uuidv4 } = require('uuid');

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const SALT_ROUNDS = 10

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Por favor, introduce un nombre"],
    },
    address: {
        streetName: String,
        number: String,
        zipCode: String,
        city: String,
        country: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [EMAIL_PATTERN, "Es necesario añadir un correo electrónico"],
    },
    password: {
        type: String,
        //required: true,
        match: [PASSWORD_PATTERN, "La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minuscula y 1 número"],
    },
    description: {
        type: String,
    },
    picture: {
        type: String,
    },
    website: {
        type: String,
        validate: {
            validator: (text) => {
                return text.indexOf("https://" || "http://") === 0;
            },
            message: "Por favor, introduce una URL válida",
        },
    },
    social: {
        google: String,
        linkedin: String
    },
    role: {
        type: String,
        default: 'COMPANY'
    },
    active: {
        type: Boolean,
        default: false,
    },
    token: {
        type: String,
        default: uuidv4(),
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});

companySchema.virtual('offers_publishedByCompany', {
    ref: 'Offer',
    localField: '_id',
    foreignField: 'company'
})


companySchema.methods.getAddress = function () {
    const {
        streetName,
        number,
        zipCode,
        city,
        country
    } = this.address
    return `${streetName} nº${number}, ${zipCode} ${city} (${country})`
}

companySchema.methods.checkPassword = function (passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password);
}

companySchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, SALT_ROUNDS)
            .then((hash) => {
                this.password = hash;
                next();
            })
    } else {
        next();
    }
})

const Company = mongoose.model('Company', companySchema);

module.exports = Company;