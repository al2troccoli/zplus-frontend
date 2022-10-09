<template>
  <v-app class="zplus-app">
    <zplus-particles :particle-amount="50"/>
    <v-app-bar app>
      <img src="/zooplus.png" alt="Zooplus logo" class="zplus-app__logo" />
      <v-toolbar-title class="zplus-app__title"  v-text="title"/>
      <v-spacer />
      <zplus-language/>
    </v-app-bar>
    <v-main>
      <v-container>
        <zplus-alert/>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app class="zplus-app__footer">
      <span>{{ author }} - &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import ZplusAlert from '../components/ZplusAlert/ZplusAlert'
import ZplusParticles from '../components/Particles/Particles'
import ZplusLanguage from '~/components/Language/ZplusLanguage'
export default {
  name: 'DefaultLayout',
  components: { ZplusAlert, ZplusParticles, ZplusLanguage },
  data() {
    return {
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      title: ' | Code Challenge',
      author: 'Aldo Troccoli'
    }
  },
  methods: {
    homeBtnHandler() {
      return ''
    }
  }
}
</script>
<style lang='scss' scoped>
.zplus-app {
  background-image: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);
  background-color: #CDDCDC;
  background-image: radial-gradient(at 50% 100%, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%), linear-gradient(to bottom, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0.25) 100%);
  background-blend-mode: screen, overlay;

  &__logo {
    height: rem(40);
    width: auto;
  }

  :deep(.v-toolbar__title) {
    font-size: var(--fontSizeV3);
    margin-left: var(--spacingSmall);
    color: var(--colorGreyDark);
  }

  &__footer {
    background-color: var(--colorPrimaryMid);
    color: var(--colorGreyUltralight);
  }
}
</style>
