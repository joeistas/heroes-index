<template>
  <v-container grid-list-md>
    <v-layout align-center wrap class="ml-3">
      <json-property-key>{{ propertyKey }}</json-property-key>
      <json-property-value>
        <lightbox>
          <img slot="thumb" :src="imageSrc" height="50px" :alt="propertyValue" />
          <img :src="imageSrc"/>
        </lightbox>
      </json-property-value>
    </v-layout>
  </v-container>
</template>

<style scoped>
  >>> .lightbox-thumb {
    float: left;
  }
</style>
<script lang="ts">
  import Vue from 'vue'
  import { pluck } from 'rxjs/operators'

  import { buildAssetUrl } from '../data/base'
  import JsonPropertyKey from './JsonPropertyKey.vue'
  import JsonPropertyValue from './JsonPropertyValue.vue'
  import Lightbox from './Lightbox.vue'

  export default Vue.extend({
    name: "json-image",
    components: {
      "json-property-key": JsonPropertyKey,
      "json-property-value": JsonPropertyValue,
      "lightbox": Lightbox,
    },
    props: {
      propertyKey: String,
      propertyValue: String,
    },
    data: function() {
      return {
        lightboxOpen: false,
      }
    },
    computed: {
      imageSrc: function() {
        return buildAssetUrl(this.propertyValue, this.versionNumber$)
      }
    },
    subscriptions: function() {
      return {
        versionNumber$: this.$store.pipe(pluck('selectedVersion', 'buildNumber')),
      }
    }
  })
</script>
