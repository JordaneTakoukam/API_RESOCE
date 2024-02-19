// utils/email.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'jordane.sdnta@gmail.com',
        pass: 'Sdnta2024@!'
    },
});

// Fonction pour envoyer un e-mail
export const sendEmail = async (to, subject, content) => {
    try {
        const info = await transporter.sendMail({
            from: {
                name: 'Idriss Jordane 👻',
                address: 'jordane.sdnta@gmail.com'
            }, // sender address
            to: [to],
            subject: subject,
            html: content
        });
        console.log('E-mail envoyé avec succès !');
        console.log("Message sent: %s", info.messageId);

    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
        throw error; // Propager l'erreur
    }
};
