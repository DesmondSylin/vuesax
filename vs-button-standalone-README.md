# VsButton 獨立版本使用指南

> 無需 Vue.js，純 HTML + CSS + JS 即可使用的 VsButton 元件

## 📦 檔案說明

- **`vs-button.css`** - 必需的樣式檔案（約 20KB）
- **`vs-button.js`** - 可選的 JavaScript 檔案（用於 ripple 效果）
- **`vs-button-demo.html`** - 完整使用範例和文檔
- **`vs-button-standalone-README.md`** - 本說明文件

## 🚀 快速開始

### 1. 引入檔案

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <!-- Material Icons（如需使用圖示） -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

  <!-- VsButton CSS（必需） -->
  <link rel="stylesheet" href="vs-button.css">
</head>
<body>
  <!-- 你的內容 -->

  <!-- VsButton JS（可選，用於 ripple 效果） -->
  <script src="vs-button.js"></script>
</body>
</html>
```

### 2. 創建按鈕

```html
<!-- 基本按鈕 -->
<button class="vs-button vs-button-filled vs-button-primary">
  點擊我
</button>

<!-- 邊框按鈕 -->
<button class="vs-button vs-button-border vs-button-success">
  成功
</button>

<!-- 漸層按鈕 -->
<button class="vs-button vs-button-gradient vs-button-danger">
  危險
</button>
```

## 📖 完整文檔

### Class 命名規則

VsButton 使用 BEM 命名規則的變體，組合不同的 class 來創建各種樣式：

```
.vs-button                    # 基礎 class（必需）
.vs-button-{type}            # 按鈕類型
.vs-button-{color}           # 按鈕顏色
.vs-button-{size}            # 按鈕尺寸
.vs-button-{modifier}        # 修飾符
```

### 按鈕類型

| Class | 說明 | 範例 |
|-------|------|------|
| `vs-button-filled` | 填滿按鈕（預設） | ![filled](https://img.shields.io/badge/-filled-blue) |
| `vs-button-border` | 邊框按鈕 | ![border](https://img.shields.io/badge/-border-white?style=flat&logo=appveyor) |
| `vs-button-flat` | 扁平按鈕 | ![flat](https://img.shields.io/badge/-flat-lightgrey) |
| `vs-button-line` | 線條按鈕 | ![line](https://img.shields.io/badge/-line-green) |
| `vs-button-gradient` | 漸層按鈕 | ![gradient](https://img.shields.io/badge/-gradient-blueviolet) |
| `vs-button-relief` | 浮雕按鈕 | ![relief](https://img.shields.io/badge/-relief-orange) |

### 顏色選項

| Class | 說明 | 色值 |
|-------|------|------|
| `vs-button-primary` | 主要色 | rgb(25, 91, 255) |
| `vs-button-secondary` | 次要色 | rgb(155, 155, 155) |
| `vs-button-success` | 成功色 | rgb(70, 201, 58) |
| `vs-button-danger` | 危險色 | rgb(242, 19, 93) |
| `vs-button-warning` | 警告色 | rgb(255, 186, 0) |
| `vs-button-dark` | 深色 | rgb(36, 33, 69) |
| `vs-button-light` | 淺色 | rgb(240, 240, 240) |

### 尺寸選項

| Class | 說明 |
|-------|------|
| `vs-button-large` | 大型按鈕 |
| （預設） | 標準尺寸 |
| `vs-button-small` | 小型按鈕 |

### 修飾符

| Class | 說明 |
|-------|------|
| `vs-button-radius` | 圓形按鈕 |
| `vs-button-icon-only` | 僅圖示按鈕 |
| `vs-button-block` | 全寬按鈕 |
| `vs-button-loading` | 載入狀態 |
| `vs-button-shadow` | 添加陰影 |
| `vs-button-uppercase` | 文字大寫 |

### 線條按鈕專用

| Class | 說明 |
|-------|------|
| `vs-button-line-left` | 線條從左展開 |
| `vs-button-line-right` | 線條從右展開 |
| `vs-button-line-top` | 線條在頂部 |

## 💡 使用範例

### 基本類型

```html
<!-- Filled -->
<button class="vs-button vs-button-filled vs-button-primary">
  Primary Button
</button>

<!-- Border -->
<button class="vs-button vs-button-border vs-button-success">
  Success Button
</button>

<!-- Flat -->
<button class="vs-button vs-button-flat vs-button-danger">
  Danger Button
</button>

<!-- Line -->
<button class="vs-button vs-button-line vs-button-warning">
  Warning Button
</button>

<!-- Gradient -->
<button class="vs-button vs-button-gradient vs-button-primary">
  Gradient Button
</button>

<!-- Relief -->
<button class="vs-button vs-button-relief vs-button-dark">
  Relief Button
