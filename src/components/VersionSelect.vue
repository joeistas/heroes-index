<template>
  <v-menu id="#version-select">
    <version slot="activator" :version="selected" ></version>
    <v-list dense two-line>
      <version-item
        v-for="version in versions"
        :key="version.buildNumber"
        :version="version"
        @click="onSelect(version)"
        >
      </version-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { combineLatest } from 'rxjs'
  import { startWith, pluck, share, map } from 'rxjs/operators'

  import Version from './Version.vue'
  import VersionItem from './VersionItem.vue'
  import { getStoreObservable } from '../data/store'
  import { fetchAllVersions } from '../data/versions'

  export default Vue.extend({
    components: {
      'version': Version,
      'version-item': VersionItem,
    },
    props: {
      realm: String,
      selected: Object,
      versions: Array,
    },
    computed: {
      ptr: function() {
        return this.realm$ === 'ptr'
      }
    },
    methods: {
      onSelect: function(version) {
        this.$router.push({ name: 'version', params: { realm: this.realm$, version: version.buildNumber }})
      }
    },
  })
</script>
