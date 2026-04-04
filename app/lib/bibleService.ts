export async function getDailyVerse() {
  try {
    const res = await fetch("https://beta.ourmanna.com/api/v1/get/?format=json", {
      cache: "no-store",
    });

    const data = await res.json();

    return {
      text: data.verse.details.text,
      reference: data.verse.details.reference,
    };
  } catch (error) {
    return {
      text: "Unable to load verse of the day.",
      reference: "",
    };
  }
}