const S3 = require('aws-sdk/clients/s3');
const path = require('path');
// const uuid = require('uuid').v1;
const { nanoid } = require('nanoid');

const {
    AWS_S3_NAME,
    AWS_S3_REGION,
    AWS_S3_SECRET_KEY,
    AWS_S3_ACCESS_KEY
} = require('../configs/config');

const bucket = new S3({
    region: AWS_S3_REGION,
    accessKeyId: AWS_S3_ACCESS_KEY,
    secretAccessKey: AWS_S3_SECRET_KEY
});

module.exports = {
    uploadImage: (file = {}, itemType, itemId) => {
        const { name, data, mimetype } = file;

        const uploadPath = _fileNameBuilder(name, itemType, itemId);

        return bucket
            .upload({
                Bucket: AWS_S3_NAME,
                Body: data,
                Key: uploadPath,
                ContentType: mimetype,
                ACL: 'public-read'
            })
            .promise(); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }
};

function _fileNameBuilder(fileName, itemType, itemId) {
    // const fileExtension = fileName.split('.').pop(); // jpg
    const fileExtension = path.extname(fileName); // .jpg

    // return path.join(itemType, itemId, `${uuid()}${fileExtension}`);
    return path.join(itemType, itemId, `${nanoid()}${fileExtension}`);
}

// https://havecamerawilltravel.com/how-allow-public-access-amazon-bucket/?__cf_chl_jschl_tk__=pmd_U4B_UFB.Oza4sebJp_O3jMg.jkbyBX_K7FKEMc1hbms-1635350313-0-gqNtZGzNAjujcnBszQg9


// 1) Create new S3 bucket
// 2) Copy bucket name, bucket region into .env file
// 3) Ми рут юзер і має доступ до вього. Але юзера який буде логінитися на АВС під ключами
//    треба допускати лише до певного бакета з певними можливостями
// 4) Go to IAM menu
// 5) Create new policy
//    a) In services search S3
//    b) Access level
//       * WRITE
//          - delete
//          - put
//       * READ
//          - get object
//    c) Recourses
//       Add name of S3
//       Object name select Any
// 6) Go to Users menu
//    Create user with some name
//    ! Access Type -> Programatic access
//    Next
//    Attacj existing policies
//    Search policy and select it
//
// 7) AWS gives access key and secret key
