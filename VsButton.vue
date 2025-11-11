<template>
  <button
    ref="btnRef"
    v-bind="$attrs"
    :class="buttonClasses"
    :style="buttonStyles"
    :type="button"
    class="vs-component vs-button"
    name="button"
    @click="handleClick"
    @blur="handleBlur"
    @mouseover="handleMouseover"
    @mouseout="handleMouseout"
  >
    <!-- Background ripple effect -->
    <span
      v-if="!isType('line') && !isType('gradient') && !isType('relief')"
      ref="backgroundRef"
      :style="backgroundStyles"
      class="vs-button-backgroundx vs-button--background"
    />

    <!-- Icon (before text) -->
    <span
      v-if="icon"
      :style="iconStyles"
      :class="['vs-button--icon', iconPack]"
      class="material-icons"
    >
      {{ icon }}
    </span>

    <!-- Button text/content -->
    <span
      v-if="$slots.default"
      class="vs-button-text vs-button--text"
    >
      <slot />
    </span>

    <!-- Line animation element -->
    <span
      ref="lineRef"
      :style="lineStyles"
      class="vs-button-linex"
    />
  </button>
</template>

<script setup>
import { ref, computed, nextTick, useAttrs, useSlots } from 'vue'
import { useRouter } from 'vue-router'

// Props definition
const props = defineProps({
  type: {
    type: String,
    default: 'filled',
    validator: (value) => ['filled', 'border', 'flat', 'line', 'gradient', 'relief'].includes(value)
  },
  color: {
    type: String,
    default: 'primary'
  },
  textColor: {
    type: String,
    default: null
  },
  lineOrigin: {
    type: String,
    default: 'center',
    validator: (value) => ['center', 'left', 'right'].includes(value)
  },
  linePosition: {
    type: String,
    default: 'bottom',
    validator: (value) => ['top', 'bottom'].includes(value)
  },
  gradientDirection: {
    type: String,
    default: '30deg'
  },
  gradientColorSecondary: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: null
  },
  icon: {
    type: String,
    default: null
  },
  iconPack: {
    type: String,
    default: 'material-icons'
  },
  iconAfter: {
    type: Boolean,
    default: false
  },
  radius: {
    type: Boolean,
    default: false
  },
  to: {
    type: [String, Object],
    default: null
  },
  href: {
    type: [String, Object],
    default: null
  },
  target: {
    type: [Boolean, String],
    default: false
  },
  button: {
    type: String,
    default: 'button'
  },
  rtl: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['click', 'blur', 'mouseover', 'mouseout', 'routeErr'])

// Composables
const router = useRouter?.() || null
const attrs = useAttrs()
const slots = useSlots()

// Template refs
const btnRef = ref(null)
const backgroundRef = ref(null)
const lineRef = ref(null)

// Reactive state
const isActive = ref(false)
const hoverx = ref(false)
const leftBackground = ref(20)
const topBackground = ref(20)
const radio = ref(0)
const time = ref(0.3)
const timeOpacity = ref(0.3)
const opacity = ref(1)

// Color utility functions
const hexToRgb = (hex) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

const getColor = (colorx, alphax = 1, defaultx = true) => {
  if (!colorx) return null

  // Handle hex colors
  if (/^[#]/.test(colorx)) {
    const c = hexToRgb(colorx)
    if (!c) return colorx

    return alphax === 1
      ? `rgb(${c.r},${c.g},${c.b})`
      : `rgba(${c.r},${c.g},${c.b},${alphax})`
  }

  // Handle rgba
  if (/^rgba/.test(colorx)) {
    if (colorx.search(/.([0-9]\))$/) === -1 && !defaultx) {
      return colorx.replace(/.?([0-9]\))$/, `${alphax})`)
    }
    return colorx
  }

  // Handle rgb
  if (/^rgb/.test(colorx)) {
    if (alphax !== 1) {
      colorx = colorx.replace(/^rgb/, 'rgba')
      colorx = colorx.replace(/\)$/, `,${alphax})`)
    }
    return colorx
  }

  // Handle color names (primary, secondary, etc.)
  const vsColors = ['primary', 'secondary', 'success', 'danger', 'warning', 'dark', 'light']
  if (vsColors.includes(colorx)) {
    return alphax === 1
      ? `var(--vs-${colorx})`
      : `rgba(var(--vs-${colorx}-rgb), ${alphax})`
  }

  return colorx
}

