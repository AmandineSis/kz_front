<template>
  <div id="top" class="min-h-screen flex-col" >


    <!-- Header -->
    <header
      
      class="fixed left-0 top-0 z-50 w-full text-white shadow-lg"
     style="background-color: #100A2F; font-family: highlight-font;"
    >
      <nav class="mx-auto flex max-w-6xl items-center justify-between px-6    py-4">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 text-xl">
          <img src="/images/logo-header.png" alt="Logo" class="h-20" />
        </NuxtLink>
      
        <!-- Links -->
        <div class="hidden gap-8 md:flex text-sm">
          <NuxtLink to="/" class="hover:text-[#FFC800]">ACCUEIL</NuxtLink>
          <a href="#videos" class="hover:text-[#FFC800]">VIDÉOS</a>
          <a href="#photos" class="hover:text-[#FFC800]">PHOTOS</a>
          <a href="#about" class="hover:text-[#FFC800]">À PROPOS</a>
          <a href="#contact" class="hover:text-[#FFC800]">CONTACT</a>
        </div>
      </nav>
    </header>


    <!-- Main content -->
    <main class="flex-1 pt-20">
      <slot />
    </main>

<!-- BOUTONS FIXES RESEAUX + FLECHE -->
<div
  class="fixed right-4 bottom-6 z-40 flex flex-col items-center gap-3 text-white"
>
 <!-- Flèche vers le haut -->
  <a
  href="#top"
  class="w-10 h-10 rounded-full border border-white/40 bg-white/5 backdrop-blur-sm
         flex items-center justify-center hover:bg-[#FFC800] hover:border-[#FFC800]
         transition"
  aria-label="Remonter en haut de la page"
>
    <!-- Icône flèche -->
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor"
      class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M12 19V5m0 0l-6 6m6-6l6 6" />
    </svg>
  </a>

  <!-- Instagram -->
  <a
    href="https://www.instagram.com/ton_compte"
    target="_blank"
    rel="noopener noreferrer"
    class="w-10 h-10 rounded-full border border-white/40 bg-white/5 backdrop-blur-sm
           flex items-center justify-center hover:bg-pink-600 hover:border-pink-400
           transition"
    aria-label="Instagram"
  >
    <!-- LOGO INSTAGRAM -->
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      stroke-width="1.7" stroke="currentColor" class="w-6 h-6">
      <path
        d="M7.75 2.5h8.5A5.75 5.75 0 0 1 22 8.25v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.75v-8.5A5.75 5.75 0 0 1 7.75 2.5Zm8.75 5.25a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM12 8.25A3.75 3.75 0 1 0 12 15.75 3.75 3.75 0 0 0 12 8.25Z"
      />
    </svg>
  </a>

  <!-- Facebook -->
  <a
    href="https://www.facebook.com/ta_page"
    target="_blank"
    rel="noopener noreferrer"
    class="w-10 h-10 rounded-full border border-white/40 bg-white/5 backdrop-blur-sm
           flex items-center justify-center hover:bg-blue-600 hover:border-blue-400
           transition"
    aria-label="Facebook"
  >
    <!-- LOGO FACEBOOK -->
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
      viewBox="0 0 24 24" class="w-6 h-6">
      <path
        d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 2 .1v2.3h-1.1c-1 0-1.3.6-1.3 1.2V12h2.5l-.4 3h-2.1v7A10 10 0 0 0 22 12Z"
      />
    </svg>
  </a>

 

</div>

 
    <!-- Footer -->
   <footer class="w-full bg-black text-white py-10  border-t border-white/10" style="background-color: #100A2F; font-family: content-font;">
  <div class="container mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

    <!-- Zone logo + copyright -->
    <div class="flex flex-row items-center gap-3">
      <img
        src="/images/logo-header.png"
        alt="Craft CODE"
        class="h-20 w-auto"
      />

      <p class="text-sm text-gray-400">
        © KZ MOTION 2025 — Tous droits réservés
      </p>
    </div>

    <!-- Liens réglementaires -->
    <div class="flex flex-col md:flex-row items-start md:items-center gap-3 text-sm">

      <NuxtLink
        to="/mentions-legales"
        class="text-gray-400 hover:text-purple-400 transition"
      >
        Mentions légales
      </NuxtLink>

      <span class="hidden md:block text-gray-500">•</span>

      <NuxtLink
        to="/politique-de-confidentialite"
        class="text-gray-400 hover:text-purple-400 transition"
      >
        Politique de confidentialité
      </NuxtLink>

    </div>
  </div>
</footer>


  </div>
</template>
