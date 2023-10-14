<template>
  <div class="card flex justify-content-center p-2">
    <div>
      <Button type="button" label="Rediger un avis" icon="pi pi-user-edit" />
    </div>
    <form @submit="onSubmit" class="flex flex-column gap-2">
      <div class="card flex justify-content-center">
        <Rating
          v-model="form.start"
          :cancel="false"
          name="comment_start"
          :class="[errorStart ? 'p-invalid' : '', '']"
        />
        <small class="p-error">{{ errorStart || '&nbsp;' }}</small>
      </div>
      <div class="p-float-label mb-4 mt-4">
        <Textarea
          id="comment-decription"
          v-model="form.comment"
          :class="[errorMessage ? 'p-invalid' : '', 'w-100']"
          rows="4"
          aria-describedby="text-error"
          placeholder="Partagez votre expérience"
          name="comment_description"
        />
        <label for="comment-decription">Votre avis</label>
        <small class="p-error">{{ errorMessage || '&nbsp;' }}</small>
      </div>
      <div class="p-float-label mb-4">
        <InputText id="comment-titre" placeholder="Donner un titre" v-model="form.titre" />
        <label for="comment-titre">Un titre</label>
      </div>
      <Button type="submit" label="Submit" />
    </form>
    <pre> form: {{ form }} </pre>
    <pre> errorMessage : {{ errorMessage }} </pre>
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
