import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from "@mui/material/CardMedia";
import "./index.css";


export default function BasicCard() {
  return (   
     <div className="news">
    <Card sx={{ maxWidth: 350, border: "none", boxShadow: "none", margin: "1px" }} >
      <CardMedia component="img" height="200" image={"https://www.kaust.edu.sa/en/news/PublishingImages/the-biodiversity-of-coral-reefs-a-conversation-with-professor-catherine-mcfadden/shutterstock_1044142525.jpg"} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ...
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
</div>
  )
}