import { Injectable } from '@nestjs/common';
import AWS from 'aws-sdk';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import sharp from 'sharp';

@Injectable()
export class ImagesService {
  private AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
  private s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_KEY_SECRET,
  });

  async create(createImageDto: CreateImageDto) {
    const { originalname, buffer, mimetype } = createImageDto;
    const imageBuffer = await sharp(buffer).resize(600, 600).toBuffer();
    const res = await this._s3_upload(
      imageBuffer,
      this.AWS_S3_BUCKET,
      originalname,
      mimetype,
    );
    console.log(res);
    return res.Key;
  }

  getFileStream(fileKey: string) {
    const downloadParams = {
      Key: fileKey,
      Bucket: this.AWS_S3_BUCKET,
    };

    return this.s3.getObject(downloadParams).createReadStream();
  }

  // update(id: number, updateImageDto: UpdateImageDto) {
  //   return `This action updates a #${id} image`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} image`;
  // }

  private async _s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      // ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      //   CreateBucketConfiguration: {
      //     LocationConstraint: 'ap-south-1',
      //   },
    };

    try {
      console.log('s3 upload');
      return await this.s3.upload(params).promise();
    } catch (e) {
      console.log(e);
    }
  }
}
