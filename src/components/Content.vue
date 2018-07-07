<template>
  <v-layout column>
    <v-flex xs12 class="grey lighten-5">
      <h1 class="display-1 ml-2 my-3" v-if="selectedItem$">{{ selectedItem$.name }}</h1>
      <profile-selector></profile-selector>
    </v-flex>
    <v-flex xs12>
      <json-content></json-content>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { pluck, filter } from 'rxjs/operators'

  import { buildAssetUrl } from '../data/base'
  import JsonContent from './JsonContent.vue'
  import ProfileSelector from './ProfileSelector.vue'

  export default Vue.extend({
    components: {
      'json-content': JsonContent,
      'profile-selector': ProfileSelector,
    },
    data: function() {
      return {
        toolbarOpen: false
      }
    },
    methods: {
      bannerClick: function() {
        this.toolbarOpen = !this.toolbarOpen
      },
    },
    subscriptions: function() {
      return {
        versionNumber$: this.$store.pipe(pluck('selectedVersion', 'buildNumber')),
        selectedItem$: this.$store.pipe(pluck('selectedItem'), filter(item => item !== null)),
        json$: this.$store.pipe(pluck('itemJSON'))
      }
    }
  })
</script>
