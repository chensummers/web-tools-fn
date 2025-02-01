
## 图片处理
>- 图片灰度处理(非混合模式)
>- 图片灰度处理(混合模式)
>- 图片固定尺寸压缩
>- 图片固定数值压缩
>- 图片原图尺寸绘制

````
import {
  compositeCanvasMode,
  convertToGrayscale,
  generateFileWithOriginWH,
  compressImageWithFixedLength,
  compressImageWithFixedSize
}
from 'web-tools-fn/images'

or 

import {
  compositeCanvasMode,
  convertToGrayscale,
  generateFileWithOriginWH,
  compressImageWithFixedLength,
  compressImageWithFixedSize
}
from 'web-tools-fn/images-types'
````

### 图片灰度处理(非混合模式)
```
/**
 * 将彩色图片转换为灰度图片，并返回处理后的图片文件
 * @param {File} file - 要处理的图片文件
 * @returns {Promise<File>} - 处理后的灰度图片文件
 */

convertToGrayscale(file: File): Promise<File>
```

### 图片灰度处理(混合模式)
```
/**
 * 将彩色图片转换为灰度图片，并返回处理后的图片文件
 * @param {File} file - 要处理的图片文件
 * @returns {Promise<File>} - 处理后的灰度图片文件
 */

compositeCanvasMode(file: File): Promise<File>
```

### 图片固定尺寸压缩
```
/**
* 压缩图片并限制其尺寸和文件大小
* @param {File} file - 要压缩的图片文件
* @param {number} maxLength - 图片的最大边长(具体数值或者0-1百分比小数)(必填)
* @param {number} maxSize - 图片的最大文件大小(具体数值或者0-1百分比小数)(可选)
* @param {number} quality - 图片的压缩质量，默认为0.85 (可选)
* @returns {Promise<File>} - 压缩后的图片Blob对象
*/

compressImageWithFixedLength(file: File, maxLength: number, maxSize?: number, quality?: number): Promise<Blo   b>
```

### 图片固定数值压缩
```
/**
 * 压缩图片并限制其文件大小
 * @param {File} file - 要压缩的图片文件
 * @param {number} maxSize - 大于1时，为图片的最大文件大小（字节）
 * @param {number} maxSize - 小于1大于0时，为图片最大文件大小百分比
 * @param {number} quality - 图片的压缩质量，默认为0.85
 * @returns {Promise<File>} - 压缩后的图片Blob对象
 */

compressImageWithFixedSize(file: File, maxSize: number, quality?: number): Promise<File>
```
### 图片原图尺寸绘制
```
/**
 * 根据原始宽高生成文件
 * @param {File} file - 要处理的图片文件
 * @returns {Promise<File>} - 处理后的图片文件
 */

generateFileWithOriginWH(file: File): Promise<File>
```