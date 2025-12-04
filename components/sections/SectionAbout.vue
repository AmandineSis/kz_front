<template>
  <section
    id="about"
    class="py-30 text-white"
    style="background-color: #100A2F;"
  >
    <!-- Titre -->
    <h2
      class="text-4xl md:text-5xl text-center font-extrabold mb-20"
      style="background-color: #100A2F;"
    >
      À PROPOS <span class="text-[#55AB88]">DE MOI</span>
    </h2>

    <div
      class="mx-auto max-w-6xl px-4 grid gap-12 md:grid-cols-2 items-center"
    >
      <!-- Colonne gauche : description (Strapi) -->
      <div class="text-sm md:text-base text-white/80 leading-relaxed space-y-4">
        <!-- Affiche la description si dispo -->
        <p v-if="about.description" class="whitespace-pre-line">
          {{ about.description }}
        </p>

       
      </div>

      <!-- Colonne droite : grille 2x2 d’icônes -->
      <div class="grid grid-cols-2 gap-6">
        <!-- Carte 1 : Reportage -->
        <div
          class="rounded-2xl border border-green-300/20
                 bg-[rgba(34,197,94,0.10)] backdrop-blur-md
                 shadow-[0_4px_20px_rgba(34,197,94,0.15)]
                 p-5 flex flex-col items-center text-center"
        >
          <div class="text-3xl mb-3">
            <img
              src="/images/icones/clap.png"
              alt="icon"
              class="w-20 h-20"
            />
          </div>
          <h3
            class="text-sm font-semibold mb-1 uppercase tracking-wide text-[#FFC800]"
          >
            Reportage
          </h3>
          <p class="text-xs text-white/70">
            Capturer l’authenticité de vos histoires.
          </p>
        </div>

        <!-- Carte 2 : Drone shooting -->
        <div
          class="rounded-2xl border border-green-300/20
                 bg-[rgba(34,197,94,0.10)] backdrop-blur-md
                 shadow-[0_4px_20px_rgba(34,197,94,0.15)]
                 p-5 flex flex-col items-center text-center"
        >
          <div class="text-3xl mb-3">
            <img
              src="/images/icones/drone-camera.png"
              alt="icon"
              class="w-20 h-20"
            />
          </div>
          <h3
            class="text-sm font-semibold mb-1 uppercase tracking-wide text-[#FFC800]"
          >
            Drone shooting
          </h3>
          <p class="text-xs text-white/70">
            Prises de vue aériennes pour une autre perspective.
          </p>
        </div>

        <!-- Carte 3 : Photographie -->
        <div
          class="rounded-2xl border border-green-300/20
                 bg-[rgba(34,197,94,0.10)] backdrop-blur-md
                 shadow-[0_4px_20px_rgba(34,197,94,0.15)]
                 p-5 flex flex-col items-center text-center"
        >
          <div class="text-3xl mb-3">
            <img
              src="/images/icones/appareil-photo.png"
              alt="icon"
              class="w-20 h-20"
            />
          </div>
          <h3
            class="text-sm font-semibold mb-1 uppercase tracking-wide text-[#FFC800]"
          >
            Photographie
          </h3>
          <p class="text-xs text-white/70">
            Figer l’instant avec précision et sens du détail.
          </p>
        </div>

        <!-- Carte 4 : Montage -->
        <div
          class="rounded-2xl border border-green-300/20
                 bg-[rgba(34,197,94,0.10)] backdrop-blur-md
                 shadow-[0_4px_20px_rgba(34,197,94,0.15)]
                 p-5 flex flex-col items-center text-center"
        >
          <div class="text-3xl mb-3">
            <img
              src="/images/icones/montage-de-films.png"
              alt="icon"
              class="w-20 h-20"
            />
          </div>
          <h3
            class="text-sm font-semibold mb-1 uppercase tracking-wide text-[#FFC800]"
          >
            Montage
          </h3>
          <p class="text-xs text-white/70">
            Donner du rythme, du sens et une vraie signature visuelle.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()
const API_BASE = runtimeConfig.public.apiBase

// Récupérer le single type About
const { data: aboutRes } = await useFetch(`${API_BASE}/about`, {
  params: { populate: '*' },
})

// Mapping robuste pour Strapi v4 / v5 / autres
const about = computed(() => {
  const raw = aboutRes.value
  if (!raw) return {}

  // cas v4 classique : { data: { attributes: {...} } }
  const fromData = raw.data ?? raw
  const attrs = fromData.attributes ?? fromData

  return attrs
})
</script>
