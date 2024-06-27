/*
 * @Description:
 * @Author: Bit 6141364@qq.com
 * @Date: 2023-08-07 15:15:15
 * @LastEditors: Bit 6141364@qq.com
 * @LastEditTime: 2023-08-24 09:31:48
 * @FilePath: /zr_szhpt_web/typings/FingerPrint.d.ts
 */
type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

declare namespace fingerPrint {
  interface config {
    size?: string; // 字体大小
    color?: Color; // 颜色
    id?: string; // 创建的dom ID
    text: string; // 文本内容
    angle?: number; // 旋转角度（逆时针）
    wordSpac?: number; // 字间距
    density?: number; // 指纹行间距
    opacity?: number; // 指纹透明度 0-1
    supportTip?: string; // 不支持canvas时，提示文字
  }
}
