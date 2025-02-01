//Mon Jan 27 2025 16:03:34 GMT+0800 (中国标准时间)
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FileToImageFn } from '../utils/index.js';
/**
* 压缩图片并限制其尺寸和文件大小
* @param {File} file - 要压缩的图片文件
* @param {number} maxLength - 图片的最大边长(具体数值或者0-1百分比小数)(必填)
* @param {number} maxSize - 图片的最大文件大小(具体数值或者0-1百分比小数)(可选)
* @param {number} quality - 图片的压缩质量，默认为0.85 (可选)
* @returns {Promise<Blob>} - 压缩后的图片Blob对象
*/
export function compressImageWithFixedLength(file, maxLength, maxSize = 0, quality = 0.85) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        //根据百分比计算最大数值
        if (maxSize && maxSize < 1 && maxSize > 0) {
            maxSize = maxSize * file.size;
        }
        // 如果图片大小小于maxSize，则直接返回该图片
        if (maxSize && file.size <= maxSize) {
            resolve(file);
            return;
        }
        const { img, error } = yield FileToImageFn(file);
        if (error) {
            reject(error);
            return;
        }
        if (!img) {
            reject(new Error('无法获取Image对象'));
            return;
        }
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        let ratio = 1;
        // 计算压缩比例
        if (maxLength > 0 && maxLength < 1) {
            ratio = maxLength;
        }
        else {
            ratio = Math.min(maxLength / width, maxLength / height);
        }
        if (ratio < 1) {
            width *= ratio;
            height *= ratio;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(img, 0, 0, width, height);
        const PERCENTAGE = 0.98;
        const checkSize = (blob) => {
            let newFile = new File([blob], file.name, { type: file.type });
            // 如果maxSize未定义，则直接返回压缩后的图片
            if (!Number(maxSize)) {
                resolve(newFile);
                return;
            }
            const minsize = maxSize * PERCENTAGE;
            // 如果压缩后的图片大小在指定范围内，则返回该图片
            if ((blob === null || blob === void 0 ? void 0 : blob.size) <= maxSize && (blob === null || blob === void 0 ? void 0 : blob.size) >= minsize) {
                resolve(newFile);
            }
            else {
                // 根据图片大小调整压缩质量
                if ((blob === null || blob === void 0 ? void 0 : blob.size) < minsize) {
                    quality += 0.05;
                }
                else {
                    quality -= 0.02;
                }
                // 如果压缩质量小于0.05，则返回当前图片
                if (quality < 0.05 || quality > 0.95) {
                    resolve(newFile);
                }
                else {
                    //@ts-ignore
                    canvas.toBlob(checkSize, 'image/jpeg', quality);
                }
            }
        };
        //@ts-ignore
        canvas.toBlob(checkSize, 'image/jpeg', quality);
    }));
}
