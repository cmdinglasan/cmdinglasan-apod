export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const date = new Date(query.date);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${query.date}`
  );
  const data = await response.json();

  return data;
});

type Params = {
  date: string;
};
