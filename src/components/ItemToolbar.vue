<template>
  <v-toolbar tabs class="elevation-0" color="transparent">
    <profile-selector></profile-selector>
    <v-spacer></v-spacer>
    <download-source-btn class="hidden-xs-only"></download-source-btn>
    <download-json-btn class="hidden-xs-only"></download-json-btn>
  </v-toolbar>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { pluck, filter } from 'rxjs/operators'

  import DownloadJSONBtn from './DownloadJSONBtn.vue'
  import DownloadSourceBtn from './DownloadSourceBtn.vue'
  import ProfileSelector from './ProfileSelector.vue'


  export default Vue.extend({
    name: "item-toolbar",
    components: {
      "profile-selector": ProfileSelector
      "download-json-btn": DownloadJSONBtn
      "download-source-btn": DownloadSourceBtn
    },
  })
</script>
