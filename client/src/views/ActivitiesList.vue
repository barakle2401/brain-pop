<template>
  <div class="container">
    <h3>Timeline</h3>
    <SearchBar />
    <ResourcesTypesFilter />
    <div class="wrapper">
      <div :key="item.month" v-for="item in activitiesGroupedByMonths">
        <span class="month-badge">{{ item.month }}</span>
        <ActivityItem
          @hideActivity="hideActivity"
          :activity="activity"
          :key="activity.id"
          v-for="activity in item.items"
        />
      </div>
    </div>
    <div class="d-flex justify-center">
      <a @click="loadMore" class="green hover pointer"> <i class="arrow down"></i> Load More</a>
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/activities/SearchBar";
import ResourcesTypesFilter from "@/components/activities/ResourcesTypesFilter";
import ActivityItem from "@/components/activities/ActivityItem";
import { mapActions, mapGetters } from "vuex";
import { MONTHS } from "@/components/activities/constants";

export default {
  name: "ActivitiesList",
  components: {
    SearchBar,
    ResourcesTypesFilter,
    ActivityItem,
  },
  data() {
    return {
      pageSize: 5, //TODO:change to 10
      currentPage: 1,
    };
  },
  computed: {
    ...mapGetters(["activities"]),
    activitiesSortedByMonth() {
      return [...this.activities]
        .sort((a, b) => {
          const dateA = new Date(a.d_created * 1000);
          const dateB = new Date(b.d_created * 1000);
          return dateA - dateB;
        })
        .slice(0, this.currentPage * this.pageSize);
    },
    activitiesGroupedByMonths() {
      const grouped = this.activitiesSortedByMonth.reduce((result, item) => {
        const month = MONTHS[new Date(item.d_created * 1000).getMonth()];
        if (!result[month]) {
          result[month] = [];
        }
        result[month].push(item);
        return result;
      }, {});

      return Object.entries(grouped).map(([month, items]) => ({ month, items }));
    },
  },
  methods: {
    ...mapActions(["fetchActivitiesV1"]),
    loadMore() {
      this.currentPage++;
    },
    hideActivity(activityId) {
      this.$store.commit("removeActivity", activityId);
    },
  },
  created() {
    this.fetchActivitiesV1();
  },
};
</script>
<style scoped>
.wrapper {
  padding-top: 30px;
  position: relative;
}
.month-badge {
  background: var(--light-yellow);
  border-radius: 40px;
  padding: 5px 30px;
  font-size: small;
}
</style>
