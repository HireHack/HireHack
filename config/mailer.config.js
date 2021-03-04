const nodemailer = require('nodemailer');
const { generateCandidateTemplate } = require('./mailtemplate.js');
const { generateCompanyTemplate } = require('./mailtemplate.js');
const { generateCandidatePasswordUpdateTemplate } = require('./mailtemplate.js');
const { generateCandidateEmailUpdateTemplate } = require('./mailtemplate.js');
const { generateCompanyPasswordUpdateTemplate } = require('./mailtemplate.js');
const { generateCompanyEmailUpdateTemplate } = require('./mailtemplate.js');
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
        from: `HireHack Empresas <${process.env.NM_USER}>`,
        to: email,
        subject: '¡Gracias por unirte a HireHack!',
        html: generateCompanyTemplate(token)
    });
}

// module.exports.sendCandidateSocialEmail = (email, token) => {
//     transporter.sendMail({
//         from: `HireHack <${process.env.NM_USER}>`,
//         to: email,
//         subject: '¡Gracias por unirte a HireHack!',
//         html: generateSocialCandidateWelcomeTemplate()
//     });
// }

// module.exports.sendCompanySocialEmail = (email, token) => {
//     transporter.sendMail({
//         from: `HireHack <${process.env.NM_USER}>`,
//         to: email,
//         subject: '¡Gracias por unirte a HireHack!',
//         html: generateSocialCompanyWelcomeTemplate()
//     });
// }

module.exports.sendCandidatePasswordUpdateEmail = (email, token) => {
    transporter.sendMail({
        from: `HireHack <${process.env.NM_USER}>`,
        to: email,
        subject: 'Confirma tu cambio de contraseña',
        html: generateCandidatePasswordUpdateTemplate(token)
    });
}

module.exports.sendCompanyPasswordUpdateEmail = (email, token) => {
    transporter.sendMail({
        from: `HireHack Empresas<${process.env.NM_USER}>`,
        to: email,
        subject: 'Confirma tu cambio de contraseña',
        html: generateCompanyPasswordUpdateTemplate(token)
    });
}

module.exports.sendCandidateEmailUpdateEmail = (email, token) => {
    transporter.sendMail({
        from: `HireHack <${process.env.NM_USER}>`,
        to: email,
        subject: 'Confirma tu cambio de correo electrónico',
        html: generateCandidateEmailUpdateTemplate(token)
    });
}

module.exports.sendCompanyEmailUpdateEmail = (email, token) => {
    transporter.sendMail({
        from: `HireHack Empresas <${process.env.NM_USER}>`,
        to: email,
        subject: 'Confirma tu cambio de correo electrónico',
        html: generateCompanyEmailUpdateTemplate(token)
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
        from: `HireHack Empresas <${process.env.NM_USER}>`,
        to: email,
        subject: 'Confirma tu baja en HireHack',
        html: generateDeleteCompanyTemplate(token)
    });
}