export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.toLocaleDateString("en-US", { day: "2-digit" });
  const year = date.toLocaleDateString("en-US", { year: "numeric" });
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${month}, ${day}, ${year} ${time}`;
};

export const getData = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    alert(`${error}, please make sure local server is running at port 3000`);
    return [];
  }
};

export const fromV2ToV1Structure = (activities) => {
  return activities.flatMap((item) =>
    item.activities.map((activity) => ({ ...activity, resource_type: item.resource_type }))
  );
};
