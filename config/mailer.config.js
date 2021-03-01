const nodemailer = require('nodemailer');
const { generateCandidateTemplate } = require('./mailtemplate.js');
const { generateCompanyTemplate } = require('./mailtemplate.js');

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
        subjet: 'Confirma tu cambio de contraseña',
        html: generatePasswordUpdateTemplate(token)
    });
}

module.exports.sendDeleteAccountEmail = (email, token) => {
    transporter.sendMail({
        from: `HireHack <${process.env.NM_USER}>`,
        to: email,
        subjet: 'Confirmación de baja en HireHack',
        html: generateDeleteAccountTemplate(token)
    });
}