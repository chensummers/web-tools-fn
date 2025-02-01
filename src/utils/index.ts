
/**
 * 创建一个新的canvas元素，并设置其宽度和高度与图片相同
 * @param {HTMLImageElement} img - 要处理的图片元素
 * @returns {HTMLCanvasElement} - 创建的canvas元素
 */
type ICanvas = {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  }
  export function processImage(img: HTMLImageElement): ICanvas {
    // 创建一个新的canvas元素，用于绘制图片
    const canvas = document.createElement('canvas');
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    // 设置canvas的宽度和高度与图片相同
    canvas.width = img.width;
    canvas.height = img.height;
  
    if (!ctx) {
      throw new Error('无法获取CanvasRenderingContext2D');
    }
    return { canvas, ctx };
  }
  
  
  /**
   * 将File对象转换为Image对象，并返回一个Promise，该Promise在图片加载完成后解析为该Image对象
   * @param {File} file - 要处理的图片文件
   * @returns {Promise<IFileToImageFn>} - 加载完成的Image对象的Promise
   */
  type IFileToImageFn = {
    img?: HTMLImageElement,
    error?: any
  }
  export function FileToImageFn(file: File): Promise<IFileToImageFn> {
  
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = new Image();
        img.src = event?.target?.result as string;
        // 创建一个新的Image对象，用于加载图片
        // 当图片加载成功时触发的事件处理函数
        img.onload = function () {
          resolve({ img });
        };
        img.onerror = function (error) {
          resolve({ error });
        }
      };
      reader.onerror = function (error) {
        resolve({ error });
      }
      // 读取文件内容为DataURL格式
      reader.readAsDataURL(file);
    })
  }

/**
 * 将文件大小（以字节为单位）格式化为人类可读的字符串。
 * @param {number} sizeInBytes - 要格式化的文件大小，以字节为单位。
 * @param {number} [decimals=2] - 可选的小数位数，用于格式化后的文件大小。默认为2。
 * @returns {string} 返回格式化后的文件大小字符串，包含单位（B、KB、MB、GB、TB）。
 */
export function getFileSize(sizeInBytes: number, decimals = 2) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let size = sizeInBytes||0;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return `${size.toFixed(decimals)} ${units[unitIndex]}`;
}