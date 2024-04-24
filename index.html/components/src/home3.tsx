"use client"

import { useState } from "react";
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useTheme } from '@mui/material/styles';
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Button, MobileStepper, Paper, Typography } from "@mui/material";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function Home3() {
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const maxSteps = itemData1.length;
  const handleStepChange = (step: any) => {
    setActiveStep(step);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

    return(
<Box sx={{position: 'absolute', top: 140, left: 'auto', right: 'auto', dispaly: 'flex', justifyContent: 'center', backgroundColor:' white'}}>
<Box sx={{ width: "800px", flexGrow: 1 }}>
    <Paper
      square
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
        pl: 2,
        bgcolor: 'background.default',
      }}
    >
      <Typography>{itemData1[activeStep].label}</Typography>
    </Paper>
    <AutoPlaySwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={activeStep}
      onChangeIndex={handleStepChange}
      enableMouseEvents
    >
      {itemData1.map((step, index) => (
        <div key={step.label}>
          {Math.abs(activeStep - index) <= 2 ? (
            <Box
              component="img"
              sx={{
                height: 300,
                display: 'block',
                overflow: 'hidden',
                width: '700px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              src={step.img}
              alt={step.label}
            />
          ) : null}
        </div>
      ))}
    </AutoPlaySwipeableViews>
    <MobileStepper
      steps={maxSteps}
      position="static"
      activeStep={activeStep}
      nextButton={
        <Button
          size="small"
         onClick={handleNext} 
          disabled={activeStep === maxSteps - 1}
        >
          Next
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
    />
  </Box>
</Box>
    )
}

const itemData1 = [
    {
      img: '/images/carousel_1.jpg',
      label: '"No child should ever go to bed hungry; it is a tragedy we can prevent." - David Beasley'
    },
    {
      img: '/images/carousel_2.jpg',
      label: '"Hunger is a solvable problem, and together, we can make a difference." - Ellen Gustafson'
    },
    {
      img: '/images/carousel_3.jpg',
      label: '"Hunger is not a problem we cannot solve. It is a problem we have not solved yet." - Josette Sheeran'
    },
    {
      img: '/images/carousel_4.jpg',
      label: '"Hunger is not an issue of charity; it is an issue of justice." - Jacques Diouf'
    }
  ]