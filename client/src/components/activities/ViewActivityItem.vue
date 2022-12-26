<template>
  <Modal @close="closeModal">
    <template v-slot:body>
      <div class="d-flex flex-column align-center">
        <img :class="getIconClass()" :src="imagePath" alt="icon" />
        <div class="d-flex flex-column space-around ml-5 text-center">
          <h1 class="capitalize bold">{{ activityTitle }}</h1>
          <span>{{ dateCreated }}</span>
        </div>
      </div>
      <h2>{{ activity.comment }}</h2>
    </template>
    <template v-slot:footer>
      <h3 v-if="showScore" class="green">Score {{ activity.score }}/10</h3>
    </template>
  </Modal>
</template>

<script>
import activityItemMixin from "@/mixins/ativityItemMixin";

export default {
  name: "ViewActivityItem",
  components: {
    Modal: () => import("@/components/common/Modal.vue"),
  },
  mixins: [activityItemMixin],
  computed: {
    activity() {
      const activityId = this.$route.params.id;
      return this.$store.getters.getActivityById(activityId);
    },
  },
  methods: {
    closeModal() {
      this.$router.push({ name: "homeV1" });
    },
  },
};
</script>

<style scoped></style>
