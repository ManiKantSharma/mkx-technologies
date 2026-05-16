import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, companySize, product, message } = body;

    if (!firstName || !lastName || !email || !company || !companySize || !product) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const brandColor = "#A70400";
    const backgroundColor = "#0a0a0a";
    const cardBackground = "#141414";
    const textColor = "#ffffff";
    const mutedTextColor = "#a3a3a3";
    const borderColor = "#262626";

    const logoHtml = `
      <div style="margin-bottom: 16px; text-align: left;">
        <svg width="130" height="30" viewBox="0 0 500 110" xmlns="http://www.w3.org/2000/svg" style="display: block; max-width: 100%; height: auto;">
          <g transform="translate(-20, -130) scale(1.1)">
            <path d="M 124 136 L 106 141 L 87 150 L 74 159 L 56 177 L 46 192 L 35 218 L 31 240 L 33 271 L 42 298 L 54 318 L 74 339 L 104 356 L 125 362 L 149 364 L 176 360 L 191 355 L 211 344 L 234 323 L 242 312 L 232 305 L 232 194 L 234 191 L 244 189 L 226 166 L 211 154 L 186 141 L 163 135 Z" fill="${brandColor}" />
            <path d="M 356 195 L 356 204 L 394 249 L 355 295 L 355 302 L 379 303 L 406 270 L 410 268 L 439 303 L 463 303 L 463 295 L 424 249 L 463 203 L 463 195 L 440 195 L 409 231 L 379 195 Z" fill="white" />
            <path d="M 238 195 L 237 303 L 259 303 L 260 260 L 281 260 L 317 303 L 340 303 L 340 294 L 302 249 L 340 204 L 340 195 L 317 195 L 281 238 L 260 238 L 260 196 Z" fill="white" />
            <path d="M 97 195 L 97 303 L 119 303 L 120 231 L 157 274 L 194 231 L 195 302 L 217 303 L 217 195 L 194 195 L 157 239 L 121 196 Z" fill="white" />
          </g>
        </svg>
      </div>
    `;

    const emailToSelf = {
      subject: `[LEAD] New Demo Request: ${firstName} ${lastName}`,
      html: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: ${backgroundColor}; margin: 0; padding: 0; color: ${textColor};">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${backgroundColor};">
            <tr>
              <td align="center" style="padding: 10px 5px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: ${cardBackground}; border-radius: 8px; border: 1px solid ${borderColor}; overflow: hidden;">
                  <tr>
                    <td style="padding: 24px 16px;">
                      ${logoHtml}
                      <h2 style="font-size: 20px; font-weight: 700; margin: 0 0 20px; color: ${textColor}; line-height: 1.2;">New Demo Request</h2>

                      <div style="background-color: ${backgroundColor}; border-radius: 6px; border: 1px solid ${borderColor}; padding: 14px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr><td style="padding: 6px 0; color: ${mutedTextColor}; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Full Name</td></tr>
                          <tr><td style="padding: 0 0 10px; font-size: 15px; font-weight: 500;">${firstName} ${lastName}</td></tr>

                          <tr><td style="padding: 6px 0; color: ${mutedTextColor}; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Work Email</td></tr>
                          <tr><td style="padding: 0 0 10px; font-size: 15px; font-weight: 500;"><a href="mailto:${email}" style="color: ${brandColor}; text-decoration: none;">${email}</a></td></tr>

                          <tr><td style="padding: 6px 0; color: ${mutedTextColor}; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Company Details</td></tr>
                          <tr><td style="padding: 0 0 10px; font-size: 15px; font-weight: 500;">${company} (${companySize})</td></tr>

                          <tr><td style="padding: 6px 0; color: ${mutedTextColor}; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Product Interest</td></tr>
                          <tr><td style="padding: 0 0 10px; font-size: 15px; font-weight: 600; color: ${brandColor}; text-transform: uppercase;">${product}</td></tr>

                          <tr><td style="padding: 6px 0; color: ${mutedTextColor}; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Message</td></tr>
                          <tr><td style="padding: 0; font-size: 14px; line-height: 1.5; color: #d4d4d4;">${message || "No additional message provided."}</td></tr>
                        </table>
                      </div>

                      <p style="margin: 20px 0 0; font-size: 10px; color: ${mutedTextColor}; text-align: center;">Timestamp: ${new Date().toLocaleString()}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      `,
    };
    const confirmationEmail = {
      subject: "Demo Request Confirmed - MKX Technologies Pvt Ltd",
      html: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: ${backgroundColor}; margin: 0; padding: 0; color: ${textColor};">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${backgroundColor};">
            <tr>
              <td align="center" style="padding: 10px 5px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: ${cardBackground}; border-radius: 8px; border: 1px solid ${borderColor}; overflow: hidden;">
                  <tr>
                    <td style="padding: 24px 16px;">
                      ${logoHtml}
                      <h2 style="font-size: 22px; font-weight: 700; margin: 0 0 14px; color: ${textColor}; line-height: 1.2;">Hello ${firstName},</h2>
                      <p style="font-size: 14px; line-height: 1.6; color: #d4d4d4; margin: 0 0 20px;">
                        Thank you for choosing <strong>MKX Technologies Pvt Ltd</strong>. We have successfully received your request for a personalized demo of our <strong>${product.toUpperCase()}</strong> system.
                      </p>

                      <div style="background-color: ${backgroundColor}; border-left: 3px solid ${brandColor}; padding: 16px; border-radius: 4px; margin: 0 0 20px;">
                        <h3 style="margin: 0 0 6px; font-size: 13px; color: ${textColor}; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">NEXT STEPS</h3>
                        <p style="margin: 0; color: ${mutedTextColor}; font-size: 13px; line-height: 1.5;">
                          Our technical team is reviewing your requirements. A specialist will contact you at <strong>${email}</strong> within 24 hours to coordinate the walkthrough.
                        </p>
                      </div>

                      <p style="font-size: 14px; line-height: 1.6; color: #d4d4d4; margin: 0 0 24px;">
                        Discover how our solutions can transform your business operations. Visit our <a href="https://mkx-technologies.com" style="color: ${brandColor}; text-decoration: none; font-weight: 600;">Resource Center</a> for more information.
                      </p>

                      <div style="border-top: 1px solid ${borderColor}; padding-top: 20px; text-align: center;">
                        <p style="font-size: 12px; color: ${mutedTextColor}; margin: 0 0 4px;">Best regards,</p>
                        <p style="font-size: 15px; font-weight: 800; color: ${textColor}; margin: 0; text-transform: uppercase; letter-spacing: 1px;">MKX Technologies</p>
                        <p style="font-size: 10px; color: ${mutedTextColor}; margin: 20px 0 0;">
                          &copy; 2026 MKX Technologies Pvt Ltd. All rights reserved.
                        </p>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      `,
    };

    const adminRes = await transporter.sendMail({
      from: `"MKX Demo Alerts" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_RECEIVER_EMAIL || 'mkxtechnologies@gmail.com',
      subject: emailToSelf.subject,
      html: emailToSelf.html,
    });

    const userRes = await transporter.sendMail({
      from: `"MKX Technologies Pvt Ltd" <${process.env.SMTP_USER}>`,
      to: email,
      subject: confirmationEmail.subject,
      html: confirmationEmail.html,
    });

    console.log("Demo Request Submitted:", {
      emailToSelf,
      confirmationEmail,
      adminEmailResponse: adminRes,
      userEmailResponse: userRes
    });

    return NextResponse.json({ success: true, message: "Demo request received successfully" });

  } catch (error) {
    console.error("Error processing demo request:", error);
    return NextResponse.json(
      { error: "Failed to process demo request" },
      { status: 500 }
    );
  }
}
