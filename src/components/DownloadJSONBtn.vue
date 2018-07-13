<template>
  <v-btn
    flat
    color="purple darken-3"
    :href="jsonBlobURL"
    :disabled="!jsonBlobURL"
    :download="jsonFilename"
    >
    JSON
  </v-btn>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { pluck, filter } from 'rxjs/operators'

  export default Vue.extend({
    name: 'download-json-btn',
    computed: {
      jsonBlob: function() {
        if(!this.json$) {
          return null
        }

        return new Blob([ JSON.stringify(this.json$, null, 2) ], { type: "application/json" })
      },
      jsonBlobURL: function() {
        if(!this.jsonBlob) {
          return null
        }

        return URL.createObjectURL(this.jsonBlob)
      },
      jsonFilename: function() {
        if(!this.item$ || !this.version$) {
          return null
        }
        return [ this.item$.name, this.params$.profile, this.version$.buildNumber ].join("-").toLowerCase() + ".json"
      },
    },
    subscriptions: function() {
      const store$ = this.$store

      return {
        params$: store$.pipe(pluck('params')),
        version$: store$.pipe(pluck('selectedVersion'), filter(version => version !== null)),
        item$: store$.pipe(pluck('selectedItem'), filter(item => item !== null)),
        json$: store$.pipe(pluck('itemJSON'), filter(json => json !== null))
      }
    }
  })
</script>
