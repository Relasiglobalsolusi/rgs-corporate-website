import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: unknown) {
  return String(value || "-")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

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

    const { data, error } = await resend.emails.send({
      from: "RGS Website <contact@rgs.co.id>",

      // Send to company email
      to: ["contact@rgs.co.id"],

      // Temporary backup while Rumahweb fixes the issue.
      // Uncomment the line below if you also want a copy in Gmail.
      // to: ["contact@rgs.co.id", "vicko.armando@gmail.com"],

      replyTo: email,

      subject: `New Inquiry • ${company || name || "RGS Website"}`,

      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6; color:#0f172a;">
          <h2>New Website Inquiry</h2>

          <p><strong>Company:</strong> ${escapeHtml(company)}</p>
          <p><strong>Contact Person:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
          <p><strong>Service Needed:</strong> ${escapeHtml(service)}</p>

          <hr />

          <p><strong>Message:</strong></p>

          <p>
            ${escapeHtml(message).replaceAll("\n", "<br />")}
          </p>
        </div>
      `,

      text: `
New Website Inquiry

Company: ${company || "-"}
Contact Person: ${name || "-"}
Email: ${email || "-"}
Phone: ${phone || "-"}
Service Needed: ${service || "-"}

Message:
${message || "-"}
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return Response.json(
        {
          success: false,
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return Response.json({
      success: true,
      id: data?.id,
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return Response.json(
      {
        success: false,
        error: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}