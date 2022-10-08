<template>
  <zplus-page :page-name="$t('animalsList.pageName')">
    <template #sheetContent>
      <zplus-animals-table></zplus-animals-table>
    </template>
  </zplus-page>
</template>

<script>
import ZplusPage from '~/components/ZplusPage/ZplusPage'
import ZplusAnimalsTable from '~/components/ZplusAnimalsCrud/ZplusAnimalsTable'
export default {
  name: 'IndexPage',
  components: { ZplusAnimalsTable, ZplusPage },
}
</script>
