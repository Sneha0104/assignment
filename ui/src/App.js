import React from "react";
import "./App.css";
import axios from 'axios';
import BasicCard from "./Views/cardTemplate";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
function App() {
  const [droneData, setDroneData] = React.useState([]);
  const [violatorData, setViolaterData] = React.useState([]);

  //changed http://localhost:3001  to https://boiling-crack-production.up.railway.app/
  //get drones data every 2 minutes
  React.useEffect(() => {
    const interval = setInterval(() => {
      axios.get('https://boiling-crack-production.up.railway.app/drones')
        .then(response => {
          const resData = response.data.drone;
          setDroneData([...resData]);
        });
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  //whenever new drone is detected, check for violation
  React.useEffect(() => {
    if (droneData) {
      droneData.map((drone) => {
        const distance = Math.sqrt(Math.abs(drone.positionX - 250000) ** 2 + Math.abs(drone.positionY - 250000) ** 2);
        //console.log(distance);
        //min distance = 500000/500 * 100 = 100000
        //console.log("Distance= ",distance);
        if (distance < 100000) {
          //console.log("distancee= ",distance,"serial= ",drone.serialNumber);
          pilotInformation(drone.serialNumber, distance);
        }
      })
    }
  }, [droneData]);

  //remove violator data  after 10 minutes (600000 milliseconds)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setViolaterData(violatorData.filter(
        (violator) => {
          const timeNow = Date.now();
          return timeNow - violator.violationTime < 600000
        }
      ))
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [violatorData]);


  const pilotInformation = (serialNumber, distance) => {
    //console.log(serialNumber,distance);
    axios.get(`https://boiling-crack-production.up.railway.app/pilots/${serialNumber}`)
      .then(response => {
        const pilotData = response.data;
        //console.log("got a pilot",pilotData.firstName);
        const violator = {
          firstName: pilotData.firstName,
          lastName: pilotData.lastName,
          email: pilotData.email,
          phoneNumber: pilotData.phoneNumber,
          closestDistance: distance,
          violationTime: Date.now(),
          violationTimes:1,
          serialNumber: serialNumber,
        };
        if(violatorData.find((id)=>id.serialNumber === serialNumber)!==undefined)
        {
          console.log("found");
          const prevData = violatorData.find((id)=>id.serialNumber === serialNumber);
          if(prevData!==undefined)
          violator.violationTimes = prevData.violationTimes + 1;
          if(prevData!==undefined && violator.closestDistance>prevData.closestDistance)
          {
          //new time, old distance
          violator.closestDistance = prevData.closestDistance;
          }
          //if not => new time, new distance
            setViolaterData(violatorData.map((v)=>{

              if(v.serialNumber === violator.serialNumber)
              {
                return violator;
              }
              else
              {
                console.log("return");
                return v;
              }
            }));
          
         
        }
        else
       {          console.log("not-found");
 
        setViolaterData(violatorData.concat([violator]));}
        //console.log("violer2=",violatorData);

      })
      .catch(error => {
        //console.log(error);
        return error;
      });
    //console.log("data = ", violatorData);

  }

  return (
    <div className="App">
      <header className="Header">
        <h1>Violators Information</h1>
        
        </header>
        
        <div className="Body">
        <h6> (Will take a few minutes)</h6>
        <Box  sx={{ flexGrow: 1 }}>
          <Grid container spacing={25}>
            {

              violatorData.map((data, idx) => (
                <Grid item xs = {4}>
                  <BasicCard
                    key={idx}
                    firstName={data.firstName}
                    lastName={data.lastName}
                    email={data.email}
                    phoneNumber={data.phoneNumber}
                    closestDistance={data.closestDistance}
                    violationTime={data.violationTime}
                    violationTimes = {data.violationTimes}
                  />
                </Grid>
              ))
            }
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default App;
