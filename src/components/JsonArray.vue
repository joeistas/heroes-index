<template>
  <v-container grid-list-md class="px-0">
    <v-layout>
      <v-flex xs3>
        <v-btn flat class="json-object-key ma-0" @click="onClick()">
          {{ propertyKey }}
          <v-icon>{{ expand ? 'arrow_drop_up' : 'arrow_drop_down' }}</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <collapse-transition>
      <v-layout column v-show="expand" class="json-object-properties mx-3 mb-3">
        <v-flex v-for="(value, index) in propertyValue" xs11 class="json-object-property">
          <json-property :propertyValue="value"></json-property>
        </v-flex>
      </v-layout>
    </collapse-transition>
  </v-container>
</template>

<style scoped>
  .json-object-key {
    float: right;
    text-transform: none;
  }

  .json-object-properties {
    border-top: 1px solid #BDBDBD;
    border-bottom: 1px solid #BDBDBD;
  }

  .json-object-property {
    border-bottom: 1px solid #EEEEEE;
  }

  .json-object-property:last-child {
    border-bottom: none;
  }
</style>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: "json-array",
    components: {
      "json-property": () => import("./JsonProperty.vue")
    },
    props: {
      propertyKey: String,
      propertyValue: Array,
    },
    data: function() {
      return {
        expand: false,
      }
    },
    methods: {
      onClick: function() {
        this.expand = !this.expand
      },
    },
  })
</script>
