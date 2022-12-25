import { ACTIVITIES_API_URL_V1, ACTIVITIES_API_URL_V2 } from "@/components/activities/constants";

const actions = {
  async fetchActivitiesV1({ commit }) {
    const response = await fetch(ACTIVITIES_API_URL_V1);
    const activities = await response.json();
    commit("setActivities", activities);
  },
  async fetchActivitiesV2({ commit }) {
    const response = await fetch(ACTIVITIES_API_URL_V2);
    const activities = await response.json();
    commit("setActivities", activities);
  },
};

export default actions;
