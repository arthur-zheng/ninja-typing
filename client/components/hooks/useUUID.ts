import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const useUUID = () => {
  const [uuid, setUUID] = useState<string | null>(null);

  useEffect(() => {
    let storedUUID = localStorage.getItem("uuid");
    if (!storedUUID) {
      storedUUID = uuidv4();
      localStorage.setItem("uuid", storedUUID);
    }
    setUUID(storedUUID);
  }, []);

  return uuid;
};

export default useUUID;
