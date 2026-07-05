import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { company, name, email, phone, service, message } = await req.json();

    const { error } = await resend.emails.send({
      from: "RGS Website <noreply@rgs.co.id>",
      to: ["contact@rgs.co.id"],
      replyTo: email,
      subject: `New Inquiry • ${company || name || "RGS Website"}`,
      html: `
        <h2>New Website Inquiry</h2>

        <p><strong>Company:</strong> ${company || "-"}</p>
        <p><strong>Contact:</strong> ${name || "-"}</p>
        <p><strong>Email:</strong> ${email || "-"}</p>
        <p><strong>Phone:</strong> ${phone || "-"}</p>
        <p><strong>Service:</strong> ${service || "-"}</p>

        <hr />

        <p>${message || "-"}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ success: false, error }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return Response.json({ success: false }, { status: 500 });
  }
}