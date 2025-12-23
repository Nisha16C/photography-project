import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

interface ContactData {
    name: string;
    email: string;
    phone: string;
    eventType: string;
    eventDate?: string | null;
    city?: string | null;
    budget?: string | null;
    message?: string | null;
}

export async function sendEmail({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) {
    try {
        const info = await transporter.sendMail({
            from: `"LensLink Wedding Films" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });
        console.log('Message sent: %s', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}

export async function sendContactEmails(data: ContactData) {
    // Email to Client
    const clientSubject = 'We received your event details 💍';
    const clientHtml = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>Hi ${data.name},</h2>
      <p>Thank you for contacting LensLink. We have received your query and will get back to you shortly.</p>
      <h3>Your Details:</h3>
      <ul>
        <li><b>Event:</b> ${data.eventType}</li>
        <li><b>Date:</b> ${data.eventDate || '-'}</li>
        <li><b>City:</b> ${data.city || '-'}</li>
        <li><b>Budget:</b> ${data.budget || '-'}</li>
        <li><b>Phone:</b> ${data.phone}</li>
      </ul>
      <p>We will contact you shortly via WhatsApp or Email.</p>
      <hr />
      <p><small>LensLink Photography</small></p>
    </div>
  `;

    // Email to Admin (Photographer)
    const adminSubject = `New Inquiry: ${data.name} - ${data.eventType}`;
    const adminHtml = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>New Website Inquiry</h2>
      <ul>
        <li><b>Name:</b> ${data.name}</li>
        <li><b>Email:</b> ${data.email}</li>
        <li><b>Phone:</b> ${data.phone}</li>
        <li><b>Event:</b> ${data.eventType}</li>
        <li><b>Date:</b> ${data.eventDate || '-'}</li>
        <li><b>City:</b> ${data.city || '-'}</li>
        <li><b>Budget:</b> ${data.budget || '-'}</li>
      </ul>
      <h3>Message:</h3>
      <p>${data.message || 'No message provided.'}</p>
    </div>
  `;

    // Send both
    await Promise.all([
        sendEmail({ to: data.email, subject: clientSubject, html: clientHtml }),
        sendEmail({ to: process.env.EMAIL_USER || 'himanshuchaurasiya5811@gmail.com', subject: adminSubject, html: adminHtml }),
    ]);
}
