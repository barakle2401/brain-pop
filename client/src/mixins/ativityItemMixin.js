import { BP_PRODUCT_TYPE, RESOURCES_TYPES } from "@/components/activities/constants";
import { formatDate } from "@/utils/utils";

export default {
  computed: {
    activityTitle() {
      return `${this.activity.topic_data.name} ${
        RESOURCES_TYPES[this.activity.resource_type].name
      }`;
    },
    imagePath() {
      //for some reason using iconPath is not working well...
      const nameWithoutSpaces = this.activity.topic_data.name.replace(/\s+/g, "");
      return require(`../../../assets/topics/${nameWithoutSpaces}.png`);
    },
    dateCreated() {
      return formatDate(this.activity.d_created);
    },
    showScore() {
      return RESOURCES_TYPES[this.activity.resource_type].score;
    },
  },
  methods: {
    getIconClass() {
      const bgClass = this.activity.product === BP_PRODUCT_TYPE ? "bp-bg-color" : "bpjr-bg-color";
      return `icon ${bgClass}`;
    },
  },
};
