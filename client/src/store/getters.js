const getters = {
  activities(state) {
    return state.activities;
  },
  getActivityById: (state) => (id) => {
    return state.activities.find((activity) => activity.id === id);
  },
};
export default getters;
