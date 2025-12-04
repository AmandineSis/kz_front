<template>
  <section
    class="relative overflow-hidden bg-black text-white min-h-[65vh]"
  >
    <!-- VIDÉO YOUTUBE À DROITE, EN FOND -->
    <!-- VIDÉO BACKGROUND DROITE SANS BANDES NOIRES -->
<div class="absolute inset-y-0 right-0 w-full lg:w-1/2 overflow-hidden">
  <div class="absolute inset-0 overflow-hidden">
    <iframe
      class="absolute w-[160%] h-full left-1/2 -translate-x-1/2"
      src="https://www.youtube.com/embed/3uu5WWc6LgY?autoplay=1&mute=1&loop=1&playlist=3uu5WWc6LgY&controls=0&showinfo=0&modestbranding=1&rel=0"
      frameborder="0"
      allow="autoplay; encrypted-media; picture-in-picture"
      allowfullscreen
    ></iframe>
 </div>
</div>

    <!-- DÉGRADÉ DIAGONAL PAR-DESSUS LA VIDÉO -->
    <div class="pointer-events-none absolute inset-y-0 left-0 w-full z-20">
      <div
        class="w-full h-full bg-gradient-to-r from-[#111133] via-[#116766] to-[#55AB88]/40 "
        style="clip-path: polygon(0px 0px, 55% 0px, 65% 100%, 0px 100%);"
      ></div>
    </div>

    <!-- CONTENU TEXTE CENTRÉ DANS LE HERO -->
    <div
      class="relative z-30 max-w-6xl mx-auto px-6 py-24 flex items-center"
    >
      <div class="max-w-xl space-y-6">
        <p class="text-sm tracking-[0.25em] uppercase text-yellow-400">
          Architecte d’univers visuel
        </p>

        <h1 class="text-4xl md:text-5xl font-title font-extrabold leading-tight" style="font-family: title-font;">
          APPORTEZ UNE VISION CRÉATIVE<br />
          <span class="text-[#D28800]">À TOUS VOS PROJETS</span>
        </h1>

        <p class="text-sm md:text-base text-gray-300 max-w-md">
          Motion design, montage, tournage drone et photographie pour sublimer
          vos contenus vidéo.
        </p>

        <div class="pt-4">
          <a
            href="#videos"
            class="inline-flex items-center gap-2 rounded-full 
                   bg-gradient-to-r from-yellow-400 to-amber-600
                   px-6 py-3 text-sm font-semibold
                   text-white shadow-lg shadow-amber-500/30
                   hover:scale-105 hover:shadow-amber-500/50
                   transition-transform"
          >
          VOIR MES VIDÉOS
          </a>

        </div>
      </div>
    </div>
  </section>
</template>
