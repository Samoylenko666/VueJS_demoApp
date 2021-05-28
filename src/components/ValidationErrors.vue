<template>
  <ul class="error-messages">
    <li v-for="errorsMessage in errorsMessages" :key="errorsMessage"> {{errorsMessage}} </li>
  </ul> 


</template>
<script>
export default {
  name: "AppValidationErrors",
  props: {
    propvalidationErrors: {
      type: Object,
      required: true,
    },
  },
  computed:{
    errorsMessages(){
      return Object.keys(this.propvalidationErrors).map(name=>{
        const messages = this.propvalidationErrors[name].join(', ')
        return `${name} ${messages}`
      })
    }
  }
};
</script>
