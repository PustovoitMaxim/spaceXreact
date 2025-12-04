
import React from "react";

export default function LaunchList({ launches, onHoverLaunch }) {
  console.log("LaunchList renders, launches count:", launches.length);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatus = (launch) => {
    if (launch.success === true) return "✅";
    if (launch.success === false) return "❌";
    return "🟡";
  };

  return (
    <div style={{ 
      width: "320px",
      marginRight: "15px", 
      overflow: "hidden",
      border: "1px solid #ccc",
      borderRadius: "4px"
    }}>
      <div style={{
        padding: "8px", 
        background: "#f5f5f5",
        borderBottom: "1px solid #ccc"
      }}>
        <h3 style={{ margin: 0, fontSize: "14px" }}>SpaceX Launches</h3> 
      </div>
      
      <div style={{
        height: "600px",
        overflowY: "auto",
        overflowX: "auto"
      }}>
        <table style={{ 
          width: "100%", 
          borderCollapse: "collapse",
          fontSize: "11px"
        }}>
          <thead style={{
            position: "sticky",
            top: 0,
            background: "white",
            zIndex: 1
          }}>
            <tr>
              <th style={{ padding: "4px 4px", textAlign: "left", minWidth: "100px" }}>Name</th> 
              <th style={{ padding: "4px 4px", textAlign: "left", minWidth: "70px" }}>Date</th> 
              <th style={{ padding: "4px 4px", textAlign: "center", width: "40px" }}>Status</th> 
              <th style={{ padding: "4px 4px", textAlign: "left", minWidth: "60px" }}>Rocket</th> 
            </tr>
          </thead>

          <tbody>
            {launches.map(launch => (
              <tr 
                key={launch.id}
                onMouseEnter={() => onHoverLaunch(launch)}
                onMouseLeave={() => onHoverLaunch(null)}
                style={{ 
                  cursor: "pointer",
                  borderBottom: "1px solid #eee"
                }}
              >
                <td style={{ 
                  padding: "4px 4px",
                  maxWidth: "100px", 
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }} title={launch.name}>
                  {launch.name}
                </td>
                <td style={{ padding: "4px 4px" }}>{formatDate(launch.date_utc)}</td> 
                <td style={{ padding: "4px 4px", textAlign: "center" }}>{getStatus(launch)}</td> 
                <td style={{ 
                  padding: "4px 4px", 
                  maxWidth: "60px", 
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}>
                  {launch.rocket}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}