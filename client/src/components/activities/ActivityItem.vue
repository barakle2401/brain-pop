<template>
  <div class="item-box">
    <div class="d-flex">
      <img class="icon" :src="imagePath" alt="icon" />
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
import { formatDate } from "@/utils/utils";
import { RESOURCES_TYPES } from "@/components/activities/constants";
export default {
  name: "ActivityItem",
  props: {
    activity: {
      type: Object,
      required: true,
    },
  },
  computed: {
    activityTitle() {
      return `${this.activity.topic_data.name} ${
        RESOURCES_TYPES[this.activity.resource_type].name
      }`;
    },
    imagePath() {
      //for some reason using iconPath is not working well...
      const nameWithoutSpaces = this.activity.topic_data.name.replace(/\s+/g, "");
      return require(`../../../../assets/topics/${nameWithoutSpaces}.png`);
    },
    dateCreated() {
      return formatDate(this.activity.d_created);
    },
    isViewable() {
      return RESOURCES_TYPES[this.activity.resource_type].zoom;
    },
    showScore() {
      return RESOURCES_TYPES[this.activity.resource_type].score;
    },
  },
  methods: {
    hideActivity() {
      this.$emit("hideActivity", this.activity.id);
    },
    viewActivity() {},
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
}
.icon {
  height: 50px;
  width: 50px;
}
</style>
