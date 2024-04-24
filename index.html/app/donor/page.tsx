"use client"

import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import FoodMap from '../../components/src/foodMap';
import { useDispatch, useSelector } from "react-redux";
import { createFood, getFood } from '../../redux/actions/Dashboard';
import { permanentRedirect } from "next/navigation";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxWidth: '90vw', 
  maxHeight: '80vh', 
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
};

export default function Donor() {
    
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.userSlice?.value?.userData?.existingRecord);
  const loader = useSelector((state) => state?.loaderSlice?.value?.isLoading);
  let [ foodRecords, setFoodRecords ] = useState(null);
  foodRecords = useSelector((state) => state?.userSlice?.value?.foodData?.existingRecord);
  const [ food, setFood ] = useState({
    foodName: '',
    peopleToBeServed: '',
    venue: '',
    description: '',
    contactNo: '',
    userId: userData?.id,
  })

  if(!userData){
    permanentRedirect(`/`);
  }

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    property: string,
  ) => {
    setFood((prevAnswer) => ({
      ...prevAnswer,
      [property]: event.target.value,
    }));
  }
  const submit = async() => {
    try{
    await dispatch(createFood(food));
    const food1 = await dispatch(getFood(userData?.id));
        setFoodRecords(food1);
    setOpen(false);
    } catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    const getFoodDetails = async() => {
      try{
        const food = await dispatch(getFood(userData?.id));
        setFoodRecords(food);
      }
      catch(error){
        console.log(error);
      }
    }
    getFoodDetails();
  }, [userData])

    return( 
    <div>
      <Box sx={{marginLeft: 5, marginRight: 5}}>
        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button variant="contained" style={{backgroundColor: "#4CAF50"}} onClick={handleOpen}>Add food</Button>
        </Box>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center'}}>
            Add food details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Fill up the below form to list your food item
          </Typography>
          
          <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{mt: 2}}
    >
          <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={3} lg={3}>
          <Typography variant="h6" sx={{ fontFamily: 'Raleway', fontSize: '16px' }}>
                Food item:
            </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={9}>
            <TextField 
          required
            InputProps={{
              sx: {
                  fontFamily: 'Raleway',
                  fontSize: '16px',
              }
          }}
                id="outlined-multiline-static"
                label="Please enter the food items"
                multiline
                minRows={1}
                maxRows={4}
                value={food.foodName}
                onChange={(event) => handleInputChange(event, 'foodName')}
                variant="outlined"
                fullWidth
            />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
          <Typography variant="h6" sx={{ fontFamily: 'Raleway', fontSize: '16px' }}>
                Number of people can be served:
            </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={9}>
            <TextField
          required
          id="outlined-required"
          value={food.peopleToBeServed}
          onChange={(event) => handleInputChange(event, 'peopleToBeServed')}
        />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
            <Typography variant="h6" sx={{ fontFamily: 'Raleway', fontSize: '16px' }}>
                Description:
            </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={9}>
            <TextField 
          required
            InputProps={{
              sx: {
                  fontFamily: 'Raleway',
                  fontSize: '16px',
              }
          }}
                id="outlined-multiline-static"
                multiline
                minRows={1}
                maxRows={4}
                value={food.description}
                onChange={(event) => handleInputChange(event, 'description')}
                variant="outlined"
                fullWidth
            />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
            <Typography variant="h6" sx={{ fontFamily: 'Raleway', fontSize: '16px' }}>
                Venue:
            </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={9}>
            <TextField 
          required
            InputProps={{
              sx: {
                  fontFamily: 'Raleway',
                  fontSize: '16px',
              }
          }}
                id="outlined-multiline-static"
                multiline
                minRows={1}
                maxRows={4}
                value={food.venue}
                onChange={(event) => handleInputChange(event, 'venue')}
                variant="outlined"
            />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
          <Typography variant="h6" sx={{ fontFamily: 'Raleway', fontSize: '16px' }}>
                Contact no.:
            </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={9}>
            <TextField
          required
          id="outlined-required"
          value={food.contactNo}
          onChange={(event) => handleInputChange(event, 'contactNo')}
          InputProps={{
            inputMode: 'numeric'
          }}
          error={/[^0-9]/.test(food.contactNo)}
          helperText={/[^0-9]/.test(food.contactNo) ? 'Please enter numbers only' : ''}
        />
            </Grid>

            </Grid>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
            <Button variant="contained" style={{backgroundColor: "#4CAF50"}} onClick={submit} disabled={loader}>Submit</Button>
            </Box>

            </Box>
        </Box>
      </Modal>
      
      <Box sx={{mt: 5}}>
      <FoodMap user={'donor'} foodDetails={foodRecords}/>
      </Box>
      
      </Box>
    </div>
    )
  }