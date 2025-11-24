<template>
  <div class="flex min-h-screen flex-col bg-black">

    <!-- Header -->
    <header class="fixed left-0 top-0 z-50 w-full text-white font-highlight" style="font-family: highlight-font">
      <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 text-xl">
          <img src="/images/logo-header.png" alt="Logo" class="h-20
          " />
        </NuxtLink>

        <!-- Links -->
        <div class="hidden gap-8 md:flex text-sm">
          <NuxtLink to="/" class="hover:text-primary">ACCUEIL</NuxtLink>
          <a href="#about" class="hover:text-primary">À PROPOS</a>
          <a href="#videos" class="hover:text-primary">VIDÉOS</a>
          <a href="#contact" class="hover:text-primary">CONTACT</a>
        </div>

      </nav>
    </header>


    <!-- Main content -->
    <main class="flex-1 pt-20">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t py-6 text-center text-sm text-gray-500">
      © {{ new Date().getFullYear() }} — Mon Site
    </footer>

  </div>
</template>