</button>
```

### 帶圖示的按鈕

```html
<!-- 圖示在前 -->
<button class="vs-button vs-button-filled vs-button-primary">
  <span class="vs-button__icon material-icons">home</span>
  <span class="vs-button__content">首頁</span>
</button>

<!-- 僅圖示 -->
<button class="vs-button vs-button-filled vs-button-primary vs-button-icon-only">
  <span class="material-icons">add</span>
</button>

<!-- 圓形圖示按鈕 -->
<button class="vs-button vs-button-filled vs-button-success vs-button-radius">
  <span class="material-icons">check</span>
</button>
```

### 尺寸變化

```html
<button class="vs-button vs-button-filled vs-button-primary vs-button-large">
  Large Button
</button>

<button class="vs-button vs-button-filled vs-button-primary">
  Default Button
</button>

<button class="vs-button vs-button-filled vs-button-primary vs-button-small">
  Small Button
</button>
```

### 線條按鈕變化

```html
<!-- 線條從中心展開（預設） -->
<button class="vs-button vs-button-line vs-button-primary">
  Center Line
</button>

<!-- 線條從左展開 -->
<button class="vs-button vs-button-line vs-button-line-left vs-button-success">
  Left Line
</button>

<!-- 線條從右展開 -->
<button class="vs-button vs-button-line vs-button-line-right vs-button-danger">
  Right Line
</button>

<!-- 線條在頂部 -->
<button class="vs-button vs-button-line vs-button-line-top vs-button-warning">
  Top Line
</button>
```

### 按鈕群組

```html
<div class="vs-button-group">
  <button class="vs-button vs-button-filled vs-button-primary">左</button>
  <button class="vs-button vs-button-filled vs-button-primary">中</button>
  <button class="vs-button vs-button-filled vs-button-primary">右</button>
</div>
```

### 全寬按鈕

```html
<button class="vs-button vs-button-filled vs-button-primary vs-button-block">
  全寬按鈕
</button>
```

### 載入狀態

```html
<button class="vs-button vs-button-filled vs-button-primary vs-button-loading">
  載入中...
</button>
```

### 停用狀態

```html
<button class="vs-button vs-button-filled vs-button-primary" disabled>
  停用按鈕
</button>
```

## 🎨 自訂顏色主題

### 方法 1：修改 CSS 變數

在你的 CSS 檔案中覆蓋預設變數：

```css
:root {
  --vs-primary: 0, 123, 255;        /* 藍色 */
  --vs-success: 40, 167, 69;        /* 綠色 */
  --vs-danger: 220, 53, 69;         /* 紅色 */
  --vs-warning: 255, 193, 7;        /* 黃色 */
  --vs-dark: 52, 58, 64;            /* 深灰色 */
  --vs-light: 248, 249, 250;        /* 淺灰色 */
}
```

**注意：** 顏色值使用 RGB 格式，以逗號分隔（不含 `rgb()` 包裝）。

### 方法 2：使用內聯樣式

```html
<button
  class="vs-button vs-button-filled"
  style="background: #7d33ff; color: white;"
>
  自訂顏色
</button>
```

### 方法 3：創建自訂 Class

```css
/* 在你的 CSS 檔案中 */
.vs-button-custom {
  --custom-color: 125, 51, 255;
}

.vs-button-custom.vs-button-filled {
  background: rgb(var(--custom-color));
}

.vs-button-custom.vs-button-border {
  border: 1px solid rgb(var(--custom-color));
  color: rgb(var(--custom-color));
}
```

```html
<button class="vs-button vs-button-filled vs-button-custom">
  自訂主題按鈕
</button>
```

## 📱 響應式設計

### 行動裝置專用 Class

```html
<!-- 在行動裝置上顯示為全寬 -->
<button class="vs-button vs-button-filled vs-button-primary vs-button-mobile-block">
  按鈕
</button>

<!-- 在行動裝置上變小 -->
<button class="vs-button vs-button-filled vs-button-primary vs-button-mobile-small">
  按鈕
</button>
```

### 媒體查詢斷點

- 行動裝置：`@media (max-width: 768px)`
- 深色模式：`@media (prefers-color-scheme: dark)`

## ⚡ JavaScript API

### 自動初始化

引入 `vs-button.js` 後，所有 `.vs-button` 元素會自動初始化 ripple 效果。

```html
<script src="vs-button.js"></script>
```

### 手動初始化

```javascript
// 初始化特定按鈕
const button = document.querySelector('#myButton');
VsButton.init(button);

// 使用選擇器
VsButton.init('#myButton');

// 批量初始化
VsButton.autoInit();
```

### 控制載入狀態

```javascript
// 開啟載入狀態
VsButton.setLoading('#myButton', true);

// 關閉載入狀態
VsButton.setLoading('#myButton', false);

