<template>
  <section class="py-20 bg-black text-white" id="projects">
  <div class="mx-auto px-4 max-w-6xl">
    <!-- Wrapper titre + filtres -->
    <div class="flex flex-col items-center text-center">
      <!-- Titre -->
      <h2 class="text-4xl md:text-5xl font-extrabold mb-10 !text-center">
        MES PROJETS <span class="text-purple-400">VIDEOS</span>
      </h2>

      <!-- Filtres -->
      <div class="flex flex-wrap justify-center gap-4 mb-10">
        <button
          class="px-5 py-2 border rounded-lg text-sm font-semibold transition-all"
          :class="selectedCategory === 'all'
            ? 'bg-purple-600 text-white border-purple-600'
            : 'border-purple-600 text-purple-300 hover:bg-purple-600/20'"
          @click="selectedCategory = 'all'"
        >
          Tous
        </button>

        <button
          v-for="cat in categories"
          :key="cat.id"
          class="px-5 py-2 border rounded-lg text-sm font-semibold transition-all"
          :class="selectedCategory === cat.slug
            ? 'bg-purple-600 text-white border-purple-600'
            : 'border-purple-600 text-purple-300 hover:bg-purple-600/20'"
          @click="selectedCategory = cat.slug"
        >
          {{ cat.name }}
        </button>
      </div>
</div>
      <!-- CARROUSEL VIDEOS -->
      <div class="relative max-w-6xl mx-auto">

  <!-- Container scroll -->
  <div
    ref="carouselRef"
    class="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth no-scrollbar"
  >
    <div
      v-for="video in filteredVideos"
      :key="video.id"
      class="group cursor-pointer snap-center min-w-[260px] md:min-w-[300px] lg:min-w-[340px] flex-shrink-0"
      @click="openVideo(video)"
    >
      <div class="relative rounded-xl overflow-hidden">
        <img
          v-if="getVideoThumbnail(video)"
          :src="getVideoThumbnail(video)"
          class="w-full h-56 object-cover"
        />
        <div v-else class="w-full h-56 bg-gray-900 flex items-center justify-center">
          <span class="text-gray-600">No thumbnail</span>
        </div>

        <div
          class="absolute inset-0 bg-black/40 flex items-center justify-center
                 opacity-0 group-hover:opacity-100 transition"
        >
          <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl">
            ▶
          </div>
        </div>
      </div>

      <p class="mt-2 text-xs uppercase tracking-wide text-purple-300">
        {{ getFirstCategoryName(video) }}
      </p>

      <h3 class="mt-1 text-lg font-bold uppercase tracking-wide">
        {{ video.title }}
      </h3>
    </div>
    
  </div>
 

      </div>
     
      
    </div>
<!-- Flèches -->
<div class="flex justify-center gap-6 mt-4">
    <button
      class="bg-white/10 hover:bg-white/20 backdrop-blur-md
             text-white p-3 rounded-full border border-white/10"
      @click="scrollCarousel('left')"
    >
      <ArrowLeftIcon class="w-6 h-6" />
    </button>

    <button
      class="bg-white/10 hover:bg-white/20 backdrop-blur-md
             text-white p-3 rounded-full border border-white/10"
      @click="scrollCarousel('right')"
    >
    <ArrowRightIcon class="w-6 h-6" />
      
    </button>
      </div>
    <!-- POPUP VIDÉO -->
    <div
      v-if="activeVideo"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
    >
      <div class="absolute inset-0" @click="closeVideo"></div>

      <div class="relative z-10 w-full max-w-4xl mx-4">
        <button
          class="absolute -top-10 right-0 text-white/80 hover:text-white text-2xl"
          @click.stop="closeVideo"
        >
          ✕
        </button>

        <div class="aspect-video bg-black rounded-xl overflow-hidden">
          <!-- YouTube -->
          <iframe
            v-if="isYoutubeVideo(activeVideo)"
            class="w-full h-full"
            :src="getYoutubeEmbedUrl(activeVideo.youtube_url)"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>

          <!-- Upload depuis le PC -->
          <video
            v-else-if="activeVideo.video_file"
            class="w-full h-full object-cover"
            controls
            autoplay
            :src="getVideoFileUrl(activeVideo.video_file)"
          />

          <!-- Fallback -->
          <div
            v-else
            class="w-full h-full flex items-center justify-center text-white/60"
          >
            Aucune source vidéo disponible
          </div>
        </div>

        <h3 class="mt-4 text-lg font-semibold">
          {{ activeVideo.title }}
        </h3>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/solid'
