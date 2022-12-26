<template>
  <div class="autocomplete-wrapper">
    <Autocomplete
      @submit="onSubmit"
      :search="search"
      :get-result-value="getResultValue"
      placeholder="Search Timeline"
    >
      <template v-slot:suffix>
        <i class="fa fa-search"></i>
      </template>
    </Autocomplete>
  </div>
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
  computed: {
    ...mapGetters(["activities"]),
  },
  methods: {
    search(input) {
      if (input.length < 1) return [];

      const filtered = this.activities.filter((activity) => {
        const alreadySelected =
          input.toLowerCase() ===
          `${activity.topic_data.name.toLowerCase()} ${RESOURCES_TYPES[
            activity.resource_type
          ].name.toLowerCase()}`;
        return (
          activity.topic_data.name.toLowerCase().startsWith(input.toLowerCase()) || alreadySelected
        );
      });
      if (filtered.length === 0) this.$emit("clearSearch");
      return filtered;
    },
    getResultValue(item) {
      const name = item.topic_data.name;
      const capitalizeName = name.charAt(0).toUpperCase() + name.slice(1);
      return `${capitalizeName} ${RESOURCES_TYPES[item.resource_type].name}`;
    },
    onSubmit(result) {
      this.$emit("search", result.id);
    },
  },
};
</script>

<style>
.autocomplete-wrapper {
  width: 300px;
}

.autocomplete-input {
  background-color: white;
  padding: 3px;
  border: 1px solid var(--gray);
  font-size: small;
  border-radius: 5px;
  background-position: 272px;
}

.autocomplete-result-list > li {
  background-image: none;
  padding: 5px;
  color: var(--gray);
  text-transform: capitalize;
}
</style>
