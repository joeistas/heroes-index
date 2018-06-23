<template>
  <div :selected="selected" @click="onSelect()">
    <span>{{ mount.name }}</span>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    props: [ 'mount', 'versionNumber', 'realm', 'selected' ],
    methods: {
      onSelect: function() {
        this.$router.push({
          name: 'version',
          params: {
            realm: this.realm,
            version: this.versionNumber,
            item: 'mounts',
            itemId: this.mount.id,
          },
        })
      }
    }
  })
</script>
