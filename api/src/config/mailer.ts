import nodemailer from 'nodemailer';
// const ses = require("nodemailer-ses-transport");
import aws from 'aws-sdk';
require('dotenv').config();

aws.config.loadFromPath(__dirname + '/awsconfig.json');

module.exports = async (toEmail: string) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      SES: new aws.SES(),
    });

    // const transporter = nodemailer.createTransport(
    //     ses({
    //       host: "email-smtp.ap-south-1.amazonaws.com",
    //       port: 2525,
    //       auth: {
    //         user: "AKIAZS3FX6J2D22C55YJ",
    //         pass: "BCh6GRR55koAO/IW0yW7CRG8onz9hkMyJYR0rrGLdM71",
    //       },
    //     })
    //   );

    transporter.sendMail(
      {
        from: 'lol',
        to: toEmail,
        subject: 'Test',
        html: '<h1>Test</h1>',
      },
      (err, info) => {
        if (err) reject(err);
        else resolve(info);
      }
    );
  });
};