const darken = (color, percent) => {
  const f = color.split(',')
  const t = percent < 0 ? 0 : 255
  const p = percent < 0 ? percent * -1 : percent
  const R = parseInt(f[0].slice(4))
  const G = parseInt(f[1])
  const B = parseInt(f[2])

  return `rgb(${Math.round((t - R) * p) + R},${Math.round((t - G) * p) + G},${Math.round((t - B) * p) + B})`
}

const isColor = (colorx) => {
  const vsColors = ['primary', 'secondary', 'success', 'danger', 'warning', 'dark', 'light']
  return vsColors.includes(colorx)
}

// Helper functions
const isType = (which) => props.type === which

const getRTLValue = (value) => {
  if (props.rtl) {
    return value
  }
  return value === 'right' ? 'left' : value === 'left' ? 'right' : value
}

// Computed properties
const buttonClasses = computed(() => {
  const classes = [
    `vs-button-${isColor(props.color) ? props.color : 'default'}`,
    `vs-button-${props.type}`,
    {
      'isActive': isActive.value,
      'includeIcon': props.icon,
      'includeIconOnly': props.icon && !slots.default,
      'vs-radius': props.radius
    }
  ]

  if (props.size && !/[px]/.test(props.size)) {
    classes.push(props.size)
  }

  return classes
})

const buttonStyles = computed(() => {
  const styles = {}

  // Size handling
  if (/[px]/.test(props.size)) {
    styles.width = props.size
    styles.height = props.size
  }

  // Type-specific styles
  if (isType('filled')) {
    styles.color = getColor(props.textColor, 1)
    styles.background = getColor(props.color, 1)
    if (hoverx.value) {
      styles.boxShadow = `0px 8px 25px -8px ${getColor(props.color, 1)}`
    }
  } else if (isType('border') || isType('flat')) {
    styles.border = `${isType('flat') ? 0 : 1}px solid ${getColor(props.color, 1)}`
    styles.background = hoverx.value ? getColor(props.color, 0.1) : 'transparent'
    styles.color = getColor(props.textColor, 1) || getColor(props.color, 1)
  } else if (isType('line')) {
    styles.color = getColor(props.textColor, 1) || getColor(props.color, 1)
    styles.borderBottomWidth = props.linePosition === 'bottom' ? '2px' : null
    styles.borderColor = getColor(props.color, 0.2)
    styles.borderTopWidth = props.linePosition === 'top' ? '2px' : null
  } else if (isType('gradient')) {
    const backgroundx = `linear-gradient(${props.gradientDirection}, ${getColor(props.color)} 0%, ${getColor(props.gradientColorSecondary, 1)} 100%)`
    styles.background = backgroundx
  } else if (isType('relief')) {
    const color = getColor(props.color, 1)
    styles.background = color
    styles.boxShadow = `0 3px 0 0 ${darken(color, -0.4)}`
  }

  return styles
})

const backgroundStyles = computed(() => ({
  background: isType('flat') || isType('border') ? getColor(props.color, 1, false) : null,
  opacity: opacity.value,
  left: `${leftBackground.value}px`,
  top: `${topBackground.value}px`,
  width: `${radio.value}px`,
  height: `${radio.value}px`,
  transition: `width ${time.value}s ease, height ${time.value}s ease, opacity ${timeOpacity.value}s ease`
}))

const lineStyles = computed(() => {
  let lineOrigin = '50%'
  if (props.lineOrigin === 'left') {
    lineOrigin = '0%'
  } else if (props.lineOrigin === 'right') {
    lineOrigin = 'auto'
  }

  return {
    top: props.linePosition === 'top' ? '-2px' : 'auto',
    bottom: props.linePosition === 'bottom' ? '-2px' : 'auto',
    background: getColor(props.color, 1),
    left: lineOrigin,
    right: lineOrigin === 'auto' ? '0px' : null,
    transform: lineOrigin === '50%' ? 'translate(-50%)' : null
  }
})

