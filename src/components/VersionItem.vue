<template>
  <v-list-tile @click="onSelect()">
    <v-list-tile-content>
      <v-list-tile-title class="text-xs-right">{{ version.name }}</v-list-tile-title>
      <v-list-tile-sub-title class="text-xs-right">{{ versionDate }} - {{ version.buildNumber }}</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script lang="ts">
  import Vue from "vue"

  import { format } from 'date-fns'

  export default Vue.extend({
    props: {
      version: Object
    },
    computed: {
      versionDate: function() {
        return format(this.version.releaseDate, "M/D/YYYY")
      },
    },
    methods: {
      onSelect: function() {
        this.$router.push({ name: 'version', params: { realm: this.version.realm, version: this.version.buildNumber }})
      }
    },
  })
</script>
