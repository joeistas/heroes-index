<template>
  <v-toolbar class="purple darken-3" app>
    <v-toolbar-title><router-link to="/">HeroesIndex</router-link></v-toolbar-title>
    <v-toolbar-items class="ml-2">
      <v-menu offset-y max-height="80vh">
        <v-btn slot="activator" flat dark>Heroes<v-icon>arrow_drop_down</v-icon></v-btn>
        <item-list :items="heroes$" :version="selectedVersion$" itemType="heroes"></item-list>
      </v-menu>
      <v-menu offset-y allow-overflow max-height="80vh">
        <v-btn slot="activator" dark flat>Mounts<v-icon>arrow_drop_down</v-icon></v-btn>
        <item-list :items="mounts$" :version="selectedVersion$" itemType="mounts"></item-list>
      </v-menu>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <version-select :selected="selectedVersion$" :versions="versions$"></version-select>
    </v-toolbar-items>
    <v-btn-toggle :input-value="realm$" class="elevation-0">
      <v-btn outline dark color="white" text-color="purple darken-3" value="ptr" @click="onPtrClick()">PTR</v-btn>
    </v-btn-toggle>
  </v-toolbar>
</template>

<style scoped>
  a {
    color: #FFFFFF;
    text-decoration: none;
  }
</style>

<script lang="ts">
  import Vue from 'vue'
  import { combineLatest, merge, Subject } from 'rxjs'
  import { map, pluck, tap, scan, filter } from 'rxjs/operators'

  import { getStoreObservable } from '../data/store'
  import ItemList from './ItemList.vue'
  import VersionSelect from './VersionSelect.vue'

  export default Vue.extend({
    components: {
      "item-list": ItemList,
      "version-select": VersionSelect,
    },
    methods: {
      onPtrClick: function() {
        this.$router.push({
          name: 'version',
          params: {
            realm: this.realm$ === 'ptr' ? 'live' : 'ptr'
          }
        })
      },
    },
    subscriptions: function() {
      const selectedItem$ = this.$store.pipe(pluck('selectedItem'))
      const itemType$ = this.$store.pipe(pluck('params', 'itemType'))

      return {
        realm$: this.$store.pipe(pluck('params', 'realm')),
        itemType$,
        selectedVersion$: this.$store.pipe(pluck('selectedVersion')),
        selectedHero$: combineLatest(itemType$, selectedItem$).pipe(map(([ itemType, item ]) => itemType === 'heroes' ? item : {})),
        selectedMount$: combineLatest(itemType$, selectedItem$).pipe(map(([ itemType, item ]) => itemType === 'mounts' ? item : {})),
        heroes$: this.$store.pipe(pluck('versionDetails', 'heroes')),
        mounts$: this.$store.pipe(pluck('versionDetails', 'mounts')),
        versions$: this.$store.pipe(pluck('versions')),
        activeTab$: itemType$.pipe(map(itemType => itemType === 'heroes' ? '0' : '1')),
      }
    },
  })
</script>
