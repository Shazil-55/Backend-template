import { SMTP } from '../../helpers/env';
import { Logger } from '../../helpers/logger';

import axios from 'axios';

export class EmailService {
  constructor() {
    Logger.info('EmailService initialized...');
  }

  async SentCodeToUserEmail(userEmail: string, name: string, otpCode: string): Promise<undefined | string> {
    const BREVO_KEY = SMTP.BREVO_KEY;
    const BREVO_URL = SMTP.BREVO_URL;

    Logger.info('EmailService.RecoverUser', { userEmail });

    try {
      axios.post(
        BREVO_URL + '/smtp/email',
        {
          to: [{ email: userEmail }],
          subject: 'Otp Verification to recover password ',
          sender: {
            name: 'Linkwave',
            email: 'info@linkwave.io',
          },
          textContent: `
              <b>Hello </b> ${name} 
              </br>
              <b>Your Verification Code For Linkwave is </b> ${otpCode} 
              </br>
              `,
        },
        {
          headers: {
            'api-key': BREVO_KEY,
          },
        },
      );
      return 'Email sent successfully!';
    } catch (error) {
      return 'Unable to send Email';
    }
  }
}
