import { FileToImageFn } from '../utils/index.ts';
/**
 * 压缩图片并限制其文件大小
 * @param {File} file - 要压缩的图片文件
 * @param {number} maxSize - 大于1时，为图片的最大文件大小（字节）
 * @param {number} maxSize - 小于1大于0时，为图片最大文件大小百分比
 * @param {number} quality - 图片的压缩质量，默认为0.85
 * @returns {Promise<File>} - 压缩后的图片Blob对象
 */

export function compressImageWithFixedSize(file: File, maxSize: number, quality = 0.85): Promise<File> {
  return new Promise(async (resolve, reject) => {
    const { img, error } = await FileToImageFn(file);
    if (error) {
      reject(error);
      return;
    }
    if (!img) {
      reject(new Error('无法获取Image对象'));
      return;
    }
    if (maxSize < 1 && maxSize > 0) {
      maxSize = maxSize * file.size;
    }

    if (file.size <= maxSize) {
      resolve(file);
      return;
    }
    const canvas = document.createElement('canvas');
    let width = img.width;
    let height = img.height;

    // 计算初始压缩比例
    let ratio = (maxSize / file.size);
    if (ratio < 1) {
      width *= ratio;
      height *= ratio;
    }

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    ctx?.drawImage(img, 0, 0, width, height);

    const PERCENTAGE = 0.98;
    const minsize = maxSize * PERCENTAGE;
    const checkSize = (blob: Blob): any => {
      let newFile = new File([blob], file.name, { type: file.type });
      if (blob?.size <= maxSize && blob?.size >= minsize) {
        resolve(newFile);
      } else {
        if (blob?.size < minsize) {
          ratio += 0.005;
        }

        width = Math.ceil(img.width * ratio);
        height = Math.ceil(img.height * ratio);
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        //@ts-ignore
        canvas.toBlob(checkSize, 'image/jpeg', quality);
      }
    };
    //@ts-ignore
    canvas.toBlob(checkSize, 'image/jpeg', quality);
  });
}
