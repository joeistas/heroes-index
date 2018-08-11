<template>
  <v-toolbar class="purple darken-3" app>
    <v-toolbar-title><router-link to="/">HeroesIndex</router-link></v-toolbar-title>
    <v-toolbar-items class="ml-2 hidden-sm-and-down">
      <v-menu offset-y max-height="80vh">
        <v-btn slot="activator" flat dark>Heroes<v-icon>arrow_drop_down</v-icon></v-btn>
        <item-list :items="heroes$" :version="selectedVersion$" item-type="heroes" :profile="profile$"></item-list>
      </v-menu>
      <v-menu offset-y allow-overflow max-height="80vh">
        <v-btn slot="activator" dark flat>Mounts<v-icon>arrow_drop_down</v-icon></v-btn>
        <item-list :items="mounts$" :version="selectedVersion$" item-type="mounts" :profile="profile$"></item-list>
      </v-menu>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items class="mr-2 hidden-sm-and-down">
      <version-select
        :selected="selectedVersion$"
        :versions="versions$"
        :item-type="itemType$"
        :item-id="!!selectedItem$ ? selectedItem$.id : null"
        :profile="profile$"
        >
      </version-select>
    </v-toolbar-items>
    <v-btn-toggle :input-value="realm$" class="elevation-0 hidden-sm-and-down mr-3">
      <v-btn value="ptr" @click="onPtrClick()">PTR</v-btn>
    </v-btn-toggle>
    <v-toolbar-items class="hidden-md-and-up">
      <toolbar-menu
        :realm="realm$"
        :selected-version="selectedVersion$"
        :versions="versions$"
        :heroes="heroes$"
        :mounts="mounts$"
        :profile="profile$"
        :item-type="itemType$"
        :item-id="!!selectedItem$ ? selectedItem$.id : null"
        @change-realm="onPtrClick()"
        >
      </toolbar-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<style scoped>
  a {
    color: #FFFFFF;
    text-decoration: none;
  }

  .v-toolbar__content .v-btn-toggle .v-btn {
    color: #FFFFFF;
    background-color: #6A1B9A;
    border: #FFFFFF solid 1px;
    opacity: 1;
  }

  .v-toolbar__content .v-btn-toggle .v-btn:hover {
    color: #FFFFFFFF;
    border: #FFFFFFFF solid 1px;
  }

  .v-toolbar__content .v-btn-toggle .v-btn--active,
  .v-toolbar__content .v-btn-toggle .v-btn--active:hover {
    color: #6A1B9A;
    border-color: #6A1B9A;
    background-color: #FFFFFF;
  }

  .v-toolbar.v-toolbar--fixed {
    z-index: 100;
  }
</style>

<script lang="ts">
  import Vue from 'vue'
  import { combineLatest } from 'rxjs'
  import { map, pluck, filter } from 'rxjs/operators'

  import ItemList from './ItemList.vue'
  import VersionSelect from './VersionSelect.vue'
  import ToolbarMenu from './ToolbarMenu.vue'

  export default Vue.extend({
    components: {
      "item-list": ItemList,
      "version-select": VersionSelect,
      "toolbar-menu": ToolbarMenu,
    },
    methods: {
      onPtrClick: function() {
        const realm = this.realm$ === 'ptr' ? 'live' : 'ptr'
        
        this.$router.push({
          name: 'version',
          params: {
            realm,
            version: this.allVersions$[realm][0].buildNumber,
            item: this.itemType$,
            itemId: this.selectedItem$.id,
            profile: this.profile$,
          }
        })
      },
    },
    subscriptions: function() {
      const selectedItem$ = this.$store.pipe(pluck('selectedItem'), filter(item => item !== null))
      const itemType$ = this.$store.pipe(pluck('params', 'itemType'))
      const versionDetails$ = this.$store.pipe(
        pluck('versionDetails'),
        filter(details => !!details),
      )

      return {
        itemType$,
        selectedItem$,
        realm$: this.$store.pipe(pluck('params', 'realm')),
        profile$: this.$store.pipe(pluck('params', 'profile')),
        selectedVersion$: this.$store.pipe(pluck('selectedVersion'), filter(version => version !== null)),
        selectedHero$: combineLatest(itemType$, selectedItem$).pipe(map(([ itemType, item ]) => itemType === 'heroes' ? item : {})),
        selectedMount$: combineLatest(itemType$, selectedItem$).pipe(map(([ itemType, item ]) => itemType === 'mounts' ? item : {})),
        heroes$: versionDetails$.pipe(pluck('heroes')),
        mounts$: versionDetails$.pipe(pluck('mounts')),
        versions$: this.$store.pipe(pluck('versions')),
        allVersions$: this.$store.pipe(pluck('allVersions')),
      }
    },
  })
</script>
