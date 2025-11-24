<script setup>
import { computed } from 'vue'
import { ref, onMounted } from 'vue'
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const baseURL = 'http://localhost:1337'

// on sécurise au cas où header_video n'est pas défini
const videoUrl = computed(() => {
  const headerVideo = props.data?.header_video
  if (!headerVideo?.url) return ''
  return baseURL + headerVideo.url
})

const baseImageDesktop = `url('/images/heroback.png')`
const baseImageMobile = `url('/images/heroback-mobile.png')`

const finalBgImage = ref(baseImageDesktop)

onMounted(() => {
  if (window.innerWidth < 768) {
    finalBgImage.value = baseImageMobile
  }
})
</script>

<template>
  <section
    id="hero"
    class="relative text-white  bg-[url('/images/heroback.png')] 
    md:bg-[url('/images/heroback-desktop.png')]
    bg-cover bg-center"
    :style="{
      backgroundImage: finalBgImage,
      backgroundColor: props.data.backgroundColor || '#000000',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
  >
    <div
      class="min-h-[70vh] max-w-6xl mx-auto px-6
             flex flex-col md:flex-row
             gap-8 md:gap-12
             pt-24 md:pt-0"
    >
      <!-- COLONNE TEXTE (toujours en premier) -->
      <div
        class="relative z-10 flex flex-col justify-center md:w-1/2
               text-center md:text-left"
      >
        <h1
          class="font-title text-4xl md:text-5xl font-bold mb-6"
          style="font-family: title-font"
        >
          {{ props.data.title }}
        </h1>

        <p class="font-content text-lg md:text-xl text-gray-200 mb-8">
          {{ props.data.subtitle }}
        </p>

        <NuxtLink
          v-if="props.data.buttonLabel"
          :to="props.data.buttonUrl || '#'"
          class="inline-block w-1/2 px-8 py-3
                 bg-[#6F00A9] hover:bg-[#6F00A9]/80
                 font-highlight text-white text-center
                 mx-auto md:mx-0"
        >
          {{ props.data.buttonLabel }}
        </NuxtLink>
      </div>

      <!-- COLONNE VIDÉO (toujours en deuxième) -->
      <div
        class="relative z-10 flex items-center justify-center md:w-1/2"
      >
        <video
          :src="videoUrl"
          controls
          class="w-full max-w-xl rounded-[40px] border border-white/10"
        ></video>
      </div>
    </div>
  </section>
</template>