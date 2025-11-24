<template>
  <div class="min-h-screen">
    <div v-if="pending" class="p-8">
      Chargement...
    </div>

    <div v-else-if="error" class="p-8 text-red-600">
      <p>Erreur de chargement de la page.</p>
      <pre class="mt-2 text-xs whitespace-pre-wrap">{{ error }}</pre>
    </div>

    <div v-else-if="homepage && homepage.data">
      <SectionHero :data="homepage.data.sections[0]" />

    <div class="w-full bg-black text-white py-4">
      <TextScroll :items="scrollItems" />
    </div>
  </div>

  <div v-else class="p-8">
    <p>Aucune donnée de homepage.</p>
  </div>
  </div>
</template>

<script setup>
import SectionHero from '~/components/sections/SectionHero.vue'

const { data: homepage, pending, error } = await useFetch(
  'http://localhost:1337/api/homepage-sgl',
  {
    params: {
      'populate[sections][populate]': '*'
    }
  }
)
const scrollItems = [
  'VIDÉOS',
  'REPORTAGES',
  'MONTAGES',
  'DRONE SHOOTING',
  'PHOTOGRAPHIE',
]

</script>
