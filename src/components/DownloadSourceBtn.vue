<template>
  <v-btn
    flat
    color="purple darken-3"
    :href="sourceURL"
    :disabled="!sourceURL"
    :download="sourceFilename"
    >
    Source
  </v-btn>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { pluck, filter } from 'rxjs/operators'

  import { buildAssetUrl } from '../data/base'

  export default Vue.extend({
    name: 'download-json-btn',
    computed: {
      sourceURL: function() {
        if(!this.version$) {
          return null
        }

        return buildAssetUrl('source.zip', this.version$.buildNumber)
      },
      sourceFilename: function() {
        if(!this.version$) {
          return null
        }
        return `source-${ this.version$.buildNumber }.zip`
      },
    },
    subscriptions: function() {
      const store$ = this.$store

      return {
        version$: store$.pipe(pluck('selectedVersion'), filter(version => version !== null)),
      }
    }
  })
</script>
