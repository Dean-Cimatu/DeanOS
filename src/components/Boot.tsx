import { useState, useEffect } from "react";

export default function Boot() {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBooting(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return <div>{booting ? "DeanOS Booting..." : "DeanOS Loaded!"}</div>;
}
