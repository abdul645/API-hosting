import nodemailer from 'nodemailer'

export const ContactUsController = async (req, res) =>{

    try {
        const { name, email, company, message} = req.body;
        const AdminMail = process.env.ADMIN_MAIL; // admin who will be notified on any new mail. it won't send mail, only received 

        // configure mail transporter 
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user : process.env.USER_MAIL, // sender
                pass: process.env.ADMIN_MAIL_PASS
            }
        })

        //define email content for client
        const ClientMailOptions = {
            from: process.env.USER_MAIL,
            to: email, // Client's email
            subject: "Thank You for Contacting Us",
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2>Thank You for Reaching Out!</h2>
                    <p>Dear ${name},</p>
        
                    <p>Thank you for contacting <strong> ${company}</strong>. We have received your message and our team will get back to you shortly.</p>
        
                    <p><strong>Here’s what we received from you:</strong></p>
                    <ul>
                        <li><strong>Name:</strong> ${name}</li>
                        <li><strong>Email:</strong> ${email}</li>
                        <li><strong>Company:</strong> ${company}</li>
                        <li><strong>Message:</strong> ${message}</li>
                    </ul>
        
                    <p>If any of the above information is incorrect, feel free to contact us again.</p>
        
                    <p>Best regards,<br>
                    DevNexus Team<br>
                    <a href="https://devnexus.in/">https://devnexus.in/</a></p>
                </div>
            `
        };
        


        // define email content for admin
        const AdminMailOptions = {
            from : process.env.USER_MAIL,
            to: AdminMail,
            subject: "Contact Us",
            html: `
                <p> Dear DevNexus Team,</p>
                <p>We have received a new inquiry via the Contact Us form. Please find the client details below:<p/>
                <p> <b>Name:</b> ${name} <p/>
                <p><b>Email:</b> ${email}<p/>
                <p><b>Company (if any): ${company}</b> <p/>
                <p> <b>Message:</b> ${message}</p>
                <p>Please follow up with the client at your earliest convenience.</p>
            
            `,
        }


        // Send mail to client and Devnexus
        await transporter.sendMail(ClientMailOptions);
        await transporter.sendMail(AdminMailOptions);
        
        res.json({success: true, message: 'Sent Successfully'})
    } catch (error) {
        console.log("Email Error", error);
        res.json({success: false, message: 'Error Sending Email'})
        
    }
}