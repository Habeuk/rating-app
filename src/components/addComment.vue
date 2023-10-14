<template>
  <div class="flex justify-content-center add-comment">
    <div class="d-none">
      <Button
        type="button"
        label="Rediger un avis"
        icon="pi pi-user-edit"
        severity="secondary"
        text
      />
    </div>
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
          icon="pi pi-user-edit"
          severity="primary"
          text
          class="mr-5"
          outlined
        />
        <Button type="submit" label="Publier" :disabled="submitDisable" />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useStore } from 'vuex'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Rating from 'primevue/rating'
import Textarea from 'primevue/textarea'
const store = useStore()
const form = store.state.form
//import { useToast } from 'primevue/usetoast'
const { handleSubmit, resetForm } = useForm()

// field: comment description
const { errorMessage } = useField(form.comment, validateComment)
function validateComment() {
  console.log('validateComment : ', form.comment)
  if (!form.comment) {
    console.log('error')
    return 'Votre avis est requis'
  }
  return true
}

const submitDisable = ref(true)
// field: comment description
const errorStart = ref(null)

const onSubmit = handleSubmit(() => {
  console.log('ssd :: ', form)
  if (!form.start) {
    errorStart.value = 'Vous devez selectionner au moins une etoile'
  } else {
    resetForm()
  }
})
</script>
