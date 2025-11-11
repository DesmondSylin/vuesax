# VsButton Vue 3 重構版本

這是 Vuesax Button 元件的 Vue 3 Composition API 重構版本，使用 SCSS 樣式並整合為單一 `.vue` 檔案。

## 📦 檔案說明

- `VsButton.vue` - 主要元件檔案（Vue 3 Composition API + SCSS）
- `VsButtonExample.vue` - 完整使用範例
- `VsButton-README.md` - 本說明文件

## ✨ 主要改動

### 1. **Vue 3 Composition API**
- 從 Vue 2 Options API 轉換為 Vue 3 Composition API
- 使用 `<script setup>` 語法
- 使用 `ref`、`computed`、`nextTick` 等組合式函數
- 更好的類型推斷和程式碼組織

### 2. **SCSS 替代 Stylus**
- 將所有 Stylus 樣式轉換為 SCSS
- 保持相同的視覺效果和動畫
- 使用 SCSS 的現代語法特性（`@each`、`@if` 等）

### 3. **單一檔案元件**
- 整合 template、script 和 style 到單一 `.vue` 檔案
- 更易於維護和分享
- 減少檔案依賴關係

### 4. **內建色彩工具函式**
- 將 `color.js` 的功能整合到元件內部
- `hexToRgb()` - 將十六進位色碼轉為 RGB
- `getColor()` - 處理各種顏色格式
- `darken()` - 顏色變暗處理
- `isColor()` - 檢查是否為預設主題色

### 5. **移除外部依賴**
- 不再依賴 `vsIcon` 元件，改用原生 Material Icons
- 移除對全域 `$vs` 物件的依賴
- RTL 支援改為通過 props 傳入

## 🚀 安裝與使用

### 基本使用

```vue
<template>
  <VsButton color="primary">點擊我</VsButton>
</template>

<script setup>
import VsButton from './VsButton.vue'
</script>
```

### 使用 Vue Router

```vue
<template>
  <VsButton to="/home">前往首頁</VsButton>
</template>

<script setup>
import VsButton from './VsButton.vue'
</script>
```

**注意：** 需要在應用程式中設定 Vue Router

## 📖 Props API

| Prop | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `type` | `String` | `'filled'` | 按鈕類型：`filled`、`border`、`flat`、`line`、`gradient`、`relief` |
| `color` | `String` | `'primary'` | 按鈕顏色：`primary`、`success`、`danger`、`warning`、`dark`、`light` 或任何 CSS 顏色值 |
| `textColor` | `String` | `null` | 文字顏色（覆蓋預設） |
| `size` | `String` | `null` | 尺寸：`large`、`small` 或 CSS 尺寸值（如 `'40px'`） |
| `icon` | `String` | `null` | Material Icon 圖示名稱 |
| `iconPack` | `String` | `'material-icons'` | 圖示字體包類別名稱 |
| `iconAfter` | `Boolean` | `false` | 圖示是否顯示在文字後方 |
| `radius` | `Boolean` | `false` | 是否為圓形按鈕 |
| `to` | `String\|Object` | `null` | Vue Router 路由路徑 |
| `href` | `String\|Object` | `null` | 連結 URL |
| `target` | `Boolean\|String` | `false` | 是否在新視窗開啟連結 |
| `button` | `String` | `'button'` | HTML button type 屬性 |
| `rtl` | `Boolean` | `false` | 是否啟用從右到左佈局 |
| `lineOrigin` | `String` | `'center'` | 線條動畫起點：`center`、`left`、`right`（僅 `type="line"` 有效） |
| `linePosition` | `String` | `'bottom'` | 線條位置：`top`、`bottom`（僅 `type="line"` 有效） |
| `gradientDirection` | `String` | `'30deg'` | 漸層方向（僅 `type="gradient"` 有效） |
| `gradientColorSecondary` | `String` | `'primary'` | 漸層第二色（僅 `type="gradient"` 有效） |

## 🎯 Events

| Event | 參數 | 說明 |
|-------|------|------|
| `click` | `event` | 按鈕點擊事件 |
| `blur` | `event` | 按鈕失焦事件 |
| `mouseover` | `event` | 滑鼠移入事件 |
| `mouseout` | `event` | 滑鼠移出事件 |
| `routeErr` | `error` | 路由錯誤事件 |

## 💡 使用範例

### 按鈕類型

```vue
<!-- Filled 填滿 -->
<VsButton type="filled" color="primary">Filled Button</VsButton>

<!-- Border 邊框 -->
<VsButton type="border" color="success">Border Button</VsButton>

<!-- Flat 扁平 -->
<VsButton type="flat" color="danger">Flat Button</VsButton>

<!-- Line 線條 -->
<VsButton type="line" color="warning">Line Button</VsButton>

<!-- Gradient 漸層 -->
<VsButton type="gradient" color="primary">Gradient Button</VsButton>

<!-- Relief 浮雕 -->
<VsButton type="relief" color="dark">Relief Button</VsButton>
```

