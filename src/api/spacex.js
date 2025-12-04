class SpaceX{

    constructor(baseUrl = "https://api.spacexdata.com/v4/") {
        this.baseUrl = baseUrl;
      }

    launches(){
        return fetch(`${this.baseUrl}launches`)
            .then(response=>response.json());
    }

    launchpads(){
        return fetch(`${this.baseUrl}launchpads`)
            .then(response=>response.json());
    }

    launchpad(id){
        return fetch(`${this.baseUrl}launchpads/${id}`)
            .then(response=>response.json());
    }

    starlinks(){
        return fetch(`${this.baseUrl}starlink`)
            .then(response=>response.json());
    }
}

export {SpaceX}
        
  console.log("[spacex.js] loaded");

  export async function getLaunches() {
      console.log("[getLaunches] start");

      try {
          const response = await fetch("https://api.spacexdata.com/v4/launches");
          console.log("[getLaunches] status:", response.status);
          
          console.log("[getLaunches] Before reading text");
          const text = await response.text();
          console.log("[getLaunches] AFTER reading text");

          console.log("[getLaunches] RAW response text:", text.substring(0, 300));

          let data;
          try {
              data = JSON.parse(text);
          } catch (err) {
              console.error("[getLaunches] JSON parse ERROR:", err);
              return [];
          }

          console.log("[getLaunches] launches count:", data.length);
          return data;

      } catch (error) {
          console.error("[getLaunches] fetch ERROR:", error);
          return [];
      }
  }

  export async function getLaunchpads() {
      console.log("[getLaunchpads] start");

      try {
          const response = await fetch("https://api.spacexdata.com/v4/launchpads");
          console.log("[getLaunchpads] status:", response.status);

          const data = await response.json();
          console.log("[getLaunchpads] pads:", data.length);
          return data;

      } catch (error) {
          console.error("[getLaunchpads] ERROR:", error);
          return [];
      }
}