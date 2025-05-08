// const nodemailer = require("nodemailer");

// const createTransporter = (email, mailkey) => {
//   return nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "sonipushpendra256@gmail.com",
//       pass: "xyhn ujvz lknw eapm",
//     },
//   });
// };

// const sendOtpEmail = async (email, otp, senderEmail, mailkey) => {
//   try {
//     console.log(email);
//     console.log(otp);
//     // console.log(name);
//     console.log(senderEmail);
//     console.log(mailkey);

//     if (!email || !otp || !senderEmail || !mailkey) {
//       console.error("Missing required fields for sending OTP email");
//       return false;
//     }

//     const transporter = createTransporter(senderEmail, mailkey);

//     const mailOptions = {
//       from: "sonipushpendra256@gmail.com",
//       to: email,
//       subject: "Your OTP Verification Code",
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h2>Hello ,</h2>
//           <p>Your verification code is:</p>
//           <h1 style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
//           <p>This code will expire in 10 minutes.</p>
//           <p>If you didn't request this code, please ignore this email.</p>
//         </div>
//       `,
//     };
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent: ", info.messageId);
//     return true;
//   } catch (error) {
//     console.error("Error sending email: ", error);
//     return false;
//   }
// };

// module.exports = { sendOtpEmail };








// const nodemailer = require("nodemailer");

// const createTransporter = (email, mailkey) => {
//   return nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "sonipushpendra256@gmail.com",
//       pass: "xyhn ujvz lknw eapm",
//     },
//   });
// };

// const sendOtpEmail = async (email, otp, senderEmail, mailkey) => {
//   try {
//     console.log("Sending OTP to:", email);

//     if (!email || !otp || !senderEmail || !mailkey) {
//       console.error("Missing required fields for sending OTP email");
//       return false;
//     }

//     const transporter = createTransporter(senderEmail, mailkey);

//     const mailOptions = {
//       from: "sonipushpendra256@gmail.com",
//       to: email,
//       subject: "Your OTP Verification Code",
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h2>Hello,</h2>
//           <p>Your verification code is:</p>
//           <h1 style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
//           <p>This code will expire in 10 minutes.</p>
//           <p>If you didn't request this code, please ignore this email.</p>
//         </div>
//       `,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent: ", info.messageId);
//     return true;
//   } catch (error) {
//     console.error("Error sending email: ", error);
//     return false;
//   }
// };

// module.exports = { sendOtpEmail };







const nodemailer = require("nodemailer");

const createTransporter = (email, mailkey) => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sonipushpendra256@gmail.com",
      pass: "xyhn ujvz lknw eapm",
    },
  });
};

const sendOtpEmail = async (email, otp, senderEmail, mailkey) => {
  try {
    console.log("Sending OTP to:", email);

    if (!email || !otp || !senderEmail || !mailkey) {
      console.error("Missing required fields for sending OTP email");
      return false;
    }

    const transporter = createTransporter(senderEmail, mailkey);

    const mailOptions = {
      from: "sonipushpendra256@gmail.com",
      to: email,
      subject: "Your OTP Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
          <h2 style="color: #333;">Hello,</h2>
          <p style="color: #555;">Your verification code is:</p>
          <h1 style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 32px; letter-spacing: 5px; color: #333;">${otp}</h1>
          <p style="color: #555;">This code will expire in 10 minutes.</p>
          <p style="color: #555;">If you didn't request this code, please ignore this email.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email: ", error);
    return false;
  }
};

const sendBookingStatusEmail = async (email, message, senderEmail, mailkey) => {
  try {
    console.log("Sending booking status update to:", email);

    if (!email || !message || !senderEmail || !mailkey) {
      console.error("Missing required fields for sending booking status email");
      return false;
    }

    const transporter = createTransporter(senderEmail, mailkey);

    const mailOptions = {
      from: senderEmail,
      to: email,
      subject: "Booking Status Update",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
          <h2 style="color: #333;">Dear Customer,</h2>
          <p style="color: #555;">We wanted to update you on the status of your booking:</p>
          <p style="color: #555; font-weight: bold; font-size: 18px;">${message}</p>
          <p style="color: #555;">If you have any questions, feel free to reach out to our support team.</p>
          <p style="color: #555;">Thank you for choosing us!</p>
          <footer style="color: #777; font-size: 12px;">
            <p style="color: #777;">Best regards, <br/> The Booking Team</p>
          </footer>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email: ", error);
    return false;
  }
};

module.exports = { sendOtpEmail, sendBookingStatusEmail };