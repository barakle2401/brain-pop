const SERVER_URL = "http://localhost:3000";
export const ACTIVITIES_API_URL_V1 = `${SERVER_URL}/activities/v1`;
export const ACTIVITIES_API_URL_V2 = `${SERVER_URL}/activities/v2`;

export const RESOURCES_TYPES = {
  all: { name: "All Work" },
  challenge: { name: "Challenge", score: true, zoom: true },
  make_a_map: { name: "Make-a-Map", score: false, zoom: true },
  draw_about_it: { name: "Draw About It", score: false, zoom: true },
  easy_quiz: { name: "Easy Quiz", score: true, zoom: true },
  make_a_movie: { name: "Make-a-movie", score: false, zoom: true },
  movie: { name: "Movie", score: false, zoom: false },
  quiz: { name: "Quiz", score: true, zoom: true },
  related_reading: { name: "Related Reading", score: false, zoom: false },
  word_play: { name: "Word Play", score: false, zoom: true },
};

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
