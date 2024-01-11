const mail = require("@sendgrid/mail");

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function POST (req, res) {
  const body = JSON.parse(req.body);

  try {
    // Generate email text based on conditions

    let emailText = "";
    if (!body.date) {
      emailText = `Привет! <br/>  Твои уроки забронированы. Ждём тебя каждые ${
        body.days
      } в ${body.time.slice(
        0,
        5
      )}. Мы пришлем ссылку на урок за 2-3 минуты до начала. Если у тебя есть вопросы, ты можешь задать их в Telegram @tutotalk. <br/> <br/>  С уважением, команда TutoTalk.`;
    } else if (!body.days) {
      let date = new Date(body.date);
      let options = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      emailText = `Привет! <br/>  Мы подтверждаем твое бронирование на наш бесплатный пробный урок английского языка в ${body.time.slice(
        0,
        5
      )}, ${date.toLocaleDateString(
        "en-US",
        options
      )}.  Мы отправим тебе ссылку на урок за 2-3 минуты до начала. До скорой встречи!!! <br/>  <br/> С уважением, команда TutoTalk.`;
    } else {
      emailText =
        "Что-то пошло не так, свяжитесь с нами по адресу team@tutotalk.com";
    }

    // Configure and send the email using SendGrid
    const msg = {
      to: `${body.email}`,
      from: "team@tutotalk.com",
      subject: "Let the Language Adventure Begin! 🌍📚",
      html: emailText,
    };

    await mail.send(msg);

    // Email sent successfully
    return res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send email." });
  }
}
