import fs from 'fs';
import path from 'path';
import template from 'lodash.template';

import nodemailer from 'nodemailer';

const TEMPLATE_DIR = path.resolve(__dirname, '..', 'templates');

const templates = {};

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.MAIL_PORT === '465',
  tls: {
    rejectUnauthorized: true,
  },
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PASSWORD,
  },
});

async function getTemplate(templateName) {
  if (templates[templateName]) {
    return templates[templateName];
  }

  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(TEMPLATE_DIR, templateName), (err, buffer) => {
      if (err) {
        reject(err);
      }

      const tmpl = template(buffer.toString());
      templates[templateName] = tmpl;

      resolve(tmpl);
    });
  });
}

export async function sendMail(email, name, templateName, data) {
  const tmpl = await getTemplate(templateName);

  const text = tmpl(data);

  const message = {
    from: {
      name: 'Stickerity',
      address: process.env.MAIL_ADDRESS,
    },
    to: {
      name,
      address: email,
    },
    subject: data.subject,
    text,
  };

  try {
    const resp = await transport.sendMail(message);

    return resp;
  } catch (e) {
    console.error(e);
    return null;
  }
}
