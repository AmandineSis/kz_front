// utils/resolveSectionComponent.js

import SectionHero from '~/components/sections/SectionHero.vue'
// tu rajouteras About, etc, plus tard si besoin
// import SectionAbout from '~/components/sections/SectionAbout.vue'

const sectionMap = {
  'section.hero': SectionHero,
  // 'section.about': SectionAbout,
}

export function resolveSectionComponent(type) {
  return sectionMap[type] || null
}
