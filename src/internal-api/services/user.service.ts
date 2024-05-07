import { Db } from '../../database/db';
import { AppError } from '../../helpers/errors';
import { Logger } from '../../helpers/logger';
import { Entities, Hash, ValidateURL } from '../../helpers';
import * as UserModel from '../../model/user.model';
import * as Token from '../../helpers/token';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import { Cloudinary } from '../../helpers/Cloudinary';

export class UserService {
  private db: Db;

  Cloudinary: Cloudinary = new Cloudinary();
  constructor(args: { db: Db }) {
    Logger.info('UserService initialized...');
    this.db = args.db;
  }

  public async GetUser(where: Partial<Entities.User>): Promise<Partial<Entities.User> | string> {
    Logger.info('UserService.GetUser', { where });

    
  }

}