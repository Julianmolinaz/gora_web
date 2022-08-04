const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");

const AWS_BUCKET_REGION = "us-west-2";
const AWS_BUCKET_NAME = "gora-web-1656809609249";

class StorageDocumentos {
  constructor() {
    this.credenciales = {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: AWS_BUCKET_REGION 
    }; 
    AWS.config.update(this.credenciales);
    this.s3 = new AWS.S3();
  }

  async upload(filename, file, encoding, tipoDoc, bucketName) {
    try {
      const params = {
        Bucket: bucketName,
        Key: filename,
        Body: file,
        ContentEncoding: encoding,
        ContentType: tipoDoc
      };
      await this.s3.upload(params).promise();
      return true;
    } catch(err) {
      throw err;
    }
  }

  async getPublicURL(filename, bucketName) {
    const url = await this.s3.getSignedUrlPromise('getObject', {
      Bucket: AWS_BUCKET_NAME,
      Key: filename,
      Expires: 1800
    }); 
    return url;
  }

}

module.exports = StorageDocumentos;
