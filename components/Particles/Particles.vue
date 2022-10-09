<template>
  <div id="particle-container">
    <div
      v-for="part in particleAmount"
      :key="part"
      class="particle"></div>
  </div>
</template>

<script>
/**
 * @description Particles animation component
 * @module Particles
 * @category Components
 *
 * @vue-data {number} particleAmount - Amount of particles
 */

export default {
  name: 'ZplusParticles',

  data() {
    return {
      particleAmount: 70
    }
  }
}
</script>

<style lang='scss' scoped>
.particle {
  position: absolute;
  border-radius: 50%;
}

@for $i from 1 through 70 {
  @keyframes particle-animation-#{$i} {
    100% {
      transform: translate3d((random(90) * 1vw), (random(90) * 1vh), (random(100) * 1px));
    }
  }

  .particle:nth-child(#{$i}){
    animation: particle-animation-#{$i} 60s infinite;
    $size: random(5) + 5 + px;
    opacity: random(100)/100;
    height: $size;
    width: $size;
    animation-delay: -$i * .2s;
    transform: translate3d((random(90) * 1vw), (random(90) * 1vh), (random(100) * 1px));
    background: hsl(random(360), 70%, 50%);
  }
}
</style>
