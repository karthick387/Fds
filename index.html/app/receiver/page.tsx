"use client"

import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import FoodMap from '../../components/src/foodMap';
import { useDispatch, useSelector } from "react-redux";
import { getAllFoods, getUser, onUpdateUser } from '../../redux/actions/Dashboard';
import { permanentRedirect } from 'next/navigation'

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

export default function Receiver() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const userData1 = useSelector((state) => state?.userSlice?.value?.userData?.existingRecord);
  console.log("enna1:", userData1);
  const [ userData, setUserData ] = useState(userData1);
  console.log("enna:", userData);
  const currentDate = new Date().toISOString();
  const [errorMessage, setErrorMessage] = useState<{ orgName: string; address: string; contactNo: string; }>({
    orgName: '',
    address: '',
    contactNo: '',
  });
  if(!userData){
    permanentRedirect(`/`);
  }
  let [ foodRecords, setFoodRecords ] = useState(null);
  foodRecords = useSelector((state) => state?.userSlice?.value?.foodData?.existingRecord);
  const [ user, setUser ] = useState({
    orgName: '',
    address: '',
    contactNo: '',
    userType: userData?.userType,
    todayDate: currentDate,
    startTime: currentDate,
    endTime: currentDate,
  })

  useEffect(() => {
    const getAllFoodDetails = async() => {
      try{
    const user1 = await dispatch(getUser(userData1?.email));
    setUserData(user1);
  }
  catch(error){
    console.log(error);
  }
  }
  getAllFoodDetails();
  }, [user?.contactNo]);

  useEffect(() => {
    const getAllFoodDetails = async() => {
      try{
        const food = await dispatch(getAllFoods());
        setFoodRecords(food);
      }
      catch(error){
        console.log(error);
      }
    }
    getAllFoodDetails();
  }, [userData]);
  useEffect(() => {
    setOpen(true);
  }, [])
  const handleClose = () => setOpen(true);
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    property: string,
  ) => {
    setUser((prevAnswer) => ({
      ...prevAnswer,
      [property]: event.target.value,
    }));
    // if(event.target.value === ''){
    //   setErrorMessage("This field is required");
    // }
    if (event.target.value === '') {
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        [property]: "This field is required",
      }));
    } else {
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        [property]: '',
      }));
    }
  }

const handlePhoneNumberChange = (event: any) => {
  const inputPhoneNumber = event.target.value;
  const isValidPhoneNumber = /^\d+$/.test(inputPhoneNumber);
  const isValidPhoneNumber1 = /^\d{10}$/.test(inputPhoneNumber);

  if (isValidPhoneNumber || inputPhoneNumber === '') {
    if (isValidPhoneNumber1 || inputPhoneNumber === '') {
      setUser((prevUser) => ({
        ...prevUser,
        contactNo: inputPhoneNumber,
      }));
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        contactNo: '',
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        contactNo: inputPhoneNumber,
      }));
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        contactNo: 'Please enter a 10-digit number',
      }));
    }
  } else {
    setUser((prevUser) => ({
      ...prevUser,
      contactNo: inputPhoneNumber,
    }));
    setErrorMessage((prevErrors) => ({
      ...prevErrors,
      contactNo: 'Please enter numbers only',
    }));
  }
};

const register = async(event: any) => {
  event.preventDefault();
  const errors = {};

  if (!user.orgName) {
    errors['orgName'] = 'Please fill in all required fields';
  } else {
    errors['orgName'] = '';
  }

  if (!user.address) {
    errors['address'] = 'Please fill in all required fields';
  } else {
    errors['address'] = '';
  }

  if (!user.contactNo) {
    errors['contactNo'] = 'Please fill in all required fields';
  } else if (!/^\d{10}$/.test(user.contactNo)) {
    errors['contactNo'] = 'Please enter a valid 10-digit phone number';
  } else {
    errors['contactNo'] = '';
  }

  setErrorMessage(errors);

  // Check if there are any errors before dispatching the update action
  if (Object.values(errors).every((error) => !error)) {
    try {
      await dispatch(onUpdateUser(user, userData1?.email));
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }
}
    return( 
    <div>
      {userData?.contactNo === null || userData?.contactNo === '' && (
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
            Register yourself for the donors to know about you
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
                Organization name:
            </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={9}>
            <TextField
          required
          id="outlined-required"
          fullWidth
          value={user.orgName}
          onChange={(event) => handleInputChange(event, 'orgName')}
          error={errorMessage.orgName !== ''}
          helperText={errorMessage.orgName}
        />
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
                error={errorMessage.address  !== ''}
          helperText={errorMessage.address }
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
          onChange={handlePhoneNumberChange}
          InputProps={{
            inputMode: 'numeric'
          }}
          error={errorMessage.contactNo !== ''}
          helperText={errorMessage.contactNo}
        />
            </Grid>
            </Grid>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
            <Button variant="contained" style={{backgroundColor: "#4CAF50"}} onClick={register}>Register</Button>
            </Box>
        </Box>
        </Box>
      </Modal>
      )}
      <Box sx={{marginLeft: 5, marginRight: 5}}>
      <FoodMap user={'receiver'} foodDetails={foodRecords}/>
      </Box>
    </div>
    )
  }