const iconStyles = computed(() => ({
  order: props.iconAfter ? 2 : 0,
  [`margin-${getRTLValue('left')}`]: slots.default && !props.iconAfter ? '5px' : '0px',
  [`margin-${getRTLValue('right')}`]: slots.default && props.iconAfter ? '5px' : '0px'
}))

// Event handlers
const handleMouseover = (event) => {
  emit('mouseover', event)
  hoverx.value = true
}

const handleMouseout = (event) => {
  emit('mouseout', event)
  hoverx.value = false
}

const handleBlur = (event) => {
  emit('blur', event)

  nextTick(() => {
    if (props.type === 'border' || props.type === 'flat') {
      opacity.value = 0
      setTimeout(() => {
        radio.value = 0
      }, 150)
      isActive.value = false
    }
  })
}

const routerPush = () => {
  if (router && props.to) {
    router.push(props.to).catch(err => {
      emit('routeErr', err)
    })
  }
}

const handleClick = (event) => {
  emit('click', event)

  nextTick(() => {
    if (isActive.value) return

    // Handle routing
    if (props.to) {
      routerPush()
    }

    // Handle href
    if (props.href) {
      const url = typeof props.href === 'string' ? props.href : props.href.url
      if (props.target) {
        window.open(url)
      } else {
        window.location.href = url
      }
    }

    // Ripple effect
    if (props.type === 'border' || props.type === 'flat') {
      isActive.value = true
    }

    const btn = btnRef.value
    if (!btn) return

    let xEvent = event.offsetX
    let yEvent = event.offsetY
    const radioValue = btn.clientWidth * 3

    time.value = btn.clientWidth / (btn.clientWidth + (isType('border') || isType('flat') ? 70 : 20))

    if (isType('filled')) {
      timeOpacity.value = time.value
    }

    if (event.srcElement && event.srcElement !== btn) {
      xEvent += event.target.offsetLeft
      yEvent += event.target.offsetTop
    }

    leftBackground.value = xEvent
    topBackground.value = yEvent
    radio.value = radioValue

    if (isType('filled')) {
      opacity.value = 0
    } else {
      opacity.value = 1
    }

    if (isType('filled')) {
      setTimeout(() => {
        time.value = 0
        timeOpacity.value = 0
        radio.value = 0
        opacity.value = 1
        isActive.value = false
      }, time.value * 1100)
    } else {
      setTimeout(() => {
        timeOpacity.value = 0.15
      }, time.value * 1100)
    }
  })
}
</script>

<style lang="scss" scoped>
// Variables
$vs-radio: 6px;
$vs-disabled-opacity: 0.5;
$vs-transition: all 0.25s ease;

// Color map for theming
$vs-colors: (
  'primary': var(--vs-primary, rgb(25, 91, 255)),
  'secondary': var(--vs-secondary, rgb(155, 155, 155)),
  'success': var(--vs-success, rgb(70, 201, 58)),
  'danger': var(--vs-danger, rgb(242, 19, 93)),
  'warning': var(--vs-warning, rgb(255, 186, 0)),
  'dark': var(--vs-dark, rgb(36, 33, 69)),
  'light': var(--vs-light, rgb(240, 240, 240))
);

// Main button styles
.vs-button {
  transition: all 0.2s ease;
  padding: 10px;
  border: 0;
  border-radius: $vs-radio;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  color: rgb(255, 255, 255);
  box-sizing: border-box;
  background: transparent;
  font-family: inherit;
  font-size: inherit;

  &.vs-radius {
    border-radius: 50%;
  }

  &.large {
    padding: 12px;
    font-size: 1em;
  }

  &.small {
    padding: 7px;
    font-size: 0.7em;
  }

  &:disabled {
    opacity: $vs-disabled-opacity;
    cursor: default;
    pointer-events: none;
  }
}

// Button icon
.vs-button--icon {
  z-index: 100;
  display: block;
  position: relative;
  font-size: 1.125em;
  transition: all 0.2s ease;
}

