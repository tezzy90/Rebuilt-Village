"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const https_1 = require("firebase-functions/v2/https");
const params_1 = require("firebase-functions/params");
const resend_1 = require("resend");
const cors_1 = __importDefault(require("cors"));
const corsHandler = (0, cors_1.default)({ origin: true });
const resendApiKey = (0, params_1.defineSecret)("RESEND_API_KEY");
exports.sendEmail = (0, https_1.onRequest)({ secrets: [resendApiKey], invoker: "public" }, (request, response) => {
    corsHandler(request, response, async () => {
        try {
            const resend = new resend_1.Resend(resendApiKey.value());
            if (request.method !== "POST") {
                response.status(405).send("Method Not Allowed");
                return;
            }
            const { formType, name, email, subject, message } = request.body;
            if (formType === "newsletter") {
                // Newsletter Signup
                if (!email) {
                    response.status(400).json({ error: "Email is required" });
                    return;
                }
                const data = await resend.emails.send({
                    from: "Rebuilt Village <hello@rebuiltvillage.org>",
                    to: email, // Send to the subscriber
                    subject: "Welcome to The Call Sheet",
                    html: `
            <div style="font-family: monospace; max-width: 600px; margin: 0 auto; color: #111;">
              <h2 style="font-family: serif; font-style: italic;">Welcome to The Call Sheet.</h2>
              <p>You're on the list. We'll be in touch with news, upcoming screenings, and impact updates from Rebuilt Village.</p>
              <br/>
              <p style="font-size: 10px; color: #666; text-transform: uppercase;">
                Rebuilt Village, Inc.<br/>
                Ocoee, FL<br/>
                501(c)(3) Nonprofit
              </p>
            </div>
          `,
                });
                response.status(200).json({ success: true, id: data?.data?.id });
            }
            else if (formType === "contact") {
                // Contact Form
                if (!name || !email || !message) {
                    response.status(400).json({ error: "Missing required fields" });
                    return;
                }
                const data = await resend.emails.send({
                    from: "Rebuilt Village Website <onboarding@resend.dev>", // Or verified domain
                    to: "hello@rebuiltvillage.org", // Send TO the org
                    replyTo: email,
                    subject: `New Inquiry: ${subject || "General"}`,
                    text: `
Name: ${name}
Email: ${email}
Subject: ${subject}
Message:
${message}
          `,
                });
                response.status(200).json({ success: true, id: data?.data?.id });
            }
            else {
                response.status(400).json({ error: "Invalid formType" });
            }
        }
        catch (error) {
            console.error("Resend Error:", error);
            response.status(500).json({ error: "Failed to send email" });
        }
    });
});
//# sourceMappingURL=index.js.map