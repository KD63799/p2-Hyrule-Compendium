import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import SetMealRounded from '@mui/icons-material/SetMealRounded';

function Carousel3D() {
  const images = [
    'src/assets/slider/linkPost.jpg',
    'src/assets/slider/linkIntro.jpg',
    'src/assets/slider/linkArrow.jpg',
    'src/assets/slider/linkClimb.jpg',
  ];

  return (
    <Carousel
      sx={{ width:{xs:"95%", sm:"70%", md:"40%"} }}
      autoPlay={true}
      animation="fade"
      timeout={100}
      indicators={true}
      navButtonsAlwaysInvisible={true}
      IndicatorIcon={<SetMealRounded/>}
      indicatorIconButtonProps={{
        style: {
          padding: '10px',
          color: 'black',
          border: 'none',
          outline:"none",
        }
      }}
      activeIndicatorIconButtonProps={{
        style: {
          color: 'purple',
          border: 'none',
        }
      }}
    >
      {images.map((imageUrl, i) => (
        <Paper key={i} sx={{ borderRadius: '20px', background: 'transparent', boxShadow: 'none', margin:"10px", }}>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            <img src={imageUrl} alt={`Image ${i + 1}`} style={{ height: '100%', borderRadius: '20px', width:"100%" }} />
          </a>
        </Paper>
      ))}
    </Carousel> 
  );
}

export default Carousel3D;
