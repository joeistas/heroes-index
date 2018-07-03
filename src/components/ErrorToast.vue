<template>
  <v-snackbar color="red darken-4" top :value="error" :timeout="0">
    {{ error ? error.message : "Error" }}
    <v-btn dark flat @click="refreshPage()">Refresh</v-btn>
  </v-snackbar>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { filter } from 'rxjs/operators'

  import NotFoundError from '../models/NotFoundError'

  export default Vue.extend({
    props: {
      error: Object
    },
    methods: {
      refreshPage: function() {
        window.location.reload()
      }
    },
  })
</script>