// Background ripple effect
.vs-button--background {
  border-radius: 50%;
  width: 10px;
  position: absolute;
  height: 10px;
  z-index: 0;
  transform: translate(-50%, -50%);
  box-shadow: inset 0 0 60px 0 rgba(255, 255, 255, 0.5);
}

// Button text
.vs-button--text {
  position: relative;
  color: inherit;
  display: inline-block;
  transition: $vs-transition;
}

// Border button specific styles
.vs-button-border {
  padding: 9px;
}

.vs-button-border,
.vs-button-flat {
  &.isActive {
    .vs-button--text,
    .vs-button--icon {
      color: rgb(255, 255, 255) !important;
    }
  }
}

// Filled button
.vs-button-filled {
  &:hover {
    box-shadow: 0 9px 28px -9px;
  }
}

// Line button
.vs-button-line {
  padding: 9px 10px;
  border-radius: 0;
  overflow: visible;
  border-style: solid;

  .vs-button-linex {
    transition: all 0.2s ease;
    width: 0%;
    position: absolute;
    left: 0;
    bottom: -2px;
    height: 2px;
  }

  &:hover {
    .vs-button--text,
    .vs-button--icon {
      transform: translate(0, 2px);
    }

    .vs-button-linex {
      width: 100% !important;
    }
  }
}

// Gradient button
.vs-button-gradient {
  &:hover {
    transform: translate(0, -2px);
    box-shadow: 0 8px 25px -8px rgb(170, 170, 170);
  }

  &:active {
    transform: translate(0, 0);
    box-shadow: 0 8px 0 -8px rgb(170, 170, 170);
  }
}

// Relief button
.vs-button-relief {
  padding: 10px;

  &:active {
    transform: translate(0, 3px);
    box-shadow: none !important;
  }
}

// Icon handling
.includeIcon {
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
}

.includeIconOnly {
  width: 38px !important;
  height: 38px !important;

  &.large {
    width: 44px !important;
    height: 44px !important;
    font-size: 0.7em;
  }

  &.small {
    width: 28px !important;
    height: 28px !important;

    .material-icons {
      font-size: 0.85rem;
    }
  }
}

// Color variations
@each $name, $color in $vs-colors {
  .vs-button-#{$name} {
    // Filled type
    &.vs-button-filled {
      background: $color !important;

      &:hover {
        box-shadow: 0 8px 25px -8px $color;
      }
    }

    // Border and flat types
    &.vs-button-border,
    &.vs-button-flat {
      border: 1px solid $color;
      background: transparent !important;
      color: $color;

      .vs-button--text.isActive {
        color: rgb(255, 255, 255) !important;
      }

      &:hover {
        background: rgba($color, 0.08) !important;
      }

      .vs-button-backgroundx {
        background: $color;
        box-shadow: inset 0 0 60px 0 $color;
      }
    }

    // Flat specific
    &.vs-button-flat {
      border: none !important;
    }

    // Line type
    &.vs-button-line {
      color: $color;
      border-color: rgba($color, 0.2);

      .vs-button-linex {
        background: $color;
      }
    }

    // Gradient type
    &.vs-button-gradient {
      @if $name == 'success' {
        background: rgb(0, 100, 250);
        background-image: linear-gradient(30deg, $color 0%, rgba($color, 0.6) 100%) !important;
      } @else if $name == 'warning' {
        background: rgb(250, 250, 250);
        background-image: linear-gradient(30deg, $color 0%, rgba($color, 0.5) 100%) !important;
      } @else {
        background: rgb(100, 0, 100);
        background-image: linear-gradient(30deg, $color 0%, rgba($color, 0.5) 100%) !important;
      }
      text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
    }

    // Relief type
    &.vs-button-relief {
      background: $color;

      @if $name == 'dark' {
        box-shadow: 0 -3px 0 0 rgba(255, 255, 255, 0.1) inset;
      } @else {
        box-shadow: 0 -3px 0 0 rgba(0, 0, 0, 0.2) inset;
      }
    }
  }
}
</style>
