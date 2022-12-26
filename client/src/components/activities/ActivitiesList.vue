<template>
  <div class="container relative">
    <hr width="1" size="500" class="vertical-line" />
    <h3>Timeline</h3>
    <SearchBar @search="search" @clearSearch="clearSearch" />
    <ResourcesTypesFilter @updateFilter="updateFilter" />
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
      <a v-if="showPagination" @click="loadMore" class="green hover pointer">
        <i class="arrow down"></i> Load More</a
      >
    </div>
    <router-view />
  </div>
</template>

<script>
import SearchBar from "@/components/activities/SearchBar";
import ResourcesTypesFilter from "@/components/activities/ResourcesTypesFilter";
import ActivityItem from "@/components/activities/ActivityItem";
import { mapActions, mapGetters } from "vuex";
import { MONTHS, ROUTE_NAME_V1 } from "@/components/activities/constants";

export default {
  name: "ActivitiesList",
  components: {
    SearchBar,
    ResourcesTypesFilter,
    ActivityItem,
  },
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      resourceFilter: "all",
      searchActivityId: null,
    };
  },
  computed: {
    ...mapGetters(["activities"]),
    activitiesToShowSortedByMonth() {
      let activities = [...this.activities].sort((a, b) => {
        const dateA = new Date(a.d_created * 1000);
        const dateB = new Date(b.d_created * 1000);
        return dateA - dateB;
      });
      if (this.searchActivityId) {
        activities = activities.filter((activity) => activity.id === this.searchActivityId);
      }
      if (this.resourceFilter !== "all") {
        activities = activities.filter(
          (activity) => activity.resource_type === this.resourceFilter
        );
      }

      return activities.slice(0, this.currentPage * this.pageSize);
    },
    activitiesGroupedByMonths() {
      const grouped = this.activitiesToShowSortedByMonth.reduce((result, item) => {
        const month = MONTHS[new Date(item.d_created * 1000).getMonth()];
        if (!result[month]) {
          result[month] = [];
        }
        result[month].push(item);
        return result;
      }, {});

      return Object.entries(grouped).map(([month, items]) => ({ month, items }));
    },
    showPagination() {
      return this.pageSize * this.currentPage < this.activities.length;
    },
  },
  methods: {
    ...mapActions(["fetchActivitiesV1", "fetchActivitiesV2"]),
    loadMore() {
      this.currentPage++;
    },
    hideActivity(activityId) {
      this.$store.commit("removeActivity", activityId);
    },
    updateFilter(resourceKey) {
      this.resourceFilter = resourceKey;
    },
    search(activity) {
      this.searchActivityId = activity;
    },
    clearSearch() {
      this.searchActivityId = null;
    },
  },
  created() {
    //The app support another data feed, Activities V2 API, that is structured differently. Same data, but a different structure. Make sure your code supports both structures from API #V1 and API #V2. Create a new route that demonstrates this support.
    const routeName = this.$route.name;
    if (routeName === ROUTE_NAME_V1) {
      this.fetchActivitiesV1();
    } else {
      this.fetchActivitiesV2();
    }
  },
};
</script>
<style scoped>
.relative {
  position: relative;
}
.vertical-line {
  top: 10em;
  position: absolute;
  bottom: 5em;
  height: calc(100% - 15em);
  left: 60px;
  width: 0;
  background-color: var(--gray);
  z-index: 0;
}
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
