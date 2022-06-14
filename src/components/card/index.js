import React, { useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from "@mui/material/CardMedia";
import "./index.css";
import news from  "./news.json";
import { useNewsData } from "../../hooks/useNewsData";
import { useSelector, useStore } from "react-redux";


export default function BasicCard() {
  const state = useState();
  const store = useStore();
  const category = useSelector(() => store.getState().categoryReducer.category);
  const [country, setCountry] = useState('');
  const newsData = useNewsData();  
  const categories = [];

  if (newsData && category) {
    newsData.items.forEach((data) => {
      if (data.category === category) {
        categories.push(data);
      }
    });
  }

  console.log(newsData)

  return (
    <div className="news">
      {categories.map((news) => (
        <Card sx={{ maxWidth: 300, border: "none", boxShadow: "none", margin: "1px" }} >
          <CardMedia component="img" height="200" image={news.image} />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              <p className='title'>{news.headline}</p>
            </Typography>
            <Typography variant="body2" color="text.secondary">
            <p className='title'>{news.content.substring(0, 150)}...</p>
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small"><a href={news.link} target="_blank">Learn More</a></Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
