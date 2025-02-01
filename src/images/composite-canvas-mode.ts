
import { FileToImageFn, processImage } from '../utils/index.ts';

/**
* 使用指定的混合模式和填充样式处理图片，并返回处理后的图片文件
* @param {File} file - 要处理的图片文件
* @param {string} mode - 混合模式，如'source-over', 'multiply', 'screen'等
* @param {string} style - 填充样式，默认为'rgba(128,128,128,1)'，即灰色
* @returns {Promise<File>} - 处理后的图片文件
*/

export type IMode = 'source-over' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity';
export function compositeCanvasMode(file: File, mode: IMode, style = 'rgba(128,128,128,1)'): Promise<File> {
  return new Promise(async (resolve, reject) => {
    const { img, error } = await FileToImageFn(file);
    if (error) {
      reject(error);
      return;
    };
    if (!img) {
      reject(new Error('无法获取Image对象'));
      return;
    }
    const { canvas, ctx } = processImage(img);
    ctx.drawImage(img, 0, 0);

    // 设置混合模式
    ctx.globalCompositeOperation = mode;
    ctx.fillStyle = style; // 默认灰色
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob: Blob | null) => {
      if (!blob) {
        reject(new Error('无法将Canvas转换为Blob'));
        return;
      }
      const newFile = new File([blob], file.name, { type: file.type });
      resolve(newFile);
    }, file.type);
  })
}