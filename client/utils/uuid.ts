import { v4 as uuidv4 } from "uuid";

export const getOrCreateUUID = () => {
  const localStorageKey = "app-uuid";
  let uuid = localStorage.getItem(localStorageKey);

  if (!uuid) {
    uuid = uuidv4();
    localStorage.setItem(localStorageKey, uuid);
  }

  return uuid;
};
