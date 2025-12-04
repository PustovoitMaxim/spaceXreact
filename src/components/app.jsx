import React, { useEffect, useState } from "react";
import { getLaunches, getLaunchpads } from "../api/spacex.js";
import LaunchList from "./LaunchList";
import Map from "./Map";

export function App() {
  const [launches, setLaunches] = useState([]);
  const [launchpads, setLaunchpads] = useState([]);
  const [highlightPad, setHighlightPad] = useState(null);

  useEffect(() => {
    console.log("[App] fetching SpaceX data...");

    getLaunches().then(data => {
      console.log("[App] Loaded launches:", data.length);
      setLaunches(data);
    });

    getLaunchpads().then(data => {
      console.log("[App] Loaded launchpads:", data.length);
      setLaunchpads(data);
    });
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <LaunchList 
        launches={launches} 
        onHoverLaunch={(launch) => {
          if (launch) {
            console.log("[App] Hover launch:", launch.name, "-> pad:", launch.launchpad);
            setHighlightPad(launch.launchpad);
          } else {
            console.log("[App] Hover cleared");
            setHighlightPad(null);
          }
        }}
      />
      <Map 
        launchpads={launchpads} 
        highlighted={highlightPad} 
      />
    </div>
  );
}

export default App;