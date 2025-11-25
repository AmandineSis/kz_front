<template>
  <section class="py-20 bg-black text-white" id="photos">
    <div class="container  mx-auto px-4">
      <!-- Titre -->
      <h2 class="text-4xl md:text-5xl text-center font-extrabold mb-10">
        MA GALERIE <span class="text-purple-400">PHOTO</span>
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

      <!-- Grille photos -->
      <div class="grid gap-10 md:grid-cols-3">
        <div
          v-for="photo in filteredPhotos"
          :key="photo.id"
          class="group"
        >
          <div class="relative rounded-xl overflow-hidden">
            <img
              v-if="photo.mainImageUrl"
              class="w-full h-72 object-cover"
              :src="photo.mainImageUrl"
              :alt="photo.title || 'Photo'"
              loading="lazy"
            />
            <div
              v-else
              class="w-full h-72 bg-gray-900 flex items-center justify-center"
            >
              <span class="text-gray-600">No image</span>
            </div>
            <!-- léger overlay au hover -->
            <div
              class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition"
            ></div>
          </div>

          <!-- Catégorie -->
          <p class="mt-2 text-xs uppercase tracking-wide text-purple-300">
            {{ photo.categoryName }}
          </p>

          <!-- Titre -->
          <h3 class="mt-1 text-lg font-bold uppercase tracking-wide">
            {{ photo.title }}
          </h3>
        </div>
      </div>

      <p
        v-if="!pending && filteredPhotos.length === 0"
        class="mt-10 text-center text-sm text-gray-400"
      >
        Aucune photo pour cette catégorie.
      </p>
    </div>
  </section>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()
const API_BASE = runtimeConfig.public.apiBase || 'http://localhost:1337/api'
const STRAPI_URL =
  runtimeConfig.public.strapiUrl || API_BASE.replace(/\/api$/, '')

const getFileUrl = (file) => {
  if (!file) return ''
  const url = file.url || file?.data?.attributes?.url
  if (!url) return ''
  if (url.startsWith('http')) return url
  return STRAPI_URL + url
}

// Fetch catégories & photos
const { data: categoriesRes } = await useFetch(`${API_BASE}/photo-categories`, {
  params: {
    sort: ['name:asc'],
  },
})

const { data: photosRes, pending } = await useFetch(`${API_BASE}/photos`, {
  params: {
    populate: ['photo', 'photo_categories'],
    sort: ['createdAt:desc'],
  },
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

const photos = computed(() => {
  const raw = photosRes.value?.data ?? []

  return raw.map((item) => {
    // tu as déjà un objet "plat"
    const attrs = item.attributes || item

    // ---- IMAGE PRINCIPALE ----
    // Ici `photo` est un objet direct (single media)
    const media = attrs.photo
    // on choisit une version (medium > large > original)
    const url =
      media?.formats?.medium?.url ||
      media?.formats?.small?.url ||
      media?.url ||
      ''

    const mainImageUrl = url
      ? url.startsWith('http')
        ? url
        : STRAPI_URL + url
      : ''

    // ---- CATEGORIE ----
    // Ici `photo_categories` est déjà un tableau d’objets
    const catArray = attrs.photo_categories || []
    const cat = Array.isArray(catArray) ? catArray[0] : catArray
    const categoryName = cat?.name || ''
    const categorySlug = cat?.slug || ''

    return {
      id: attrs.id ?? item.id,
      title: attrs.title,
      mainImageUrl,
      categoryName,
      categorySlug,
      // si tu veux encore utiliser les données brutes :
      photo: media,
      photo_categories: catArray,
    }
  })
})



const selectedCategory = ref('all')

const filteredPhotos = computed(() => {
  if (selectedCategory.value === 'all') return photos.value
  return photos.value.filter(
    (p) => p.categorySlug === selectedCategory.value
  )
})
</script>
