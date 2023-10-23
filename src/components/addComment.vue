<template>
  <Transition name="slide-fade">
    <div v-if="showForm" class="flex justify-content-center add-comment">
      <form @submit="onSubmit" class="flex flex-column gap-2">
        <div class="fields">
          <div class="flex justify-content-center">
            <Rating
              v-model="form.start"
              :cancel="false"
              name="comment_start"
              :class="[errorStart ? 'p-invalid' : '', 'ratting-big']"
            />
            <small class="p-error">{{ errorStart || '&nbsp;' }}</small>
          </div>
          <div class="">
            <label for="comment-decription" class="d-none">Votre avis</label>
            <Textarea
              id="comment-decription"
              v-model="form.comment"
              :class="[errorMessage ? 'p-invalid' : '', 'w-100']"
              rows="4"
              aria-describedby="text-error"
              placeholder="Partagez votre expérience"
              name="comment_description"
            />
            <small class="p-error">{{ errorMessage || '&nbsp;' }}</small>
          </div>
          <div class="mb-4">
            <label for="comment-titre" class="d-none">Un titre</label>
            <InputText id="comment-titre" placeholder="Donner un titre" v-model="form.titre" />
          </div>
        </div>
        <div class="d-flex justify-content-end actions">
          <Button
            type="button"
            label="Annuler"
            icon="pi pi-times"
            severity="primary"
            text
            class="mr-5"
            outlined
            @click="showForm = !showForm"
          />
          <Button
            type="submit"
            icon="pi pi-check"
            label="Publier"
            :disabled="submitDisable"
            :loading="loading"
          />
        </div>
      </form>
    </div>
  </Transition>
  <div
    v-show="!showForm"
    :class="['d-flex justify-content-center', 'button-reation', showForm ? 'button-hide' : '']"
  >
    <Button
      type="button"
      label="Rediger un avis"
      icon="pi pi-user-edit"
      severity="secondary"
      outlined
      @click="showForm = !showForm"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useStore } from 'vuex'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Rating from 'primevue/rating'
import Textarea from 'primevue/textarea'
const store = useStore()
const form = computed(() => {
  return store.state.form
})
store.dispatch()
//import { useToast } from 'primevue/usetoast'
const { handleSubmit } = useForm()

// field: comment description
const { errorMessage } = useField(form.value.comment, validateComment)
function validateComment() {
  if (!form.value.comment) {
    return 'Votre avis est requis'
  }
  return true
}
const submitDisable = ref(true)
watch(store.state.form, () => {
  store.dispatch('ValidFormAddComment').then((resp) => {
    if (resp) submitDisable.value = false
    else submitDisable.value = true
  })
})

// field: comment description
const errorStart = ref(null)
const showForm = ref(false)
const loading = ref(false)

const onSubmit = handleSubmit(() => {
  console.log('onSubmit : ', form)
  if (!form.value.start) {
    errorStart.value = 'Vous devez selectionner au moins une etoile'
  } else {
    loading.value = true
    //
    store
      .dispatch('addComment')
      .then(() => {
        loading.value = false
        showForm.value = false
        store.dispatch('loadData', {})
        setTimeout(() => {
          store.commit('RESET_FORM')
        }, 500)
      })
      .catch(() => {
        loading.value = false
      })
  }
})
</script>
<style lang="scss">
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease-out;
  max-height: 500px;
  overflow: hidden;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
  max-height: 0;
}
.button-reation {
  transition: all 1s ease-out;
  max-height: 50px;
  opacity: 1;
  overflow: hidden;
  &.button-hide {
    transition: all 0.3s ease-out;
    opacity: 0;
    max-height: 0;
  }
}
</style>
