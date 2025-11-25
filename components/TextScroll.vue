<template>
  <div class="text-scroll-wrapper">
    <div class="text-scroll-track">
      <span
        v-for="(item, index) in duplicatedItems"
        :key="index"
        class="text-scroll-item"
      >
        {{ item }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
})

// On duplique le tableau pour pouvoir boucler visuellement
const duplicatedItems = computed(() => [...props.items, ...props.items])
</script>

<style scoped>
.text-scroll-wrapper {
  overflow: hidden;
  white-space: nowrap;
}

.text-scroll-track {
  display: inline-flex;
  animation: text-scroll 20s linear infinite;
}

.text-scroll-item {
  margin-left: 5rem;
  margin-right: 5rem;
  font-family: 'highlight-font', sans-serif;
  font-weight: bold;
  font-size: 1rem;
}

@keyframes text-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    /* -50% car on a dupliqué la liste */
    transform: translateX(-50%);
  }
}
</style>
