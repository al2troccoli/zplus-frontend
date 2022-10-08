<template>
  <zplus-page
    small
    :page-name="$t('animalCreation.pageName')">
    <template #sheetContent>
      <zplus-animals-form
        :creation-mode="true"
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
