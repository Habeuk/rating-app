<template>
  <div class="card flex justify-content-center">
    <form @submit="onSubmit" class="flex flex-column gap-2">
      <div class="card flex justify-content-center">
        <Rating v-model="form.start" :cancel="false" name="comment_start" />
        <small class="p-error">{{ errorStart || '&nbsp;' }}</small>
      </div>
      <div class="p-float-label">
        <Textarea
          id="value"
          v-model="form.comment"
          :class="[errorMessage ? 'p-invalid' : '', 'w-100']"
          rows="4"
          cols="30"
          aria-describedby="text-error"
        />
        <label for="value">Description</label>
        <small id="text-error" class="p-error">{{ errorMessage || '&nbsp;' }}</small>
      </div>
      <div class="p-float-label mb-4">
        <InputText id="comment-titre" placeholder="Donner un titre" v-model="form.titre" />
        <label for="comment-titre">Un titre</label>
      </div>

      <Button type="submit" label="Submit" />
    </form>
    <pre> form : {{ form }} </pre>
    <pre> errorMessage : {{ errorMessage }} </pre>
  </div>
</template>

<script setup>
import { ref } from 'vue'
//import { useToast } from 'primevue/usetoast'
import { useStore } from 'vuex'
const store = useStore()
const form = store.state.form
import { useField, useForm } from 'vee-validate'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import InputText from 'primevue/inputtext'
import Rating from 'primevue/rating'
const { handleSubmit, resetForm } = useForm({
  //initialValues: form
})
//
const { errorMessage } = useField(form.comment, validateField)
function validateField() {
  if (!form.comment) {
    return 'Description is required.'
  }
  return true
}
//
// field: comment description
const errorStart = ref(null)

const onSubmit = handleSubmit(() => {
  errorStart.value = false
  console.log('ssd :: ', form)
  if (!form.start) {
    errorStart.value = 'Vous devez selectionner au moins une etoile'
  } else {
    resetForm()
  }
})
</script>
