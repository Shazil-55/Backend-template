import * as express from 'express';
import { Request, Response } from 'express';
import { Logger } from '../../helpers/logger';
import { RequestBody, genericError } from '../../helpers/utils';
import { CommonService } from '../services/common.service';
import { UserService } from '../services/user.service';
import { Db } from '../../database/db';
import * as UserModel from '../../model/user.model';

export class CommonController {
  public router: express.Router;

  constructor() {
    Logger.info('Common controller initialized...');
    this.router = express.Router();
    this.CommonRouter();
  }

  private CommonRouter(): void {
    this.router.get('/status', (req: Request, res: Response) => {
      let body;
      try {
        const service = new CommonService();

        const response = service.GetHealthStatus();

        body = {
          data: response,
        };
      } catch (error) {
        genericError(error, res);
      }
      res.json(body);
    });

    this.router.post('/upload-file', async (req: Request, res: Response) => {
      let body;
      try {
        const service = new CommonService();

        const response = await service.UploadImage(req.files);

        body = {
          data: response,
        };
      } catch (error) {
        genericError(error, res);
      }
      res.json(body);
    });

    this.router.post('/analytics', async (req: RequestBody<UserModel.clickAnalytics>, res: Response) => {
      let body;
      try {
        await UserModel.AnalyticsLinkClick.validateAsync(req.body, {
          abortEarly: false,
        });
        const db = res.locals.db as Db;
        const service = new UserService({ db });
        await service.AddAnalyticsClick(req.body, req.ip);
      } catch (error) {
        genericError(error, res);
      }
      res.json(body);
    });

    this.router.get('/user/:username', async (req: Request, res: Response) => {
      let body;
      try {
        const db = res.locals.db as Db;
        const service = new UserService({ db });
        const userName = req.params.username;
        const response = await service.GetPublicUser(userName);

        body = {
          data: response,
        };
      } catch (error) {
        genericError(error, res);
      }
      res.json(body);
    });
  }
}
