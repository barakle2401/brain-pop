<template>
  <Autocomplete
    v-model="query"
    @submit="onSubmit"
    :search="search"
    :get-result-value="getResultValue"
    placeholder="Search Timeline"
  >
    <template v-slot:suffix>
      <i class="fa fa-search"></i>
    </template>
  </Autocomplete>
</template>

<script>
import Autocomplete from "@trevoreyre/autocomplete-vue";
import "@trevoreyre/autocomplete-vue/dist/style.css";
import { mapGetters } from "vuex";
import { RESOURCES_TYPES } from "@/components/activities/constants";

export default {
  name: "SearchBar",
  components: {
    Autocomplete,
  },
  data() {
    return {
      query: "",
    };
  },
  computed: {
    ...mapGetters(["activities"]),
  },
  methods: {
    search() {
      return this.activities;
    },
    getResultValue(item) {
      //TODO: uppercase
      return `${item.topic_data.name} ${RESOURCES_TYPES[item.resource_type]}`;
    },
    onSubmit(result) {
      console.log(result);
    },
  },
};
</script>

<style scoped></style>
