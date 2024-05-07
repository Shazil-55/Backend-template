import fileUpload from 'express-fileupload';
import { versionNo } from '../../helpers/contants';
import { Server } from '../../helpers/env';
import { AppError } from '../../helpers/errors';
import { Logger } from '../../helpers/logger';
import { HealthStatusModel } from '../models/common.model';
// import { AwsS3Service } from '../../helpers/AwsS3';
import { Cloudinary } from '../../helpers/Cloudinary';

export class CommonService {
  // AwsS3Service: AwsS3Service;
  Cloudinary: Cloudinary = new Cloudinary();

  constructor() {
    Logger.info('CommonService initialized...');

    // this.AwsS3Service = new AwsS3Service();
  }

  public GetHealthStatus(): HealthStatusModel {
    Logger.info('CommonService.GetHealthStatus');

    return {
      message: 'Server is running',
      environment: Server.ENVIRONMENT,
      versionNo: versionNo,
    };
  }

  public async UploadImage(files: fileUpload.FileArray | null | undefined): Promise<string> {
    Logger.info('CommonService.UploadImage', files);

    try {
      if (!files) throw new AppError(400, 'Missing file');

      const file = files.fileToUpload as fileUpload.UploadedFile;

      const img = await this.Cloudinary.uploadFileToCloudinary(file);

      return img;
    } catch (error) {
      Logger.error(`Error CommonService.UploadImage ${error}`);
      throw new AppError(400, 'Unable to upload file');
    }
  }
}
