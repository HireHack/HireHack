const nodemailer = require('nodemailer');
const { generateCandidateTemplate } = require('./mailtemplate.js');
const { generateCompanyTemplate } = require('./mailtemplate.js');
const { generatePasswordUpdateTemplate } = require('./mailtemplate.js');
const { generateEmailUpdateTemplate } = require('./mailtemplate.js');
const { generateDeleteCandidateTemplate } = require('./mailtemplate.js');
const { generateDeleteCompanyTemplate } = require('./mailtemplate.js');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.NM_USER,
        pass: process.env.NM_PASSWORD
    }
});

module.exports.sendCandidateActivationEmail = (email, token) => {
    transporter.sendMail({
        from: `HireHack <${process.env.NM_USER}>`,
        to: email,
        subject: '¡Gracias por unirte a HireHack!',
        html: generateCandidateTemplate(token)
    });
}

module.exports.sendCompanyActivationEmail = (email, token) => {
    transporter.sendMail({
        from: `HireHack <${process.env.NM_USER}>`,
        to: email,
        subject: '¡Gracias por unirte a HireHack!',
        html: generateCompanyTemplate(token)
    });
}

module.exports.sendPasswordUpdateEmail = (email, token) => {
    transporter.sendMail({
        from: `HireHack <${process.env.NM_USER}>`,
        to: email,
        subject: 'Confirma tu cambio de contraseña',
        html: generatePasswordUpdateTemplate(token)
    });
}

module.exports.sendEmailUpdateEmail = (email, token) => {
    transporter.sendMail({
        from: `HireHack <${process.env.NM_USER}>`,
        to: email,
        subject: 'Confirma tu cambio de contraseña',
        html: generateEmailUpdateTemplate(token)
    });
}

module.exports.sendDeleteCandidateEmail = (email, token) => {
    transporter.sendMail({
        from: `HireHack <${process.env.NM_USER}>`,
        to: email,
        subject: 'Confirma tu baja en HireHack',
        html: generateDeleteCandidateTemplate(token)
    });
}

module.exports.sendDeleteCompanyEmail = (email, token) => {
    transporter.sendMail({
        from: `HireHack <${process.env.NM_USER}>`,
        to: email,
        subject: 'Confirma tu baja en HireHack',
        html: generateDeleteCompanyTemplate(token)
    });
}