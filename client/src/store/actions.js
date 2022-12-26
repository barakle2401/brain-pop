import { ACTIVITIES_API_URL_V1, ACTIVITIES_API_URL_V2 } from "@/components/activities/constants";
import { fromV2ToV1Structure, getData } from "@/utils/utils";

const actions = {
  async fetchActivitiesV1({ commit }) {
    const activities = await getData(ACTIVITIES_API_URL_V1);

    commit("setActivities", activities);
  },
  async fetchActivitiesV2({ commit }) {
    const activities = await getData(ACTIVITIES_API_URL_V2);
    const inV1Format = fromV2ToV1Structure(activities);

    commit("setActivities", inV1Format);
  },
};

export default actions;
