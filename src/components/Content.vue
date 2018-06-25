<template>
  <v-layout column>
    <v-flex xs12>
      <version-select
        :realm="realm$"
        :selected="selectedVersion$"
        :versions="versions$"
        >
      </version-select>
      <item-select></item-select>
    </v-flex>
    <v-flex xs12>
      <json-content></json-content>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { pluck, map } from 'rxjs/operators'

  import { getStoreObservable } from '../data/store'
  import VersionSelect from './VersionSelect.vue'
  import ItemSelect from './ItemSelect.vue'
  import JsonContent from './JsonContent.vue'

  export default Vue.extend({
    components: {
      'version-select': VersionSelect,
      'item-select': ItemSelect,
      'json-content': JsonContent,
    },
    subscriptions: function() {
      return {
        realm$: this.$store.pipe(pluck('params', 'realm')),
        selectedVersion$: this.$store.pipe(pluck('selectedVersion')),
        versions$: this.$store.pipe(pluck('versions')),
      }
    }
  })
</script>
