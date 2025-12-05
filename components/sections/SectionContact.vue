<template>
  <section id="contact" class="relative py-20 bg-[#050518] text-white overflow-hidden">
    <div class="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-16 items-center relative">
      
      <!-- Colonne gauche : texte + formulaire -->
      <div class="relative z-10">
        <div class="text-center md:text-left mb-10">
          <h2 class="text-4xl md:text-5xl text-center font-extrabold mb-10" style="background-color: #0b0b1f;">
            ME <span class="text-[#55AB88]">CONTACTER</span>
          </h2>
          <p class="text-gray-400 max-w-xl">
            Un projet vidéo, un tournage drone, un reportage ou une séance photo en tête ? 
            Parlez-moi de vos besoins et je vous répondrai rapidement.
          </p>
        </div>

        <form class="grid gap-6" @submit.prevent="onSubmit">
          <!-- Nom + Email -->
          <div class="grid gap-6 md:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Nom / Prénom
              </label>
              <input
                v-model="form.name"
                type="text"
                name="name"
                class="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3
                       text-sm text-white placeholder-gray-500
                       focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                placeholder="Votre nom"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                v-model="form.email"
                type="email"
                name="email"
                class="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3
                       text-sm text-white placeholder-gray-500
                       focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                placeholder="vous@exemple.com"
                required
              />
            </div>
          </div>

          <!-- Sujet -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Sujet
            </label>
            <input
              v-model="form.subject"
              type="text"
              name="subject"
              class="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3
                     text-sm text-white placeholder-gray-500
                     focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              placeholder="Tournage, montage, drone, reportage..."
            />
          </div>

          <!-- Message -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <textarea
              v-model="form.message"
              name="message"
              rows="5"
              class="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3
                     text-sm text-white placeholder-gray-500
                     focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              placeholder="Parlez-moi de votre projet, de votre lieu, de vos besoins..."
              required
            ></textarea>
          </div>

          <!-- Messages de retour -->
          <div v-if="success" class="text-sm text-green-400">
            Merci, votre message a bien été envoyé.
          </div>
          <div v-if="error" class="text-sm text-red-400">
            Une erreur est survenue, veuillez réessayer plus tard.
          </div>

          <!-- Bouton -->
          <div class="flex md:justify-start justify-center">
            <button
              type="submit"
              :disabled="loading"
              class="inline-flex items-center gap-2 rounded-full 
                     bg-gradient-to-r from-yellow-400 to-amber-600
                     px-8 py-3 text-sm font-semibold uppercase tracking-wide
                     shadow-lg shadow-amber-500/30
                     hover:scale-105 hover:shadow-amber-500/50
                     transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span v-if="!loading">ENVOYER LE MESSAGE</span>
              <span v-else>ENVOI...</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Colonne droite : image -->
      <div class="relative h-80 md:h-full flex items-center justify-center">
        <img
          src="/images/reflex.PNG"
          alt="Décor contact"
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                 w-[180%] max-w-none opacity-50 pointer-events-none object-cover"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const runtimeConfig = useRuntimeConfig()
const API_BASE = runtimeConfig.public.apiBase

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const loading = ref(false)
const success = ref(false)
const error = ref(false)

const onSubmit = async () => {
  loading.value = true
  success.value = false
  error.value = false

  try {
    await $fetch('http://localhost:1337/api/contact/send', {
      method: 'POST',
      body: {
        name: form.value.name,
        email: form.value.email,
        subject: form.value.subject,
        message: form.value.message,
      },
    })

    success.value = true

    // reset du formulaire
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  } catch (e) {
    console.error(e)
    error.value = true
  } finally {
    loading.value = false
  }
}
</script>