const runtimeConfig = useRuntimeConfig()

// base API (ex: http://localhost:1337/api)
const API_BASE = runtimeConfig.public.apiBase || 'http://localhost:1337/api'
// base fichiers (ex: http://localhost:1337)
const STRAPI_URL =
  runtimeConfig.public.strapiUrl || API_BASE.replace(/\/api$/, '')

const getFileUrl = (file) => {
  if (!file) return ''
  const url = file.url || file?.data?.attributes?.url
  if (!url) return ''
  if (url.startsWith('http')) return url
  return STRAPI_URL + url
}

const getYoutubeId = (url) => {
  try {
    const u = new URL(url)
    const id = u.searchParams.get('v') || url.split('/').pop()
    return id
  } catch {
    return null
  }
}

const getYoutubeThumbnailUrl = (url) => {
  const id = getYoutubeId(url)
  if (!id) return ''
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
}

const getVideoFileUrl = (videoFile) => getFileUrl(videoFile)

const getVideoThumbnail = (video) => {
  if (video.thumbnail) return getFileUrl(video.thumbnail)
  if (isYoutubeVideo(video) && video.youtube_url) {
    return getYoutubeThumbnailUrl(video.youtube_url)
  }
  return ''
}

// Fetch vidéos & catégories
const { data: videosRes } = await useFetch(`${API_BASE}/videos`, {
  params: {
    populate: '*',
    sort: ['createdAt:desc'],
  },
})

const { data: categoriesRes } = await useFetch(`${API_BASE}/video-categories`, {
  params: {
    sort: ['name:asc'],
  },
})

// On "flatten" la réponse Strapi v4 pour garder ton template intact
const videos = computed(() => {
  const raw = videosRes.value?.data ?? []
  return raw.map((item) => {
    const attrs = item.attributes || item
    const catsRaw = attrs.video_categories?.data ?? attrs.video_categories ?? []
    const cats = Array.isArray(catsRaw)
      ? catsRaw.map((c) => ({ id: c.id, ...(c.attributes || c) }))
      : []

    return {
      id: item.id,
      ...attrs,
      video_categories: cats,
    }
  })
})

const categories = computed(() => {
  const raw = categoriesRes.value?.data ?? []
  return raw.map((item) => {
    const attrs = item.attributes || item
    return {
      id: item.id,
      ...attrs,
    }
  })
})

const selectedCategory = ref('all')
const activeVideo = ref(null)

const filteredVideos = computed(() => {
  if (selectedCategory.value === 'all') return videos.value
  return videos.value.filter((video) => {
    const cats = video.video_categories || []
    return cats.some((cat) => cat.slug === selectedCategory.value)
  })
})

const getFirstCategoryName = (video) => {
  if (!video.video_categories || !video.video_categories.length) return ''
  return video.video_categories[0].name
}

const isYoutubeVideo = (video) => {
  return video?.source_type?.toLowerCase().includes('youtube')
}

const getYoutubeEmbedUrl = (url) => {
  const id = getYoutubeId(url)
  if (!id) return url
  return `https://www.youtube.com/embed/${id}?autoplay=1`
}

const openVideo = (video) => {
  activeVideo.value = video
}

const closeVideo = () => {
  activeVideo.value = null
}
const carouselRef = ref(null)

const scrollCarousel = (direction) => {
  const el = carouselRef.value
  if (!el) return

  // largeur d’une carte (adaptée à tes min-w)
  const cardWidth = 320

  el.scrollBy({
    left: direction === 'left' ? -cardWidth : cardWidth,
    behavior: "smooth"
  })
}
</script>
