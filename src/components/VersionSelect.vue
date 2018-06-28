<template>
  <v-menu id="#version-select" offset-y left>
    <v-btn slot="activator" flat dark>
      <span v-if="selected">{{ selected.name }}</span>
      <v-icon>arrow_drop_down</v-icon>
    </v-btn>
    <v-list dense two-line>
      <version-item
        v-for="version in versions"
        :key="version.buildNumber"
        :version="version"
        >
      </version-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { combineLatest } from 'rxjs'
  import { startWith, pluck, share, map } from 'rxjs/operators'

  import VersionItem from './VersionItem.vue'
  import { getStoreObservable } from '../data/store'
  import { fetchAllVersions } from '../data/versions'

  export default Vue.extend({
    components: {
      'version-item': VersionItem,
    },
    props: {
      selected: Object,
      versions: Array,
    },
    methods: {
      onSelect: function(version) {
        this.$router.push({ name: 'version', params: { realm: version.realm, version: version.buildNumber }})
      }
    },
  })
</script>
