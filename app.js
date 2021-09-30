const fs = require('fs');
const path = require('path');

const appendFilePath = path.join(__dirname, 'files', 'write.txt');
const mkdirPath = path.join(__dirname, 'files', 'user', '22', 'photos');
const newFilePath = path.join(mkdirPath, 'newFile.txt');

// const builder = require('./helper/user-builder');
//
// let user = builder.createUser('Victor', 25);
//
// console.log(user);
//
//



// fs.readFile(`${__dirname}/files/test.txt`, ((err, data) => {
//     if (err) {
//         console.log(err)
//         return;
//     }
//
//     console.log(data.toString());
// }));
//
// fs.writeFile(`${__dirname}/files/write.txt`, 'Hello WOrld22', (err) => {
//     console.log(err);
// });


console.log(appendFilePath);

// fs.appendFile(appendFilePath, 'Hello WOrld22 \n', (err) => {
//     console.log(err);
// });
//
// fs.mkdir(mkdirPath, {recursive: true}, (e) => {
//     console.log(e);
// });
//
// fs.unlink(appendFilePath, err => {
//     console.log(err);
// });

fs.rename(
    appendFilePath,
    newFilePath,
    err => {
        console.log(err);
    })




fs.readdir(mkdirPath, (err, data) => {
    if (err) {
        console.log(err);
        return
    }

    console.log(data);

    data.forEach(fileName => {
        fs.stat(path.join(mkdirPath, fileName), ((err, stats) => {
            if (err) {
                return;
            }

            console.log(stats.isFile());
        }))
    })
})
