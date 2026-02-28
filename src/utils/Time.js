import { useState, useEffect } from "react";

export const useClock = (timezone = "Asia/Kolkata") => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        //   second: "2-digit",
          hour12: false,
          timeZone: timezone,
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  return time;
};
