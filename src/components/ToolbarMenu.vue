<template>
  <v-menu offset-y allow-overflow min-width="90vw" :position-x="5" max-height="100vh - 56px">
    <v-btn slot="activator" icon dark flat><v-icon>menu</v-icon></v-btn>
    <v-container class="white">
      <v-layout wrap column>
        <v-flex class="item">
          <v-layout wrap>
            <v-flex xs12>
              <v-btn-toggle :input-value="realm" class="elevation-0 float-right">
                <v-btn outline color="purple darken-3" value="ptr" @click.stop="$emit('change-realm')">PTR</v-btn>
              </v-btn-toggle>
            </v-flex>
            <v-flex xs12>
              <v-btn @click.stop="toggleVersionMenu" flat block>
                <span v-if="selectedVersion">{{ selectedVersion.name }} ({{ selectedVersionDate }})</span>
                <v-icon>arrow_drop_down</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="list">
          <collapse-transition>
            <version-list
              v-show="isVersionMenuOpen"
              :versions="versions"
              :selected="selectedVersion"
              :item-type="itemType"
              :item-id="itemId"
              :profile="profile"
              >
            </version-list>
          </collapse-transition>
        </v-flex>
        <v-flex class="item">
          <v-btn block flat @click.stop="toggleHeroMenu">Heroes<v-icon>arrow_drop_down</v-icon></v-btn>
        </v-flex>
        <v-flex class="list">
          <collapse-transition>
            <item-list
              v-show="isHeroMenuOpen"
              :items="heroes"
              :version="selectedVersion"
              :profile="profile"
              item-type="heroes"
              >
            </item-list>
          </collapse-transition>
        </v-flex>
        <v-flex class="item">
          <v-btn block flat @click.stop="toggleMountMenu">Mounts<v-icon>arrow_drop_down</v-icon></v-btn>
        </v-flex>
        <v-flex class="list">
          <collapse-transition>
            <item-list
              v-show="isMountMenuOpen"
              :items="mounts"
              :version="selectedVersion"
              :profile="profile"
              item-type="mounts"
              >
            </item-list>
          </collapse-transition>
        </v-flex>
      </v-layout>
    </v-container>
  </v-menu>
</template>

<style scoped>
  .float-right {
    float: right;
  }

  .item {
    border-bottom: 1px solid #DDDDDD;
  }
</style>

<script lang="ts">
  import Vue from 'vue'
  import { format } from 'date-fns'

  import { VERSION_DATE_FORMAT } from '../data/versions'
  import ItemList from './ItemList.vue'
  import VersionList from './VersionList.vue'

  export default Vue.extend({
    components: {
      "item-list": ItemList,
      "version-list": VersionList,
    },
    props: {
      realm: String,
      profile: String,
      itemType: String,
      itemId: String,
      selectedVersion: Object,
      versions: Array,
      heroes: Array,
      mounts: Array,
    },
    data: function() {
      return {
        isVersionMenuOpen: false,
        isHeroMenuOpen: false,
        isMountMenuOpen: false,
      }
    },
    computed: {
      selectedVersionDate: function() {
        return format(this.selectedVersion.releaseDate, VERSION_DATE_FORMAT)
      },
    },
    methods: {
      toggleVersionMenu: function() {
        this.isVersionMenuOpen = !this.isVersionMenuOpen
      },
      toggleHeroMenu: function() {
        this.isHeroMenuOpen = !this.isHeroMenuOpen
      },
      toggleMountMenu: function() {
        this.isMountMenuOpen = !this.isMountMenuOpen
      },
    },
  })
</script>
