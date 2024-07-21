import React, { createContext, useContext, useState, useEffect } from "react";
import useUUID from "./useUUID";

interface LevelContextType {
  level: number | null;
  setLevel: (level: number) => void;
}

// Create Level Context
const LevelContext = createContext<LevelContextType>({
  level: 1,
  setLevel: (level: number) => {},
});

// Hook to use Level Context
export const useLevel = () => {
  return useContext(LevelContext);
};

// Level Provider Component
export const LevelProvider = ({ children }: { children: React.ReactNode }) => {
  const [level, setLevel] = useState<number | null>(null);
  const uuid = useUUID();

  useEffect(() => {
    if (uuid) {
      // Fetch the level from an API or some source using the UUID
      const fetchLevel = async () => {
        try {
          const response = await fetch(
            `http://localhost:8000/recommendation/${uuid}`
          ); // Replace with your API endpoint
          if (!response.ok) {
            if (response.status === 404) {
              console.warn(`No scores found for session_id: ${uuid}`);
              // Handle the case when the UUID is not found in the backend
              // e.g., you might want to set a default level or create a new session
              setLevel(1); // Example: setting a default level
            } else {
              throw new Error("Failed to fetch level");
            }
          } else {
            const data = await response.json();
            console.log(data);
            setLevel(data.level);
          }
        } catch (error) {
          console.error("Error fetching level:", error);
        }
      };

      fetchLevel();
    }
    // Set initial level
    setLevel(1);
  }, [uuid]);

  return (
    <LevelContext.Provider value={{ level, setLevel }}>
      {children}
    </LevelContext.Provider>
  );
};
