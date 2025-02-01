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
import { FileToImageFn, processImage } from '../utils/index.js';
/**
 * 将彩色图片转换为灰度图片，并返回处理后的图片文件
 * @param {File} file - 要处理的图片文件
 * @returns {Promise<Blob>} - 处理后的灰度图片文件
 */
export function convertToGrayscale(file) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const { img, error } = yield FileToImageFn(file);
        if (error) {
            reject(error);
            return;
        }
        ;
        if (!img) {
            reject(new Error('无法获取Image对象'));
            return;
        }
        const { canvas, ctx } = processImage(img);
        ctx.drawImage(img, 0, 0);
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg; // 红色通道
            data[i + 1] = avg; // 绿色通道
            data[i + 2] = avg; // 蓝色通道
        }
        ctx.putImageData(imageData, 0, 0);
        canvas.toBlob((blob) => {
            if (!blob) {
                reject(new Error('无法将Canvas转换为Blob'));
                return;
            }
            const newFile = new File([blob], file.name, { type: file.type });
            resolve(newFile);
        }, file.type);
    }));
}
