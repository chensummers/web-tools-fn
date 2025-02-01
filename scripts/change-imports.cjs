const fs = require('fs');
const path = require('path');
// const date = require('../dist/date/index.cjs');

// console.log('date', date);
// 定义要处理的目录
const directoryPath = path.join(__dirname, '..', 'dist');

// 递归处理目录中的所有文件和子目录
function processDirectory(directoryPath) {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return console.log('无法扫描目录: ' + err);
        }

        console.log('files', files);
        // 遍历每个文件
        files.forEach(file => {
            const filePath = path.join(directoryPath, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    return console.log('无法获取文件状态: ' + err);
                }

                if (stats.isDirectory()) {
                    // 如果是目录，则递归处理
                    processDirectory(filePath);
                } else if (stats.isFile() && path.extname(file) === '.js') {
                    // 如果是 .js 文件，则处理文件内容
                    fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) {
                            return console.log('无法读取文件: ' + err);
                        }

                        // 使用正则表达式替换所有的 .ts 引用为 .js 引用
                        let created = stats.birthtime;
                        let result = data.replace(/from\s+'(.*?)\.ts'/g, "from '$1.js'");
                        result = '\/\/'+stats.birthtime +'\n\r' + result;
                        // 将修改后的内容写回文件
                        fs.writeFile(filePath, result, 'utf8', err => {
                            if (err) {
                                return console.log('无法写入文件: ' + err);
                            }
                            console.log(`文件 ${file} 已更新`);
                        });
                    });
                }
            });
        });
    });
}

// 开始处理根目录
processDirectory(directoryPath);
