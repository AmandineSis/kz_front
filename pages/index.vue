<template>
  <div class="min-h-screen">
    <div v-if="pending" class="p-8">
      Chargement...
    </div>

    <div v-else-if="error" class="p-8 text-red-600">
      <p>Erreur de chargement de la page.</p>
      <pre class="mt-2 text-xs whitespace-pre-wrap">{{ error }}</pre>
    </div>
    <!--Section Hero-->
    <div v-else-if="homepage && homepage.data">
      <!--<SectionHero :data="homepage.data.sections[0]" />-->
     
    <SectionHero/>
     <section class="w-full bg-[#100A2F] text-white py-4">
      <TextScroll :items="scrollItems" />
    </section>
    <!--Section Videos-->
    <SectionVideos />
   
    <!--Section Images-->
    <SectionPhotos />
    <!--Section About-->
    <SectionAbout />
    <!--Section Contact-->
    <SectionContact/>
    <!--Section Footer-->
  </div>

  <div v-else class="p-8">
    <p>Aucune donnée de homepage.</p>
  </div>
  </div>
</template>

<script setup>
import SectionHero from '~/components/sections/SectionHero.vue'
import SectionVideos from '~/components/sections/SectionVideos.vue'
import SectionPhotos from '~/components/sections/SectionPhotos.vue'
import SectionAbout from '~/components/sections/SectionAbout.vue'
import SectionContact from '~/components/sections/SectionContact.vue' 

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
  '▫️',
  'REPORTAGES',
  '▫️',
  'MONTAGES',
  '▫️',
  'DRONE SHOOTING',
  '▫️',
  'PHOTOGRAPHIE',
  '▫️'
]

</script>
