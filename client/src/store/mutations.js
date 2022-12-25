const mutations = {
  setActivities(state, activities) {
    state.activities = activities;
  },
  removeActivity(state, activityId) {
    const activityIndex = state.activities.findIndex((a) => a.id === activityId);
    state.activities.splice(activityIndex, 1);
  },
};

export default mutations;
