import nodemailer from "nodemailer";

function escapeHtml(value: unknown) {
  return String(value || "-")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/** Strip CR/LF so user input cannot inject email headers. */
function sanitizeHeaderValue(value: unknown, maxLength: number): string {
  return String(value ?? "")
    .replace(/[\r\n\0]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELD_MAX = 200;
const MESSAGE_MAX = 5000;
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;

const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

function allowRequest(ip: string): boolean {
  const now = Date.now();
  const bucket = rateBuckets.get(ip);
  if (!bucket || now >= bucket.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (bucket.count >= RATE_MAX) {
    return false;
  }
  bucket.count += 1;
  return true;
}

const logoUrl = "https://www.rgs.co.id/images/logo.png";

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT || 465);

  if (!host || !user || !pass) {
    throw new Error("SMTP is not configured");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function POST(req: Request) {
  try {
    if (!allowRequest(clientIp(req))) {
      return Response.json(
        { success: false, error: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return Response.json(
        { success: false, error: "Invalid request body." },
        { status: 400 }
      );
    }

    const raw =
      typeof body === "object" && body !== null
        ? (body as Record<string, unknown>)
        : {};

    const company = sanitizeHeaderValue(raw.company, FIELD_MAX);
    const name = sanitizeHeaderValue(raw.name, FIELD_MAX);
    const email = sanitizeHeaderValue(raw.email, FIELD_MAX).toLowerCase();
    const phone = sanitizeHeaderValue(raw.phone, FIELD_MAX);
    const service = sanitizeHeaderValue(raw.service, FIELD_MAX);
    const message = String(raw.message ?? "")
      .replace(/\0/g, "")
      .trim()
      .slice(0, MESSAGE_MAX);

    if (!company || !name || !email || !phone || !message) {
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!EMAIL_RE.test(email) || email.includes(" ")) {
      return Response.json(
        { success: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    const transporter = getTransporter();
    const inboxTo =
      process.env.CONTACT_TO?.trim() ||
      process.env.SMTP_USER ||
      "contact@rgs.co.id";
    const fromAddress = `"Relasi Global Solusi" <${process.env.SMTP_USER}>`;
    const subject = sanitizeHeaderValue(
      `New Website Inquiry • ${company || name}`,
      180
    );

    // Inbox delivery is required; confirmation to the visitor is best-effort.
    await transporter.sendMail({
      from: fromAddress,
      to: inboxTo,
      replyTo: email,
      subject,
      html: `
          <div style="margin:0;padding:0;background:#eef2f7;font-family:Arial,Helvetica,sans-serif;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#eef2f7;padding:36px 0;">
              <tr>
                <td align="center">
                  <table role="presentation" width="640" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #dbe3ec;">
                    <tr>
                      <td style="background:#07152d;padding:30px;text-align:center;">
                        <img src="${logoUrl}" alt="Relasi Global Solusi" style="width:220px;max-width:90%;display:block;margin:auto;" />
                      </td>
                    </tr>

                    <tr>
                      <td style="padding:34px 40px;color:#1e293b;font-size:15px;line-height:1.7;">
                        <h2 style="margin:0 0 24px;color:#0f172a;font-size:24px;">New Website Inquiry</h2>

                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                          <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;width:160px;"><strong>Company</strong></td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;">${escapeHtml(company)}</td></tr>
                          <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;"><strong>Contact Person</strong></td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;">${escapeHtml(name)}</td></tr>
                          <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;"><strong>Email</strong></td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;">${escapeHtml(email)}</td></tr>
                          <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;"><strong>Phone</strong></td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;">${escapeHtml(phone)}</td></tr>
                          <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;"><strong>Service</strong></td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;">${escapeHtml(service)}</td></tr>
                        </table>

                        <div style="margin-top:28px;">
                          <h3 style="margin:0 0 10px;color:#0f172a;font-size:18px;">Message</h3>
                          <div style="background:#f8fafc;border-left:5px solid #2563eb;padding:18px;border-radius:8px;">
                            ${escapeHtml(message).replaceAll("\n", "<br>")}
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 40px;font-size:13px;color:#64748b;">
                        This message was submitted through the Relasi Global Solusi website contact form.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        `,
      text: `
New Website Inquiry

Company: ${company || "-"}
Contact Person: ${name || "-"}
Email: ${email || "-"}
Phone: ${phone || "-"}
Service: ${service || "-"}

Message:

${message || "-"}
`,
    });

    try {
      await transporter.sendMail({
        from: fromAddress,
        to: email,
        subject: "Thank You for Contacting Relasi Global Solusi",
        html: `
          <div style="margin:0;padding:0;background:#eef2f7;font-family:Arial,Helvetica,sans-serif;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#eef2f7;padding:40px 0;">
              <tr>
                <td align="center">
                  <table role="presentation" width="640" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #dbe3ec;">
                    <tr>
                      <td style="background:#07152d;padding:36px;text-align:center;">
                        <img src="${logoUrl}" alt="Relasi Global Solusi" style="width:230px;max-width:90%;display:block;margin:auto;" />
                      </td>
                    </tr>

                    <tr>
                      <td style="padding:40px 42px;color:#1e293b;font-size:16px;line-height:1.8;">
                        <p style="margin-top:0;">Dear <strong>${escapeHtml(name)}</strong>,</p>

                        <p>
                          Thank you for contacting
                          <strong>Relasi Global Solusi (RGS)</strong>.
                        </p>

                        <p>
                          We have successfully received your inquiry and appreciate your interest in our services.
                        </p>

                        <p>
                          Our team is currently reviewing your request and will respond as soon as possible.
                        </p>

                        <table width="100%" cellspacing="0" cellpadding="0" style="margin:30px 0;">
                          <tr>
                            <td style="background:#eff6ff;border-left:5px solid #2563eb;padding:18px;border-radius:8px;">
                              <strong style="color:#1d4ed8;">Urgent inquiry?</strong><br>
                              Please contact us at
                              <strong>+62 21 2295 2228</strong>.
                            </td>
                          </tr>
                        </table>

                        <p>
                          We appreciate the opportunity to assist your business and look forward to speaking with you.
                        </p>

                        <br>

                        <p style="margin-bottom:6px;">Kind regards,</p>

                        <p style="margin-top:0;line-height:1.8;">
                          <strong>Relasi Global Solusi (RGS)</strong><br>
                          Jl. Daan Mogot KM 14.5, Ruko Point 8 Blok F6<br>
                          Duri Kosambi, Cengkareng<br>
                          West Jakarta 11750<br>
                          +62 21 2295 2228<br>
                          <a href="https://www.rgs.co.id" style="color:#2563eb;text-decoration:none;font-weight:600;">
                            https://www.rgs.co.id
                          </a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        `,
        text: `
Dear ${name},

Thank you for contacting Relasi Global Solusi (RGS).

We have successfully received your inquiry and appreciate your interest in our services.
Our team is currently reviewing your request and will respond as soon as possible.

If your inquiry is urgent, please contact us at +62 21 2295 2228.

Kind regards,

Relasi Global Solusi (RGS)
Jl. Daan Mogot KM 14.5, Ruko Point 8 Blok F6
Duri Kosambi, Cengkareng
West Jakarta 11750
+62 21 2295 2228
https://www.rgs.co.id
`,
      });
    } catch (confirmError) {
      console.error("[contact] Confirmation email failed:", confirmError);
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);

    return Response.json(
      { success: false, error: "Unable to send email." },
      { status: 500 }
    );
  }
}