### 顏色變化

```vue
<!-- 使用預設主題色 -->
<VsButton color="primary">Primary</VsButton>
<VsButton color="success">Success</VsButton>
<VsButton color="danger">Danger</VsButton>

<!-- 使用自訂顏色 -->
<VsButton color="#7d33ff">Custom Hex</VsButton>
<VsButton color="rgb(255, 61, 154)">Custom RGB</VsButton>
```

### 尺寸

```vue
<VsButton size="large">Large</VsButton>
<VsButton>Default</VsButton>
<VsButton size="small">Small</VsButton>
<VsButton size="50px">Custom Size</VsButton>
```

### 帶圖示

```vue
<!-- 圖示在前 -->
<VsButton icon="home">Home</VsButton>

<!-- 圖示在後 -->
<VsButton icon="arrow_forward" :icon-after="true">Next</VsButton>

<!-- 僅圖示 -->
<VsButton icon="favorite" color="danger" />

<!-- 圓形圖示按鈕 -->
<VsButton icon="add" :radius="true" />
```

### 漸層按鈕

```vue
<VsButton
  type="gradient"
  color="primary"
  gradient-color-secondary="success"
  gradient-direction="45deg"
>
  Primary to Success
</VsButton>

<VsButton
  type="gradient"
  color="#7d33ff"
  gradient-color-secondary="#ff3d9a"
>
  Custom Gradient
</VsButton>
```

### 線條按鈕

```vue
<!-- 線條從中心展開 -->
<VsButton type="line" line-origin="center">Center Line</VsButton>

<!-- 線條從左展開 -->
<VsButton type="line" line-origin="left">Left Line</VsButton>

<!-- 線條在頂部 -->
<VsButton type="line" line-position="top">Top Line</VsButton>
```

### 事件處理

```vue
<template>
  <VsButton @click="handleClick">
    點擊次數：{{ count }}
  </VsButton>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

const handleClick = (event) => {
  count.value++
  console.log('Clicked!', event)
}
</script>
```

### 路由與連結

```vue
<!-- Vue Router 路由 -->
<VsButton to="/about">關於我們</VsButton>
<VsButton :to="{ name: 'user', params: { id: 123 }}">使用者</VsButton>

<!-- 外部連結 -->
<VsButton href="https://github.com">GitHub</VsButton>

<!-- 新視窗開啟 -->
<VsButton href="https://github.com" target="_blank">
  在新視窗開啟
</VsButton>
```

### 停用狀態

```vue
<VsButton :disabled="true">停用按鈕</VsButton>
<VsButton :disabled="isLoading">
  {{ isLoading ? '載入中...' : '提交' }}
</VsButton>
```

## 🎨 CSS 變數設定

在全域樣式中定義主題色：

```css
:root {
  --vs-primary: rgb(25, 91, 255);
  --vs-primary-rgb: 25, 91, 255;
  --vs-success: rgb(70, 201, 58);
  --vs-success-rgb: 70, 201, 58;
  --vs-danger: rgb(242, 19, 93);
  --vs-danger-rgb: 242, 19, 93;
  --vs-warning: rgb(255, 186, 0);
  --vs-warning-rgb: 255, 186, 0;
  --vs-dark: rgb(36, 33, 69);
  --vs-dark-rgb: 36, 33, 69;
  --vs-light: rgb(240, 240, 240);
  --vs-light-rgb: 240, 240, 240;
}
```

## 🔧 Material Icons 設定

在 HTML 中加入 Material Icons 字體：

```html
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet"
>
```

或使用 npm：

```bash
npm install material-icons
```

```js
import 'material-icons/iconfont/material-icons.css'
```

## ⚠️ 注意事項

1. **Vue Router 依賴**：如果使用 `to` prop，需要在應用程式中安裝並配置 Vue Router
2. **Material Icons**：需要載入 Material Icons 字體才能顯示圖示
3. **瀏覽器支援**：支援所有現代瀏覽器（Chrome、Firefox、Safari、Edge）
4. **CSS 變數**：確保在全域樣式中定義 CSS 變數以使用主題色

## 🆚 與原版的差異

### 優點
- ✅ Vue 3 Composition API，更現代化
- ✅ 使用 SCSS，更主流的樣式語言
- ✅ 單一檔案元件，更易維護
- ✅ 更好的 TypeScript 支援
- ✅ 減少外部依賴
- ✅ 更清晰的程式碼結構

### 限制
- ⚠️ 不再依賴全域 `$vs` 物件
- ⚠️ 需要手動載入 Material Icons
- ⚠️ RTL 需要通過 props 傳入
- ⚠️ 不使用 vsIcon 元件（改用原生方式）

## 📝 授權

MIT License - 與原 Vuesax 專案相同

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

---

**原作者：** Luis Daniel Rovira (ldrovira)
**重構版本：** Vue 3 + Composition API + SCSS
