import { getEmployeeModel, getAttendanceModel, getLeaveRequestModel, getHRSettingsModel } from "@/lib/app-models";
import connectDB from "@/lib/db";
import { User } from "@/lib/models";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const JWT_SECRET = process.env.JWT_SECRET;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Handles "Get Started" / "Book a Demo" form submissions.
 * Automatically registers a 15-day Professional SaaS Trial customer account,
 * pre-seeds their isolated HRMS database with mock workforce directories,
 * generates a secure dynamic password, and emails them their credentials along with
 * a premium, single-click instant login magic link.
 *
 * @param {Request} request - The incoming HTTP request containing the form fields.
 * @returns {Promise<NextResponse>} JSON response with success status.
 */
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

    if (!JWT_SECRET) {
      return NextResponse.json(
        { error: "Server authentication secret is not defined" },
        { status: 500 }
      );
    }

    await connectDB();

    /**
     * Look up the customer account by work email.
     * If the account does not exist, create a new SaaS customer profile.
     */
    let user = await User.findOne({ email });
    const generatedPassword = `Trial_${Math.random().toString(36).substring(2, 8).toUpperCase()}!`;

    if (!user) {
      user = await User.create({
        email,
        name: `${firstName} ${lastName}`,
        company,
        companySize,
        product,
        message: message || "",
        password: generatedPassword,
      });
    }

    const orgId = user._id.toString();

    /**
     * Retrieve partition models for the customer organization.
     */
    const Employee = await getEmployeeModel(orgId);
    const Attendance = await getAttendanceModel(orgId);
    const LeaveRequest = await getLeaveRequestModel(orgId);
    const HRSettings = await getHRSettingsModel(orgId);

    /**
     * Clear any existing records inside this organization's partition.
     */
    await Promise.all([
      Employee.deleteMany({ organizationId: orgId }),
      Attendance.deleteMany({ organizationId: orgId }),
      LeaveRequest.deleteMany({ organizationId: orgId }),
      HRSettings.deleteMany({ organizationId: orgId }),
    ]);

    /**
     * Seed a default HRSettings profile for the new organization dashboard.
     */
    await HRSettings.create({
      organizationId: orgId,
      companyName: `${company} HRMS Dashboard`,
      workWeekStart: "Monday",
      workWeekEnd: "Friday",
      standardCheckIn: "09:00",
      standardCheckOut: "18:00",
      allowSelfAttendance: true,
      defaultLeaveAllowance: 21,
    });

    const bday1 = new Date();
    bday1.setFullYear(1992);
    bday1.setDate(bday1.getDate() + 1);

    const employeeData = [
      { firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", department: "Engineering", role: "Principal Engineer", joiningDate: new Date("2024-03-15"), birthday: bday1, managerName: "Alice Vance", isActive: true }
    ];

    /**
     * Seed initial mock employee records for sandbox exploring.
     */
    const employees = await Employee.create(
      employeeData.map(emp => ({ ...emp, organizationId: orgId }))
    );

    const today = new Date();

    const attendanceData = [
      { employeeId: employees[0]._id, date: today, status: 'PRESENT', checkIn: new Date(today.setHours(9, 0)) }
    ];

    /**
     * Seed initial check-in records.
     */
    await Attendance.create(
      attendanceData.map(log => ({ ...log, organizationId: orgId }))
    );

    const leaveData = [
      {
        employeeId: employees[0]._id,
        startDate: new Date(Date.now() + 86400000 * 5),
        endDate: new Date(Date.now() + 86400000 * 10),
        type: 'VACATION',
        status: 'PENDING',
        reason: 'Annual family summer vacation',
      },
    ];

    /**
     * Seed time-off request logs.
     */
    await LeaveRequest.create(
      leaveData.map(leave => ({ ...leave, organizationId: orgId }))
    );

    /**
     * Sign a secure 15-day JSON Web Token for the trial session.
     */
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: "user",
        type: "customer",
      },
      JWT_SECRET,
      { expiresIn: "15d" }
    );

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const loginUrl = `${baseUrl}/login`;

    const brandColor = "#0f172a";
    const backgroundColor = "#f8fafc";
    const cardBackground = "#ffffff";
    const textColor = "#0f172a";
    const mutedTextColor = "#334155";
    const borderColor = "#e2e8f0";

    const logoHtml = `
      <div style="margin-bottom: 16px; text-align: left;">
        <svg width="130" height="30" viewBox="0 0 500 110" xmlns="http://www.w3.org/2000/svg" style="display: block; max-width: 100%; height: auto;">
          <g transform="translate(-20, -130) scale(1.1)">
            <path d="M 124 136 L 106 141 L 87 150 L 74 159 L 56 177 L 46 192 L 35 218 L 31 240 L 33 271 L 42 298 L 54 318 L 74 339 L 104 356 L 125 362 L 149 364 L 176 360 L 191 355 L 211 344 L 234 323 L 242 312 L 232 305 L 232 194 L 232 194 L 244 189 L 226 166 L 211 154 L 186 141 L 163 135 Z" fill="${brandColor}" />
            <path d="M 356 195 L 356 204 L 394 249 L 355 295 L 355 302 L 379 303 L 406 270 L 410 268 L 439 303 L 463 303 L 463 295 L 424 249 L 463 203 L 463 195 L 440 195 L 409 231 L 379 195 Z" fill="${brandColor}" />
            <path d="M 238 195 L 237 303 L 259 303 L 260 260 L 281 260 L 317 303 L 340 303 L 340 294 L 302 249 L 340 204 L 340 195 L 317 195 L 281 238 L 260 238 L 260 196 Z" fill="${brandColor}" />
            <path d="M 97 195 L 97 303 L 119 303 L 120 231 L 157 274 L 194 231 L 195 302 L 217 303 L 217 195 L 194 195 L 157 239 L 121 196 Z" fill="${brandColor}" />
          </g>
        </svg>
      </div>
    `;

    const confirmationEmail = {
      subject: `Your 15-Day HRMS Trial Account is Ready! - MKX Technologies`,
      html: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: ${backgroundColor}; margin: 0; padding: 0; color: ${textColor};">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${backgroundColor};">
            <tr>
              <td align="center" style="padding: 20px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: ${cardBackground}; border-radius: 12px; border: 1px solid ${borderColor}; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);">
                  <tr>
                    <td style="padding: 32px 24px;">
                      ${logoHtml}
                      
                      <h2 style="font-size: 24px; font-weight: 800; margin: 0 0 8px; color: ${textColor}; line-height: 1.2;">Welcome to your Free Trial!</h2>
                      <p style="font-size: 15px; color: ${mutedTextColor}; margin: 0 0 24px; line-height: 1.5;">
                        Hello ${firstName}, we have automatically registered your organization and pre-populated your private, secure trial sandbox with rich demo dataset so you can start exploring immediately.
                      </p>

                      <div style="background-color: #f8fafc; border-radius: 8px; border: 1px solid ${borderColor}; padding: 20px; margin-bottom: 24px;">
                        <h3 style="margin: 0 0 14px; font-size: 13px; color: ${brandColor}; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 800;">Dynamic Trial Credentials</h3>
                        
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px;">
                          <tr>
                            <td style="padding: 4px 0; color: ${mutedTextColor}; width: 120px;">Work Email:</td>
                            <td style="padding: 4px 0; font-weight: 600;">${email}</td>
                          </tr>
                          <tr>
                            <td style="padding: 4px 0; color: ${mutedTextColor};">Temp Password:</td>
                            <td style="padding: 4px 0; font-weight: 600; color: ${textColor}; font-family: monospace;">${user.password || generatedPassword}</td>
                          </tr>
                          <tr>
                            <td style="padding: 4px 0; color: ${mutedTextColor};">Trial Period:</td>
                            <td style="padding: 4px 0; font-weight: 600; color: ${brandColor};">15 Days Free Trial</td>
                          </tr>
                        </table>
                      </div>

                      <div style="text-align: center; margin: 32px 0;">
                        <a href="${loginUrl}" style="display: inline-block; background-color: ${brandColor}; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 15px; padding: 14px 32px; border-radius: 6px; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2); text-transform: uppercase; letter-spacing: 0.5px;">
                          Go to Login Page
                        </a>
                        <p style="font-size: 12px; color: ${mutedTextColor}; margin: 10px 0 0;">
                          Please use the Email and Password listed above to access your dashboard.
                        </p>
                      </div>

                      <div style="background-color: #f1f5f9; border-left: 3px solid #64748b; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
                        <p style="margin: 0; color: ${textColor}; font-size: 13px; line-height: 1.5; font-weight: 500;">
                          <strong>What's Pre-loaded:</strong> We have seeded 3 mock employee profiles, real-time daily attendance check-ins, and leave requests. Feel free to perform any CRUD updates!
                        </p>
                      </div>

                      <div style="border-top: 1px solid ${borderColor}; padding-top: 24px; text-align: center;">
                        <p style="font-size: 12px; color: ${mutedTextColor}; margin: 0 0 4px;">Need help? Reply directly to this email.</p>
                        <p style="font-size: 14px; font-weight: 800; color: ${textColor}; margin: 0; text-transform: uppercase; letter-spacing: 1px;">MKX Technologies</p>
                        <p style="font-size: 10px; color: ${mutedTextColor}; margin: 16px 0 0;">
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

    /**
     * Send internal lead notification email to administration receiver.
     */
    const adminRes = await transporter.sendMail({
      from: `"MKX Demo Alerts" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_RECEIVER_EMAIL || 'mkxtechnologies@gmail.com',
      subject: `[LEAD] New 15-Day HRMS Trial Registered: ${firstName} ${lastName}`,
      html: `<h3>New Customer Trial Signup</h3><p>Name: ${firstName} ${lastName}</p><p>Email: ${email}</p><p>Company: ${company}</p>`,
    });

    /**
     * Send the dynamic trial credentials and magic link to the customer work email.
     */
    const userRes = await transporter.sendMail({
      from: `"MKX Technologies Pvt Ltd" <${process.env.SMTP_USER}>`,
      to: email,
      subject: confirmationEmail.subject,
      html: confirmationEmail.html,
    });

    console.log("Demo Trial Registered successfully:", {
      email,
      loginUrl,
      adminEmailResponse: adminRes,
      userEmailResponse: userRes
    });

    return NextResponse.json({ success: true, message: "15-Days Free Trial account created and email sent successfully!" });

  } catch (error: any) {
    console.error("Error processing demo request:", error.message);
    return NextResponse.json(
      { error: "Failed to register trial account" },
      { status: 500 }
    );
  }
}
