<template>
  <div class="mt-1 pt-2 grey lighten-5" v-if="json$">
    <json-property v-for="(value, key) in json$" :key="key" :property-key="key" :property-value="value"></json-property>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { pluck } from 'rxjs/operators'

  import JsonProperty from './JsonProperty.vue'

  export default Vue.extend({
    components: {
      "json-property": JsonProperty
    },
    subscriptions: function() {
      const store$ = this.$store
      return {
        json$: store$.pipe(pluck('itemJSON')),
      }
    }
  })
</script>
