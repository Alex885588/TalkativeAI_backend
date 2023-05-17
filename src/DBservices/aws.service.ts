import { Injectable } from "@nestjs/common";
import { S3 } from "aws-sdk";

@Injectable()
export class AWService {
    private s3 = new S3({
        region: "ap-northeast-1",
        accessKeyId: 'AKIAQ36YSSZKFL65K75U',
        secretAccessKey: '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',
    });
    constructor(){ }

    async uploadIcon(file: Express.Multer.File, position: string): Promise<{ iconPath: string; iconURL: string }> {
        const params = {
            Bucket: 'icon-cloud-workers-aws',
            Key: `folders/${position}.png`,
            Body: file.buffer,
            ContentType: file.mimetype,
        };
        const { Location } = await this.s3.upload(params).promise();
        return {
            iconPath: params.Key,
            iconURL: Location,
        };
    }

}