<template>
  <div class="button-examples">
    <h1>VsButton Vue 3 元件使用範例</h1>

    <!-- Basic buttons -->
    <section>
      <h2>基本按鈕類型</h2>
      <div class="button-group">
        <VsButton type="filled" color="primary">Filled Button</VsButton>
        <VsButton type="border" color="primary">Border Button</VsButton>
        <VsButton type="flat" color="primary">Flat Button</VsButton>
        <VsButton type="line" color="primary">Line Button</VsButton>
        <VsButton type="gradient" color="primary">Gradient Button</VsButton>
        <VsButton type="relief" color="primary">Relief Button</VsButton>
      </div>
    </section>

    <!-- Color variations -->
    <section>
      <h2>顏色變化</h2>
      <div class="button-group">
        <VsButton color="primary">Primary</VsButton>
        <VsButton color="success">Success</VsButton>
        <VsButton color="danger">Danger</VsButton>
        <VsButton color="warning">Warning</VsButton>
        <VsButton color="dark">Dark</VsButton>
        <VsButton color="light" text-color="#000">Light</VsButton>
      </div>
    </section>

    <!-- Sizes -->
    <section>
      <h2>尺寸變化</h2>
      <div class="button-group">
        <VsButton size="large">Large Button</VsButton>
        <VsButton>Default Button</VsButton>
        <VsButton size="small">Small Button</VsButton>
        <VsButton size="40px">40px Button</VsButton>
      </div>
    </section>

    <!-- With icons -->
    <section>
      <h2>帶圖示的按鈕</h2>
      <div class="button-group">
        <VsButton icon="home">Home</VsButton>
        <VsButton icon="favorite">Like</VsButton>
        <VsButton icon="favorite" :icon-after="true">Like After</VsButton>
        <VsButton icon="delete" color="danger" />
        <VsButton icon="settings" :radius="true" />
      </div>
    </section>

    <!-- Border type variations -->
    <section>
      <h2>邊框類型</h2>
      <div class="button-group">
        <VsButton type="border" color="primary">Border</VsButton>
        <VsButton type="border" color="success">Border Success</VsButton>
        <VsButton type="border" color="danger">Border Danger</VsButton>
        <VsButton type="flat" color="warning">Flat Warning</VsButton>
      </div>
    </section>

    <!-- Line type variations -->
    <section>
      <h2>線條類型</h2>
      <div class="button-group">
        <VsButton type="line" line-origin="center">Line Center</VsButton>
        <VsButton type="line" line-origin="left">Line Left</VsButton>
        <VsButton type="line" line-origin="right">Line Right</VsButton>
        <VsButton type="line" line-position="top">Line Top</VsButton>
      </div>
    </section>

    <!-- Gradient type variations -->
    <section>
      <h2>漸層類型</h2>
      <div class="button-group">
        <VsButton
          type="gradient"
          color="primary"
          gradient-color-secondary="success"
        >
          Primary to Success
        </VsButton>
        <VsButton
          type="gradient"
          color="danger"
          gradient-color-secondary="warning"
        >
          Danger to Warning
        </VsButton>
        <VsButton
          type="gradient"
          color="#7d33ff"
          gradient-color-secondary="#ff3d9a"
          gradient-direction="45deg"
        >
          Custom Colors
        </VsButton>
      </div>
    </section>

    <!-- Custom colors -->
    <section>
      <h2>自訂顏色</h2>
      <div class="button-group">
        <VsButton color="#7d33ff">Custom Hex</VsButton>
        <VsButton color="rgb(255, 61, 154)">Custom RGB</VsButton>
        <VsButton
          type="border"
          color="#7d33ff"
          text-color="#7d33ff"
        >
          Custom Border
        </VsButton>
      </div>
    </section>

    <!-- Interactive examples -->
    <section>
      <h2>互動範例</h2>
      <div class="button-group">
        <VsButton @click="handleClick">Click Event</VsButton>
        <VsButton href="https://github.com">Link Button</VsButton>
        <VsButton href="https://github.com" target="_blank">Open in New Tab</VsButton>
        <VsButton :disabled="true">Disabled Button</VsButton>
      </div>
      <p v-if="clickCount > 0">按鈕被點擊了 {{ clickCount }} 次</p>
    </section>

    <!-- Icon only buttons -->
    <section>
      <h2>僅圖示按鈕</h2>
      <div class="button-group">
        <VsButton icon="add" color="primary" />
        <VsButton icon="edit" color="success" />
        <VsButton icon="delete" color="danger" />
        <VsButton icon="search" type="border" color="primary" />
        <VsButton icon="settings" :radius="true" size="large" />
      </div>
    </section>

    <!-- Relief type -->
    <section>
      <h2>浮雕類型</h2>
      <div class="button-group">
        <VsButton type="relief" color="primary">Relief Primary</VsButton>
        <VsButton type="relief" color="success">Relief Success</VsButton>
        <VsButton type="relief" color="danger">Relief Danger</VsButton>
        <VsButton type="relief" color="dark">Relief Dark</VsButton>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VsButton from './VsButton.vue'

const clickCount = ref(0)

const handleClick = () => {
  clickCount.value++
  console.log('Button clicked!', clickCount.value)
}
</script>

<style scoped>
.button-examples {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
  margin-bottom: 40px;
  text-align: center;
}

section {
  margin-bottom: 50px;
}

h2 {
  color: #555;
  margin-bottom: 20px;
  font-size: 1.5em;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
}

p {
  margin-top: 15px;
  color: #666;
  font-size: 1.1em;
}

/* CSS Variables for theme colors */
:global(:root) {
  --vs-primary: rgb(25, 91, 255);
  --vs-primary-rgb: 25, 91, 255;
  --vs-secondary: rgb(155, 155, 155);
  --vs-secondary-rgb: 155, 155, 155;
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
</style>
