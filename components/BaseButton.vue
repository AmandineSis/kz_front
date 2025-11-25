<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="inline-block w-1/2 px-8 py-3
                 bg-[#6F00A9] hover:bg-[#6F00A9]/80
                 font-highlight text-white text-center
                 mx-auto md:mx-0"
    :class="computedClasses"
  >
    <slot>{{ label }}</slot>
  </NuxtLink>

  <button
    v-else
    class="inline-block w-1/2 px-8 py-3
                 bg-[#6F00A9] hover:bg-[#6F00A9]/80
                 font-highlight text-white text-center
                 mx-auto md:mx-0"
    :class="computedClasses"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: null,
  },
  to: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: '#6F00A9', // couleur violette par défaut
  },
  size: {
    type: String,
    default: 'medium', // medium, large, small si tu veux évoluer
  },
})

const computedClasses = computed(() => {
  return [
    `bg-[${props.color}] hover:bg-[${props.color}]/80 text-white`,
    props.size === 'large' && 'text-lg py-4 px-10',
    props.size === 'small' && 'text-sm py-2 px-5',
  ]
})
</script>
