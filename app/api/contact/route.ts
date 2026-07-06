import nodemailer from "nodemailer";
import path from "path";

function escapeHtml(value: unknown) {
  return String(value || "-")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const { company, name, email, phone, service, message } =
      await req.json();

    if (!name || !email || !phone || !message) {
      return Response.json(
        {
          success: false,
          error: "Missing required fields",
        },
        {
          status: 400,
        }
      );
    }

    await Promise.all([
      // =========================
      // ADMIN EMAIL
      // =========================
      transporter.sendMail({
        from: `"PT Relasi Global Solusi" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER,
        replyTo: email,
        subject: `New Website Inquiry • ${company || name}`,
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
            <h2>New Website Inquiry</h2>

            <table style="border-collapse:collapse">
              <tr>
                <td><strong>Company</strong></td>
                <td>: ${escapeHtml(company)}</td>
              </tr>
              <tr>
                <td><strong>Contact Person</strong></td>
                <td>: ${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td><strong>Email</strong></td>
                <td>: ${escapeHtml(email)}</td>
              </tr>
              <tr>
                <td><strong>Phone</strong></td>
                <td>: ${escapeHtml(phone)}</td>
              </tr>
              <tr>
                <td><strong>Service</strong></td>
                <td>: ${escapeHtml(service)}</td>
              </tr>
            </table>

            <hr>

            <h3>Message</h3>

            <p>${escapeHtml(message).replaceAll("\n", "<br>")}</p>
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
      }),

      // =========================
      // CUSTOMER AUTO REPLY
      // =========================
      transporter.sendMail({
        from: `"PT Relasi Global Solusi" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Thank You for Contacting PT Relasi Global Solusi",

        html: `
          <div style="max-width:600px;margin:auto;padding:32px;font-family:Arial,Helvetica,sans-serif;color:#0f172a;line-height:1.7;">

            <div style="text-align:center;margin-bottom:30px;">
              <img
                src="cid:rgslogo"
                alt="PT Relasi Global Solusi"
                style="max-width:190px;height:auto;"
              />
            </div>

            <p>Dear <strong>${escapeHtml(name)}</strong>,</p>

            <p>
              Thank you for contacting
              <strong>PT Relasi Global Solusi (RGS)</strong>.
            </p>

            <p>
              We have successfully received your inquiry and appreciate your
              interest in our services.
            </p>

            <p>
              Our team is currently reviewing your request and will respond
              to you as soon as possible.
            </p>

            <p>
              If your inquiry is urgent, please contact our
              <strong>Main Office</strong> at
              <strong>+62 21 2295 2228</strong>.
            </p>

            <br>

            <p>
              Kind regards,
            </p>

            <p>
              <strong>PT Relasi Global Solusi (RGS)</strong><br>
              Jl. Daan Mogot KM 14.5, Ruko Point 8 Blok F6<br>
              Duri Kosambi, Cengkareng<br>
              West Jakarta 11750<br><br>

              Main Office: +62 21 2295 2228<br>
              https://rgs.co.id
            </p>

          </div>
        `,

        text: `
Dear ${name},

Thank you for contacting PT Relasi Global Solusi (RGS).

We have successfully received your inquiry.

Our team is currently reviewing your request and will respond as soon as possible.

If your inquiry is urgent, please contact our Main Office at +62 21 2295 2228.

Kind regards,

PT Relasi Global Solusi (RGS)
Jl. Daan Mogot KM 14.5, Ruko Point 8 Blok F6
Duri Kosambi, Cengkareng
West Jakarta 11750

https://rgs.co.id
`,

        attachments: [
          {
            filename: "logo.png",
            path: path.join(process.cwd(), "public", "images", "logo.png"),
            cid: "rgslogo",
          },
        ],
      }),
    ]);

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: "Unable to send email.",
      },
      {
        status: 500,
      }
    );
  }
}