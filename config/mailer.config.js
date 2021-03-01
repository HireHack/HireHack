const nodemailer = require('nodemailer');
const { generateTemplate } = require('./mailtemplate.js');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.NM_USER,
        pass: process.env.NM_PASSWORD
    }
});

module.exports.sendActivationEmail = (email, token) => {
    transporter.sendMail({
        from: `HireHack <${process.env.NM_USER}>`,
        to: email,
        subject: '¡Gracias por unirte a HireHack!',
        html: generateTemplate(token)
    });
}

module.exports.sendPasswordChangeEmail = (email, token) => {
    transporter.sendMail({
        from: `HireHack <${process.env.NM_USER}>`,
        to: email,
        subjet: 'Confirmar cambio de contraseña',
        html: generateTemplate(token)
    });
}

module.exports.sendAccountDeleteEmail = (email, token) => {
    transporter.sendMail({
        from: `HireHack <${process.env.NM_USER}>`,
        to: email,
        subjet: 'Confirmación de baja en HireHack',
        html: generateTemplate(token)
    });
}