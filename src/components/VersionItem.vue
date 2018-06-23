<template>
  <v-list-tile class="version" @click="onSelect()">
    <v-list-tile-content>
      <v-list-tile-title>{{ version.name }}</v-list-tile-title>
      <v-list-tile-sub-title>{{ version.releaseDate }} - {{ version.buildNumber }}</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script lang="ts">
  import Vue from "vue"

  export default Vue.extend({
    props: {
      version: Object
    },
    methods: {
      onSelect: function() {
        this.$router.push({ name: 'version', params: { realm: this.version.realm, version: this.version.buildNumber }})
      }
    },
  })
</script>
