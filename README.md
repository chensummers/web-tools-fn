# web-tools-fn

web-tools-fn 是一个包含多个实用工具函数的 npm 包，主要用于处理图片和图像压缩。

## 安装

使用 npm 安装 web-tools-fn：

```bash
npm install web-tools-fn
```
## 使用

### 图片处理
>- 图片灰度处理(非混合模式)
>- 图片灰度处理(混合模式)
>- 图片固定尺寸压缩
>- 图片固定数值压缩
>- 图片原图尺寸绘制
>- 详情见[IMAGES.README.MD](https://www.npmjs.com/package/web-tools-fn?activeTab=code)

````
// 引入
import {
  compositeCanvasMode,
  convertToGrayscale,
  generateFileWithOriginWH,
  compressImageWithFixedLength,
  compressImageWithFixedSize
}
from 'web-tools-fn/images'


// typescript 引入
import {
  compositeCanvasMode,
  convertToGrayscale,
  generateFileWithOriginWH,
  compressImageWithFixedLength,
  compressImageWithFixedSize
}
from 'web-tools-fn/images-types'
````

### 日期处理
>- 日期格式化
>- 相对日期文本格式化
>- diff日期
>- 详情见[DATE.README.MD](https://www.npmjs.com/package/web-tools-fn?activeTab=code)

````
// 引入
import {
  formatDate,
  DateTools,
  diffDate
}
from 'web-tools-fn/date'


// typescript 引入
import {
  formatDate,
  DateTools,
  diffDate
}
from 'web-tools-fn/date-types'
````
