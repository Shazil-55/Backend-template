import { Db } from '../../database/db';
import { AppError } from '../../helpers/errors';
import { Logger } from '../../helpers/logger';
import { Entities, Hash } from '../../helpers';
import * as Token from '../../helpers/token';
import { generateOTP } from '../../helpers/otp';
import { EmailService } from './email.service';

export class AuthService {
  private db: Db;
  private emailService: EmailService;

  constructor(args: { db: Db }) {
    Logger.info('AuthService initialized...');
    this.db = args.db;
    this.emailService = new EmailService();
  }
  // public async CreateUser(user: AuthModel.UserRegisterModel): Promise<AuthModel.Tokens> {
  
    // const token: AuthModel.Tokens = {
    //   accessToken: accessToken,
    //   refreshToken: refreshToken,
    // };
    // return token;
  // }

}
