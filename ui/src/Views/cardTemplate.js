import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import moment from "moment";



export default function BasicCard(props) {

  return (
    <Card sx={{ minWidth: 275 }} style={{backgroundColor: "#edf5e1"}}>
      <CardContent  >
        <Typography variant="h5" component="div">
          {props.firstName} {props.lastName}
        </Typography>
        <Typography color="text.secondary">
          {props.email}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.phoneNumber}
        </Typography>
        <Typography variant="body2">
          Closest Distance: {props.closestDistance}
        </Typography>
        <Typography variant="body2">
          Violation Date: {moment(props.violationTime).format("L")}
        </Typography>
        <Typography variant="body2">
          Violation Time: {moment(props.violationTime).format("LTS")}
        </Typography>
        <Typography variant="body2">
          No of Violations: {props.violationTimes.toString()}
        </Typography>
      </CardContent>

    </Card>
  );
}

// <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//           {props.firstName}
//         </Typography>