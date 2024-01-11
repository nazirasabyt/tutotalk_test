const mail = require("@sendgrid/mail");

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function POST(req, res) {
  const body = JSON.parse(req.body);

  try {
    const msg = {
      to: "nazirasabyt@gmail.com",
      from: "team@tutotalk.com",
      subject: "New Student",
      text: `You have a new student - ${body.student},  number: ${body.whatsapp} , ${body.date}, ${body.time}`,
    };

    await mail.send(msg);
    return res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send email." });
  }
}
