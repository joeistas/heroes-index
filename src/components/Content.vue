<template>
  <v-layout column>
    <v-flex xs12 class="grey lighten-5">
      <h1 class="display-1 ml-4 my-3" v-if="selectedItem$">{{ selectedItem$.name }}</h1>
      <item-toolbar></item-toolbar>
    </v-flex>
    <v-flex xs12>
      <json-content></json-content>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { pluck, filter } from 'rxjs/operators'

  import JsonContent from './JsonContent.vue'
  import ItemToolbar from './ItemToolbar.vue'

  export default Vue.extend({
    components: {
      'json-content': JsonContent,
      'item-toolbar': ItemToolbar,
    },
    subscriptions: function() {
      return {
        selectedItem$: this.$store.pipe(pluck('selectedItem'), filter(item => item !== null)),
      }
    }
  })
</script>
