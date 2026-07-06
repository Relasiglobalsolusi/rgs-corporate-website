import nodemailer from "nodemailer";

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
    const { company, name, email, phone, service, message } = await req.json();

    if (!name || !email || !phone || !message) {
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    await transporter.verify();

    await transporter.sendMail({
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
    });

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