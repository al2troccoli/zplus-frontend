<template>
  <zplus-page :small="true">
    <template #sheetContent>
      <zplus-intro></zplus-intro>
    </template>
  </zplus-page>
</template>

<script>
import ZplusPage from '~/components/ZplusPage/ZplusPage'
import ZplusIntro from '~/components/ZplusIntro/ZplusIntro'

export default {
  name: 'IndexPage',
  components: { ZplusIntro, ZplusPage },
}
</script>
