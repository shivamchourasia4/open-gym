export const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw Error("An error occurred while fetching the data.");
  }
  return response.json();
};

export const getAll = "/api/exercises";
export const getBodyParts = "/api/body-parts";
export const getEquipments = "/api/equipments";
export const getTargets = "/api/targets";
