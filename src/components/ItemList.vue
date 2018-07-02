<template>
  <v-list>
    <v-layout wrap>
      <item-component
        v-for="item in items"
        :key="item.id"
        :item="item"
        :versionNumber="version.buildNumber"
        :to="routerTo(item)"
        >
      </item-component>

    </v-layout>
  </v-list>
</template>

<style scoped>
  a {
    text-decoration: none;
    color: inherit;
  }
</style>

<script lang="ts">
  import Vue from 'vue'

  import Item from './Item.vue'

  export default Vue.extend({
    components: {
      "item-component": Item
    },
    props: [ 'items', 'itemType', 'version' ],
    methods: {
      routerTo: function(item: any) {
        if(!item || !item.id) {
          console.log(this.items)
          console.log(this.items.indexOf(item))
        }
        return {
          name: 'version',
          params: {
            realm: this.version.realm,
            version: this.version.buildNumber,
            item: this.itemType,
            itemId: item.id ? item.id.toLowerCase() : undefined,
          },
        }
      },
    }
  })
</script>
