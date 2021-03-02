const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const SALT_ROUNDS = 10

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Por favor, introduce tu nombre"],
    },
    surname: {
        type: String,
        required: [true, "Por favor, introduce tu apellido"],
    },
    age: {
        type: Number,
        min: 18,
        max: 120,
    },
    address: {
        streetName: String,
        number: Number,
        zipCode: Number,
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
        required: true,
        match: [PASSWORD_PATTERN, "La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minuscula y 1 número"],
    },
    resume: {
        type: String,
    },
    social: {
        google: String,
        linkedin: String
    },
    skills: {
        type: [String],
        enum: ["creatividad", "trabajo en equipo", "organización", "motivación", "comunicación", "compromiso", "trabajo bajo presión"],
    },
    picture: {
        type: String,
        default: 'https://winaero.com/blog/wp-content/uploads/2015/05/windows-10-user-account-login-icon.png'
    },
    cv: {
        type: String,
    },
    linkedinProfile: {
        type: String,
        validate: {
            validator: (text) => {
                return text.indexOf("https://www.linkedin.com/") === 0;
            },
            message: "El enlace de tu perfil a LinkedIn debe comenzar por https://www.linkedin.com/",
        },
    },
    role: {
        type: String,
        default: 'CANDIDATE'
    },
    active: {
        type: Boolean,
        default: false,
    },
    token: {
        type: String,
        default: uuidv4(),
    },
},
    {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

candidateSchema.virtual('applications', {
    ref: 'Application',
    localField: '_id',
    foreignField: 'candidate'
})

candidateSchema.methods.getAddress = function () {
    const {
        streetName,
        number,
        zipCode,
        city,
        country
    } = this.address
    return `${streetName} nº${number}, ${zipCode} ${city} (${country})`
}

candidateSchema.methods.checkPassword = function (passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password);
}

candidateSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, SALT_ROUNDS)
            .then((hash) => {
                this.password = hash
                next();
            })
    } else {
        next();
    }
})

const Candidate = mongoose.model('Candidate', candidateSchema)

module.exports = Candidate