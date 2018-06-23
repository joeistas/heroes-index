<template>
  <div v-if="item$">
    <h3>{{ item$.name }} -- {{ item$.id }}</h3>
    <div>
      {{ data }}
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { pluck } from 'rxjs/operators'

  export default Vue.extend({
    computed: {
      data: function() {
        return JSON.stringify(this.json$)
      }
    },
    subscriptions: function() {
      return {
        item$: this.$store.pipe(pluck('selectedItem')),
        json$: this.$store.pipe(pluck('itemJSON')),
      }
    }
  })
</script>
