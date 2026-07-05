import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const {
      company,
      name,
      email,
      phone,
      service,
      message,
    } = await req.json();

    const { data, error } = await resend.emails.send({
      from: "RGS Website <noreply@rgs.co.id>",
      to: ["vicko.armando@gmail.com"], // TEMPORARY TEST
      replyTo: email,
      subject: `New Inquiry • ${company || name || "RGS Website"}`,
      html: `
        <h2>New Website Inquiry</h2>

        <p><strong>Company:</strong> ${company || "-"}</p>
        <p><strong>Contact:</strong> ${name || "-"}</p>
        <p><strong>Email:</strong> ${email || "-"}</p>
        <p><strong>Phone:</strong> ${phone || "-"}</p>
        <p><strong>Service:</strong> ${service || "-"}</p>

        <hr>

        <p>${message || "-"}</p>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return Response.json(
        {
          success: false,
          error,
        },
        { status: 500 }
      );
    }

    console.log("Email sent:", data);

    return Response.json({
      success: true,
    });
  } catch (err) {
    console.error("API Error:", err);

    return Response.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}