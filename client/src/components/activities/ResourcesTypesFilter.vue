<template>
  <div>
    <h5 class="title">Filter By:</h5>
    <div class="d-flex">
      <button
        @click="filter(r.key)"
        :key="r.key"
        v-for="r in resources"
        :class="[{ active: r.selected }, 'filter-button hover pointer']"
      >
        <i v-if="r.selected" class="fa fa-check-circle"></i> {{ r.value.name }}
      </button>
    </div>
  </div>
</template>

<script>
import { RESOURCES_TYPES } from "@/components/activities/constants";
export default {
  name: "ResourcesTypesFilter",
  data() {
    return {
      resources: Object.entries(RESOURCES_TYPES).map(([key, value], i) => ({
        key,
        value,
        selected: i === 0,
      })),
    };
  },
  methods: {
    filter(resourceKey) {
      this.resources.forEach((r) => {
        r.selected = r.key === resourceKey;
      });
      this.$emit("updateFilter", resourceKey);
    },
  },
};
</script>

<style scoped>
.title {
  color: var(--gray);
  font-weight: lighter;
  margin: 20px 0 10px 0;
}
.filter-button {
  background-color: transparent;
  border-radius: 3px;
  border: 1.5px solid var(--green);
  height: 30px;
  color: var(--green);
  margin-right: 10px;
}
.active {
  background: var(--light-green);
}
</style>
