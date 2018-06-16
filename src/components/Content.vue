<template>
  <v-layout row>
    <v-flex>
      <h1>Hello</h1>
      <version-select
        :realm="realm$"
        :selected="selectedVersion$"
        :versions="versions$"
        >
      </version-select>
      <item-select></item-select>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { pluck, map, startWith } from 'rxjs/operators'

  import { getStoreObservable } from '../data/store'
  import VersionSelect from './VersionSelect.vue'
  import ItemSelect from './ItemSelect.vue'

  export default Vue.extend({
    components: {
      'version-select': VersionSelect,
      'item-select': ItemSelect,
    },
    subscriptions: function() {
      return {
        realm$: getStoreObservable(this, 'realm$'),
        selectedVersion$: getStoreObservable(this, 'selectedVersion$'),
        versions$: getStoreObservable(this, 'versions$'),
      }
    }
  })
</script>
