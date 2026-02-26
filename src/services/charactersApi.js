const CDN_BASE = "https://cdn.thesimpsonsapi.com/500";

export const getCharacters = async () => {
  try {
    const response = await fetch(
      "https://thesimpsonsapi.com/api/characters"
    );
    const data = await response.json();

    const updatedResults = data.results.map((item) => ({
      ...item,
      image: `${CDN_BASE}${item.portrait_path}`,
    }));

    return {
      ...data,
      results: updatedResults,
    };
  } catch (error) {
    console.log("No se pudo desplegar los personajes:", error);
    return null;
  }
};
