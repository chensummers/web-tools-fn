# 更新日志

## [1.0.1] - 2025-01-27
### 新增
- 添加了 `convertToGrayscale` 函数，用于将彩色图片转换为灰度图片。
- 添加了 `compositeCanvasMode` 函数，用于使用指定的混合模式和填充样式处理图片。
- 添加了 `FileToImageFn` 函数，用于从文件创建一个新的 Image 对象。
- 添加了 `generateFileWithOriginWH` 函数，用于根据原始宽高生成文件。
- 添加了 `formatDate` 函数，用于处理日期格式。
- 添加了 `DateTools` 函数，用于处理相对日期格式。
- 添加了 `diffDate` 函数，用于获取两日期差值对象。

### 优化
- 优化了 `convertToGrayscale` 和 `compositeCanvasMode` 函数，将重复的代码抽离到单独的函数中，提高了代码的可读性和可维护性。

### 修复
- 修复了 `canvas.toBlob` 方法的回调函数 `checkSize` 的参数类型与 `BlobCallback` 类型不兼容的问题。

## [1.0.0] - 2025-01-26
### 新增
- 项目创建。

---

## 如何贡献

如果你发现了任何问题或有改进建议，欢迎提交 Issue 或 Pull Request。

## 许可证

本项目采用 [ISC 许可证](LICENSE)。
