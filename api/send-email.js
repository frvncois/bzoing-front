import nodemailer from 'nodemailer'

// Sanitize string to prevent header injection
function sanitize(str) {
  if (typeof str !== 'string') return ''
  return str.replace(/[\r\n]/g, ' ').trim()
}

// Escape HTML entities to prevent XSS
function escapeHtml(str) {
  if (typeof str !== 'string') return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Simple email validation
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, company, phone, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  // Sanitize all inputs
  const safeName = sanitize(name)
  const safeCompany = sanitize(company)
  const safePhone = sanitize(phone)
  const safeEmail = sanitize(email)
  const safeSubject = sanitize(subject)
  const safeMessage = message?.trim() || ''

  const transporter = nodemailer.createTransport({
    host: process.env.BREVO_SMTP,
    port: parseInt(process.env.BREVO_PORT),
    secure: false,
    auth: {
      user: process.env.BREVO_LOGIN,
      pass: process.env.BREVO_API_TOKEN,
    },
  })

  const mailOptions = {
    from: `"${safeName}" <${process.env.BREVO_LOGIN}>`,
    to: 'info@bzoing.ca',
    replyTo: safeEmail,
    subject: `[Bzoing Contact] ${safeSubject}`,
    text: `
Nom: ${safeName}
Entreprise: ${safeCompany || 'Non spécifié'}
Téléphone: ${safePhone || 'Non spécifié'}
Email: ${safeEmail}

Sujet: ${safeSubject}

Message:
${safeMessage}
    `.trim(),
    html: `
      <h2>Nouveau message de contact</h2>
      <p><strong>Nom:</strong> ${escapeHtml(safeName)}</p>
      <p><strong>Entreprise:</strong> ${escapeHtml(safeCompany) || 'Non spécifié'}</p>
      <p><strong>Téléphone:</strong> ${escapeHtml(safePhone) || 'Non spécifié'}</p>
      <p><strong>Email:</strong> <a href="mailto:${escapeHtml(safeEmail)}">${escapeHtml(safeEmail)}</a></p>
      <hr>
      <p><strong>Sujet:</strong> ${escapeHtml(safeSubject)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(safeMessage).replace(/\n/g, '<br>')}</p>
    `.trim(),
  }

  try {
    await transporter.sendMail(mailOptions)
    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
