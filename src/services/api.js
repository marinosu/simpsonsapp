const CDN_BASE = "https://cdn.thesimpsonsapi.com/500";

export const getLocations = async () => {
  try {
    const response = await fetch(
      "https://thesimpsonsapi.com/api/locations"
    );
    const data = await response.json();

    const updatedResults = data.results.map((item) => ({
      ...item,
      image: `${CDN_BASE}${item.image_path}`,
    }));

    return {
      ...data,
      results: updatedResults,
    };
  } catch (error) {
    console.log("No se pudo obtener las ubicaciones:", error);
    return null;
  }
};
