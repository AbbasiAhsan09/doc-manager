// import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import * as Brevo from '@getbrevo/brevo' // this way you get all types, but it will work as with const SibApiV3Sdk = require('@getbrevo/brevo'); too.

export class SendMailRequest{
    to : {email : string, name? : string}[]
    from ? : string;
    text ? : string;
    html ? : string;
    subject : string;
    attachments ? : any[]
}

@Injectable()
export class MailService {
    constructor(
        // private readonly httpService : HttpService
    ){}


    async sendMail(data: SendMailRequest): Promise<boolean> {
        try {
            const apiKey = process.env.SIB_API_KEY;

      
            const apiInstance = new Brevo.TransactionalEmailsApi()
            apiInstance.setApiKey(0, apiKey);
           
      
            const { to, from, text,html, subject, attachments } = data;

            // const emailTemplateSource = fs.readFileSync(`src/mailer/templates/${template}.html`, 'utf8')
      
            const res = await apiInstance.sendTransacEmail({
              sender: {email : from || 'ahsanabbasi5657@gmail.com', name : 'Muhammad Ahsan'},
              to,
              subject: subject,
              textContent : text,
            //   htmlContent: `${emailTemplateSource}`,
            //   params: {
            //     ...params
            //   },
              attachment: attachments && attachments.length > 0 ? attachments : null!
            });

      
            return true
          } catch (error) {
            console.log('ERROR SENDING EMAIL: ', error)
            return false
          }
        }
}