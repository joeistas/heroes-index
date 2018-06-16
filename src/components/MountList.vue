<template>
  <v-layout row wrap>
    <v-flex v-for="mount in mounts" :key="mount.id">
      <mount-item
        :mount="mount"
        :selected="isSelected(mount)"
        @click="onSelect(mount)"
        >
      </mount-item>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import Vue from 'vue'

  import MountItem from './MountItem.vue'

  export default Vue.extend({
    components: {
      "mount-item": MountItem
    },
    props: [ 'mounts', 'realm', 'version', 'selected' ],
    methods: {
      onSelect: function(item: any) {
        this.router$.push({
          name: 'version',
          params: {
            realm: this.realm,
            version: this.version.buildNumber,
            item: 'mounts',
            itemId: item.id,
          },
        })
      },
      isSelected: function(mount: any) {
        if(!this.selected) {
          return false
        }

        return mount.id === this.selected.id
      },
    },
  })
</script>
