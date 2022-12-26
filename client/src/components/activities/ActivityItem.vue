<template>
  <div class="item-box">
    <div class="d-flex">
      <img :class="getIconClass()" :src="imagePath" alt="icon" />
      <div class="d-flex flex-column space-around ml-5">
        <span class="capitalize bold heavy-gray">{{ activityTitle }}</span>
        <span>{{ dateCreated }}</span>
      </div>
      <div class="d-flex flex-column justify-center" style="margin-left: auto">
        <div class="d-flex">
          <a v-if="showScore" class="green mr-2">Score {{ activity.score }} / 10 </a>
          <a @click="hideActivity" class="pointer green mr-2 hover"><i class="fas fa-eye"></i></a>
          <a v-if="isViewable" @click="viewActivity" class="green bold pointer mr-2 hover"
            >View work</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RESOURCES_TYPES } from "@/components/activities/constants";
import activityItemMixin from "@/mixins/ativityItemMixin";
export default {
  name: "ActivityItem",
  props: {
    activity: {
      type: Object,
      required: true,
    },
  },
  mixins: [activityItemMixin],
  computed: {
    isViewable() {
      return RESOURCES_TYPES[this.activity.resource_type].zoom;
    },
  },
  methods: {
    hideActivity() {
      this.$emit("hideActivity", this.activity.id);
    },
    viewActivity() {
      this.$router.push({
        name: "viewActivityItem",
        params: { id: this.activity.id },
      });
    },
  },
};
</script>

<style scoped>
.item-box {
  border: 1px solid var(--gray);
  margin-top: 30px;
  margin-bottom: 30px;
  height: 5rem;
  border-radius: 10px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
}
</style>
