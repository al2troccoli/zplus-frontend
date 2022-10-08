<template>
  <zplus-page
    small
    :page-name="$t('animalDetails.pageName')">
    <template #sheetContent>
      <zplus-animals-form
        :creation-mode="false"
      />
    </template>
  </zplus-page>
</template>

<script>
import ZplusPage from '~/components/ZplusPage/ZplusPage'
import ZplusAnimalsForm from '~/components/ZplusAnimalsCrud/ZplusAnimalsForm'
export default {
  name: 'NewAnimal',
  components: { ZplusAnimalsForm, ZplusPage },
}
</script>
