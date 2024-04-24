"use client"

import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "react-redux";
import { getFoodRequest, getFoodRequestBasedOnDistributorId, onUpdateUser } from '../../redux/actions/Dashboard';
import DistributorFoodCard from "@/components/src/distributorFoodCard";
import FoodMap from "@/components/src/foodMap";
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
  p: 4,
  overflow: 'auto',
};

export default function Distributor() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.userSlice?.value?.userData?.existingRecord);
  const updatedUserData = useSelector((state) => state?.userSlice?.value?.updatedUserData?.existingRecord);
  const [ foodRequest, setFoodRequest ] = useState(null);
  console.log("Foooooooooooooooooo:", foodRequest);
  const currentDate = new Date().toISOString();
  const [ user, setUser ] = useState({
    orgName: '',
    address: '',
    contactNo: '',
    userType: userData?.userType,
    todayDate: currentDate,
    startTime: '',
    endTime: '',
  })
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(true);
  if(!userData){
    permanentRedirect(`/`);
  }
  useEffect(() => {
    if(!userData?.contactNo){
    setOpen(true);
    }
  }, [userData])
  
  useEffect(() => {
    const getFood = async() => {
    try{
      const foodRequest = await dispatch(getFoodRequest(userData?.id));
      setFoodRequest(foodRequest);
    }
    catch(error){
      console.log(error);
    }
  }
  getFood();
  }, [dispatch, userData?.id])

  // useEffect(() => {
  //   const lastOpenedDate = localStorage.getItem('lastOpenedDate');
  //   if (lastOpenedDate !== currentDate) {
  //     setOpen(true);
  //     localStorage.setItem('lastOpenedDate', currentDate);
  //   }
  // }, []);
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    property: string,
  ) => {
    setUser((prevAnswer) => ({
      ...prevAnswer,
      [property]: event.target?.value,
    }));
  }
  const register = async(event: any) => {
    event.preventDefault();
    if (!user.address || !user.contactNo || !user.startTime || !user.endTime) {
      setErrorMessage('Please fill in all required fields');
      return; // Exit the function if any required field is empty
    }
  
    // Check if the phone number is a valid 10-digit number
    if (!/^\d{10}$/.test(user.contactNo)) {
      setErrorMessage('Please enter a valid 10-digit phone number');
      return; // Exit the function if the phone number is not valid
    }
    try{
    await dispatch(onUpdateUser(user, userData?.email));
    setOpen(false);
    }
    catch(error){
      console.log(error);
    }
  }
  const handlePhoneNumberChange = (event: any) => {
    const inputPhoneNumber = event.target.value;
    const isValidPhoneNumber = /^\d+$/.test(inputPhoneNumber);

    if (isValidPhoneNumber || inputPhoneNumber === '') {
      setUser((prevUser) => ({
        ...prevUser,
        contactNo: inputPhoneNumber,  
      }));
      setErrorMessage('');
    } else {
      setErrorMessage('Please enter numbers only');
    }
  };

    return( 
    <div>
      {userData?.contactNo === null || userData?.contactNo === "" && (
        <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center'}}>
            Registration
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Register yourself so that recipients can reach you
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
                Time available {/* on {currentDate} */}:
            </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={9}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker label="Select start time" name="startTime" 
            value={user.startTime}
            onChange={(newDate) => {
              const startTimeString = newDate ? newDate.toString().split(' ')[4].slice(0, 5) : '';
              setUser((prevData) => ({ ...prevData, startTime: startTimeString }));
            }} />
            </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker label="Select end time" name="endTime" 
            value={user.endTime}
              onChange={(newDate) => {
                const endTimeString = newDate ? newDate.toString().split(' ')[4].slice(0, 5) : '';  
                setUser((prevData) => ({ ...prevData, endTime: endTimeString }));
              }} />
            </LocalizationProvider>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
            <Typography variant="h6" sx={{ fontFamily: 'Raleway', fontSize: '16px' }}>
                Address:
            </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={9}>
            <TextField 
          required
                id="outlined-multiline-static"
                multiline
                minRows={1}
                maxRows={4}
                value={user.address}
                onChange={(event) => handleInputChange(event, 'address')}
                variant="outlined"
            />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
          <Typography variant="h6" sx={{ fontFamily: 'Raleway', fontSize: '16px' }}>
                Contact no:
            </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={9}>
            <TextField
          required
          id="outlined-required"
          value={user.contactNo}
          // onChange={(event) => handleInputChange(event, 'contactNo')}
          onChange={handlePhoneNumberChange}
          InputProps={{
            inputMode: 'numeric'
          }}
          // error={/[^0-9]/.test(user.contactNo)}
          // helperText={/[^0-9]/.test(user.contactNo) ? 'Please enter numbers only' : ''}
          error={errorMessage !== ''}
          helperText={errorMessage}
        />
            </Grid>
            </Grid>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
            <Button variant="contained" style={{backgroundColor: "#4CAF50"}} onClick={register}>Register</Button>
            </Box>
        </Box>
        </Box>
      </Modal>
      </>
       )}   
      <Box sx={{width: '100%'}}>
      <FoodMap user={'distributor'} foodDetails={foodRequest?.existingRecord}/>
      </Box>
    </div>
    )
  }