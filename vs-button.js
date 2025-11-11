/**
 * VsButton Standalone JavaScript
 * Version: 1.0.0
 * Optional JavaScript for enhanced button interactions
 */

(function (global) {
  'use strict';

  /**
   * VsButton Class
   * Adds ripple effects and enhanced interactions to buttons
   */
  class VsButton {
    constructor(element, options = {}) {
      this.element = element;
      this.options = {
        ripple: true,
        rippleColor: options.rippleColor || 'rgba(255, 255, 255, 0.5)',
        ...options
      };

      this.init();
    }

    init() {
      if (this.options.ripple) {
        this.initRipple();
      }
    }

    /**
     * Initialize ripple effect
     */
    initRipple() {
      this.element.addEventListener('click', (e) => {
        this.createRipple(e);
      });
    }

    /**
     * Create ripple effect on click
     */
    createRipple(event) {
      // Don't create ripple for line, gradient, and relief buttons
      const isLineType = this.element.classList.contains('vs-button-line');
      const isGradientType = this.element.classList.contains('vs-button-gradient');
      const isReliefType = this.element.classList.contains('vs-button-relief');

      if (isLineType || isGradientType || isReliefType) {
        return;
      }

      // Remove existing ripples
      const existingRipples = this.element.querySelectorAll('.vs-button__ripple');
      existingRipples.forEach(ripple => ripple.remove());

      // Create new ripple element
      const ripple = document.createElement('span');
      ripple.classList.add('vs-button__ripple');

      // Get button dimensions
      const rect = this.element.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Set ripple styles
      ripple.style.width = ripple.style.height = size * 3 + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      // Set ripple color based on button type
      if (this.element.classList.contains('vs-button-border') ||
          this.element.classList.contains('vs-button-flat')) {
        // For border and flat buttons, use button color
        const color = this.getButtonColor();
        ripple.style.background = color;
      } else {
        // For filled buttons, use white
        ripple.style.background = this.options.rippleColor;
      }

      // Add ripple to button
      this.element.appendChild(ripple);

      // Trigger animation
      requestAnimationFrame(() => {
        ripple.classList.add('active');
      });

      // Remove ripple after animation
      const animationDuration = 600;
      setTimeout(() => {
        ripple.remove();
      }, animationDuration);
    }

    /**
     * Get button color for ripple effect
     */
    getButtonColor() {
      const computedStyle = window.getComputedStyle(this.element);
      const color = computedStyle.color;

      // Convert color to rgba with opacity
      if (color.startsWith('rgb(')) {
        return color.replace('rgb(', 'rgba(').replace(')', ', 0.3)');
      } else if (color.startsWith('rgba(')) {
        return color.replace(/[\d.]+\)$/g, '0.3)');
      }

      return 'rgba(0, 0, 0, 0.3)';
    }

    /**
     * Destroy instance and remove event listeners
     */
    destroy() {
      // Remove ripples
      const ripples = this.element.querySelectorAll('.vs-button__ripple');
      ripples.forEach(ripple => ripple.remove());
    }
  }

  /**
   * Auto-initialize all buttons with vs-button class
   */
  function autoInit() {
    const buttons = document.querySelectorAll('.vs-button');
    const instances = [];

    buttons.forEach((button) => {
      // Skip if already initialized
      if (button.dataset.vsButtonInitialized) {
        return;
      }

      const instance = new VsButton(button);
      instances.push(instance);
      button.dataset.vsButtonInitialized = 'true';
    });

    return instances;
  }

  /**
   * Initialize specific button element
   */
  function init(element, options) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    if (!element) {
      console.warn('VsButton: Element not found');
      return null;
    }

    return new VsButton(element, options);
  }

  /**
   * Utility: Add loading state to button
   */
  function setLoading(element, loading = true) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    if (!element) {
      return;
    }

    if (loading) {
      element.classList.add('vs-button-loading');
      element.disabled = true;
    } else {
      element.classList.remove('vs-button-loading');
      element.disabled = false;
    }
  }

  /**
   * Utility: Toggle button state
   */
  function toggleState(element, state, stateClass) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    if (!element) {
      return;
    }

    if (state) {
      element.classList.add(stateClass);
    } else {
      element.classList.remove(stateClass);
    }
  }

  // Export to global scope
  const VsButtonAPI = {
    VsButton,
    init,
    autoInit,
    setLoading,
    toggleState,
    version: '1.0.0'
  };

  // Auto-initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }

  // Export for different module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = VsButtonAPI;
  } else if (typeof define === 'function' && define.amd) {
    define([], function () {
      return VsButtonAPI;
    });
  } else {
    global.VsButton = VsButtonAPI;
  }

})(typeof window !== 'undefined' ? window : this);
