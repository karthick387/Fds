"use client"

import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDistributors, getFoodBasedOnFoodId, getFoodRequestBasedOnDistributorId, getFoodRequestBasedOnFoodId } from "../../../redux/actions/Dashboard";
import DistributorMap from "@/components/src/distributor/distributorMap";
import { permanentRedirect } from "next/navigation";

export default function FoodDetail({params: {id}}) {
    const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [ selectedFood, setSelectedFood ] = useState(null);
  const [ distributors, setDistributors ] = useState(null);
  const [ foodRequest, setFoodRequest ] = useState(null);
  const userData = useSelector((state) => state?.userSlice?.value?.userData?.existingRecord);
  if(!userData){
    permanentRedirect(`/`);
  }
  useEffect(() => {
    const getFoodRecords = async() => {
        try{
            const food = await dispatch(getFoodBasedOnFoodId(id));
            setSelectedFood(food);
            console.log("hey1:", food);
            const foodRequest = await dispatch(getFoodRequestBasedOnFoodId(id));
            setFoodRequest(foodRequest);
            console.log("hey:", foodRequest);
        }
        catch(error){
            console.log(error);
        }
    }
    getFoodRecords();
  }, [id])

//   const request = async() => {
//     setOpen(true);
//     try{
//       const distributors = await dispatch(getAllDistributors());
//       setDistributors(distributors);
//     }
//     catch(error){
//       console.log(error);
//     }
//   }
    return(
        <>
        {/* <Box sx={{marginLeft: 3, marinRight: 3}}>
        <Grid container columns={12} spacing={5} justifyContent= 'center'>

          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Box sx={{border: '1px solid black',}}>
          <Grid container columns={6}>
          <Grid item xs={6} sm={6} md={2} lg={2}>
            <img style={{ height: '100%', objectFit: 'cover', marginLeft: 'auto', marginRight: 'auto'}} src="/images/food_1.jpg" />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={4} sx={{ width: { xs: '260px', sm: '300px', md: '500px', lg: '600px' }, paddingRight: { xs: 2, sm: 2, md: 5, lg: 5 }, paddingTop: 5, paddingBottom: 5 }}>
            
          <Box sx={{padding: 3}}>
    <Typography variant="h6" sx={{ textAlign: 'center', fontFamily: 'Raleway'}}>FOOD DETAILS</Typography>
    <Typography variant="body1" sx={{ maxWidth: '100%', overflowWrap: 'break-word' }}>{selectedFood?.existingRecord?.foodName}</Typography>
    <Typography variant="body1" sx={{ maxWidth: '100%', overflowWrap: 'break-word' }}>{selectedFood?.existingRecord?.peopleToBeServed} people can be served</Typography>
    <Typography variant="body1" sx={{ maxWidth: '100%', overflowWrap: 'break-word' }}>{selectedFood?.existingRecord?.description}</Typography>
    
    <Typography variant="h6" sx={{ textAlign: 'center', fontFamily: 'Raleway', marginTop: 3}}>VENUE DETAILS</Typography>
    <Typography variant="body1" sx={{ maxWidth: '100%', overflowWrap: 'break-word' }}>{selectedFood?.existingRecord?.venue}</Typography>
    
    <Typography variant="h6" sx={{ textAlign: 'center', fontFamily: 'Raleway', marginTop: 3}}>CONTACT DETAILS</Typography>
     <Typography variant="body1" sx={{ maxWidth: '100%', overflowWrap: 'break-word' }}>{selectedFood?.existingRecord?.user?.name}</Typography>
     <Typography variant="body1" sx={{ maxWidth: '100%', overflowWrap: 'break-word' }}>{selectedFood?.existingRecord?.contactNo}</Typography>
   
</Box>

<Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
        <Button variant="contained" style={{backgroundColor: "#4CAF50"}} onClick={request}>
        {foodRequest?.existingRecord?.foodRequestStatus==="REQUESTED" ? 'REQUESTED' :
        foodRequest?.existingRecord?.foodRequestStatus==="ACCEPTED" ? 'ACCEPTED' : 'REQUEST'}
          </Button>
          </Box>
        </Grid>
        </Grid>
        </Box>
          </Grid>

<Grid item xs={12} sm={12} md={4} lg={4}>
  <Box sx={{border: '1px solid', padding: 5}}>
    {!foodRequest && (
      <Typography>You did not book any distributors</Typography>
    )}
    {foodRequest!==null && (
      <img style={{width: 250, height: '150px', display: 'block', marginBottom: 10, marginLeft: 'auto', marginRight: 'auto'}}
      src='/images/A10.jpg'
      loading="lazy"
      alt={foodRequest?.existingRecord?.distributorId?.name}
    />
    )}
    {foodRequest?.existingRecord?.distributorStatus==='PENDING' ? (
      <Typography sx={{textAlign: 'center'}}>You booked {foodRequest?.existingRecord?.distributorId?.name}</Typography>
    ) : foodRequest?.existingRecord?.distributorStatus==='ACCEPTED' ? (
      <Typography sx={{textAlign: 'center'}}>{foodRequest?.existingRecord?.distributorId?.name} accepted your booking</Typography>
    ) : foodRequest?.existingRecord?.distributorStatus==='DECLINED' ? (
      <Typography sx={{textAlign: 'center'}}>{foodRequest?.existingRecord?.distributorId?.name} declined your booking</Typography>
    ) : foodRequest?.existingRecord?.distributorStatus==='READY' ? (
      <Typography sx={{textAlign: 'center'}}>{foodRequest?.existingRecord?.distributorId?.name} is on their way for pickup</Typography>
    ) : foodRequest?.existingRecord?.distributorStatus==='PICKEDUP' ? (
      <Typography sx={{textAlign: 'center'}}>{foodRequest?.existingRecord?.distributorId?.name} picked up your food</Typography>
    ) : foodRequest?.existingRecord?.distributorStatus==='DISTRIBUTED' ? (
      <Typography sx={{textAlign: 'center'}}>{foodRequest?.existingRecord?.distributorId?.name} delivered your food</Typography>
    ) : (null)} 
  </Box>
         </Grid>
        </Grid>
        
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <DistributorMap distributor={distributors?.existingRecord} food={selectedFood?.existingRecord}/>
      </Modal>
      </Box> */}
        </>
    )
}