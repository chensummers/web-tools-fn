import { FileToImageFn, processImage } from '../utils/index.ts';

/**
 * 根据原始宽高生成文件
 * @param {File} file - 要处理的图片文件
 * @returns {Promise<Blob>} - 处理后的图片文件
 */
export function generateFileWithOriginWH(file: File): Promise<File> {

  return new Promise(async (resolve, reject) => {
    //根据百分比计算最大数值
    const { img, error } = await FileToImageFn(file);
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
    canvas.toBlob((blob: Blob) => {
      const newFile = new File([blob], file.name, { type: file.type });
      resolve(newFile);
    }, 'image/jpeg', 0.7);
  });
}
