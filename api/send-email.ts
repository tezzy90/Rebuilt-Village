import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, email, subject, message, formType } = req.body;

    if (formType === 'newsletter') {
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        try {
            await resend.emails.send({
                from: 'Rebuilt Village <notifications@rebuiltvillage.org>',
                to: ['info@rebuiltvillage.org'],
                subject: 'New Newsletter Subscriber',
                text: `New subscriber: ${email}`,
            });

            return res.status(200).json({ success: true });
        } catch (error) {
            console.error("Resend Error:", error);
            return res.status(500).json({ error: 'Failed to subscribe' });
        }
    }

    // Contact Form
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        await resend.emails.send({
            from: 'Rebuilt Village <notifications@rebuiltvillage.org>',
            to: ['info@rebuiltvillage.org'],
            subject: `Contact Form: ${subject || 'General Inquiry'}`,
            replyTo: email,
            text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Resend Error:", error);
        return res.status(500).json({ error: 'Failed to send message' });
    }
}