// 使用元素
const button = document.querySelector('#myButton');
VsButton.setLoading(button, true);
```

### 切換狀態

```javascript
// 添加自訂狀態
VsButton.toggleState('#myButton', true, 'vs-button-active');

// 移除自訂狀態
VsButton.toggleState('#myButton', false, 'vs-button-active');
```

### 實際範例

```javascript
// 提交表單範例
const submitBtn = document.querySelector('#submitBtn');

submitBtn.addEventListener('click', async () => {
  // 開始載入
  VsButton.setLoading(submitBtn, true);

  try {
    // 執行非同步操作
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      alert('提交成功！');
    }
  } catch (error) {
    alert('提交失敗：' + error.message);
  } finally {
    // 結束載入
    VsButton.setLoading(submitBtn, false);
  }
});
```

## 🎭 動畫效果

### 內建動畫

1. **Ripple Effect（漣漪效果）**
   - 自動應用於 filled、border、flat 類型
   - 需要引入 `vs-button.js`

2. **Hover Effects（懸停效果）**
   - 所有按鈕類型都有懸停動畫
   - 純 CSS 實現，無需 JavaScript

3. **Active States（激活狀態）**
   - 點擊時的視覺反饋
   - 包含縮放和陰影變化

### 停用動畫

```css
/* 停用所有過渡動畫 */
.vs-button {
  transition: none !important;
}

/* 停用特定按鈕的動畫 */
.no-animation.vs-button {
  transition: none !important;
}
```

## 🔧 進階自訂

### 修改邊框半徑

```css
:root {
  --vs-radio: 8px;  /* 預設為 6px */
}

/* 或針對特定按鈕 */
.my-button {
  border-radius: 20px;
}
```

### 修改停用不透明度

```css
:root {
  --vs-disabled-opacity: 0.3;  /* 預設為 0.5 */
}
```

### 修改過渡時間

```css
:root {
  --vs-transition: all 0.3s ease;  /* 預設為 0.25s */
}
```

### 自訂陰影

```html
<button class="vs-button vs-button-filled vs-button-primary vs-button-shadow">
  帶陰影的按鈕
</button>
```

```css
/* 自訂陰影樣式 */
.vs-button-shadow {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
```

## 🌐 瀏覽器支援

- ✅ Chrome (最新版本)
- ✅ Firefox (最新版本)
- ✅ Safari (最新版本)
- ✅ Edge (最新版本)
- ✅ Opera (最新版本)
- ⚠️ IE11（部分支援，需要 polyfill）

### IE11 支援

對於 IE11，需要添加以下 polyfills：

```html
<!-- CSS Variables Polyfill -->
<script src="https://cdn.jsdelivr.net/npm/css-vars-ponyfill@2"></script>

<!-- 在 IE11 中初始化 -->
<script>
  if (window.navigator.userAgent.indexOf('Trident/') > -1) {
    cssVars();
  }
</script>
```

## 📦 CDN 使用

如果不想下載檔案，可以使用 CDN（需要自行托管或使用 jsDelivr、unpkg 等服務）：

```html
<!-- 使用 jsDelivr -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/你的用戶名/vs-button/vs-button.css">
<script src="https://cdn.jsdelivr.net/gh/你的用戶名/vs-button/vs-button.js"></script>
```

## ⚡ 性能優化

### 1. 只載入需要的樣式

如果只使用特定類型的按鈕，可以從 CSS 中移除不需要的樣式。

### 2. 延遲載入 JavaScript

```html
<script src="vs-button.js" defer></script>
```

### 3. 壓縮檔案

使用 CSS 和 JS 壓縮工具來減少檔案大小：

```bash
# 使用 cssnano
npx cssnano vs-button.css vs-button.min.css

# 使用 terser
npx terser vs-button.js -o vs-button.min.js
```

## 🐛 疑難排解

### Q: 按鈕沒有樣式？
A: 確認已正確引入 `vs-button.css` 檔案，並檢查 class 名稱是否正確。

### Q: Ripple 效果不工作？
A: 確認已引入 `vs-button.js` 檔案，且檔案載入順序正確（應在 HTML 內容之後）。

### Q: 圖示沒有顯示？
A: 確認已引入 Material Icons 字體，或使用其他圖示字體庫。

### Q: 顏色沒有變化？
A: 確認同時使用了類型 class 和顏色 class，例如 `vs-button-filled vs-button-primary`。

### Q: 在 IE11 中樣式異常？
A: IE11 不支援 CSS 變數，需要使用 polyfill 或直接使用固定顏色值。

## 📄 授權

MIT License - 與原 Vuesax 專案相同

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📚 相關資源

- [Material Icons](https://fonts.google.com/icons)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [原版 Vuesax](https://vuesax.com/)

---

**開發者：** Based on Vuesax by Luis Daniel Rovira
**獨立版本：** Pure HTML + CSS + JS
**版本：** 1.0.0
