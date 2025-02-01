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
 * 根据原始宽高生成文件
 * @param {File} file - 要处理的图片文件
 * @returns {Promise<Blob>} - 处理后的图片文件
 */
export function generateFileWithOriginWH(file) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        //根据百分比计算最大数值
        const { img, error } = yield FileToImageFn(file);
        if (error) {
            reject(error);
            return;
        }
        if (!img) {
            reject(new Error('无法获取Image对象'));
            return;
        }
        const { canvas, ctx } = processImage(img);
        ctx.drawImage(img, 0, 0, img.width, img.height);
        //@ts-ignore
        canvas.toBlob((blob) => {
            const newFile = new File([blob], file.name, { type: file.type });
            resolve(newFile);
        }, 'image/jpeg', 0.7);
    }));
}
