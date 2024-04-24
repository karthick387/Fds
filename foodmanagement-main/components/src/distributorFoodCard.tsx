import { Box, Button, Card, CardContent, CardMedia, Collapse, Grid, IconButton, IconButtonProps, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFoodRequestBasedOnFoodId, onUpdateFoodRequest, onUpdateFoodRequestBasedOnReqId } from "../../redux/actions/Dashboard";

type Props = {
    title?: string;
    description?: string;
    venue?: string;
    distributorStatus?: string;
    foodId?: number;
    foodRequestStatus?: string;
    foodReqId?: number;
    foodDetails?: any;
}
export default function DistributorFoodCard({title, description, venue, distributorStatus, foodId, foodRequestStatus, foodReqId, foodDetails} : Props) {  
  const dispatch = useDispatch();
  console.log("mentl:", foodDetails);
    const [ disable, setDisable ] = useState(false);
    const loader = useSelector((state) => state?.loaderSlice?.value?.isLoading);
  const [disableReady, setDisableReady] = useState(false);
  const [disablePickup, setDisablePickup] = useState(false);
  const [disableDeliver, setDisableDeliver] = useState(false);
    // distributorStatus = useSelector((state) => state?.userSlice?.value?.foodRequest?.existingRecord?.distributorStatus);
    const [ status, setStatus ] = useState({
      foodRequestStatus: foodRequestStatus,
      distributorStatus: "ACCEPTED",
    })
    const [ status1, setStatus1 ] = useState({
      foodRequestStatus: foodRequestStatus,
      distributorStatus: 'DECLINED',
    })
    const updateAcceptedStatus = async() => {
      try{
      await dispatch(onUpdateFoodRequestBasedOnReqId(status, foodReqId));
      setDisable(true);
      }
      catch(error){
        console.log(error);
      }
    }
    const updateDeclineStatus = async() => {
      try{
      await dispatch(onUpdateFoodRequestBasedOnReqId(status1, foodReqId));
      setDisable(true);
      }
      catch(error){
        console.log(error);
      }
    }

    const updateStatus = async (event: string) => {
      const newStatus = {
        foodRequestStatus,
        distributorStatus: event === "Ready for pick up" ? "READY" : event === "Picked up" ? "PICKEDUP" : "DISTRIBUTED",
      };
    
      setStatus(newStatus);
    
      try {
        await dispatch(onUpdateFoodRequestBasedOnReqId(newStatus, foodReqId));
        if (newStatus.distributorStatus === "DISTRIBUTED") {
          setDisableReady(true);
          setDisablePickup(true);
          setDisableDeliver(true);
        } else if (newStatus.distributorStatus === "PICKEDUP") {
          setDisableReady(true);
          setDisablePickup(true);
        } else if (newStatus.distributorStatus === "READY") {
          setDisableReady(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    return( 
    <div style={{width: '100%'}}>
      <Grid container columns={12} sx={{width: '100%'}}>
        <Card sx={{ width: 500 }}>
        {/* <CardMedia
        component="img"
        height="194"
        image= "/images/food_1.jpg"
        alt="Paella dish"
      /> */}
      <CardContent>
      <Typography variant="h6" sx={{textAlign: 'center'}}>
          BOOKED PERSON DETAILS
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mt: 2}}>
          {foodDetails?.requestingId?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mt: 2}}>
          {foodDetails?.requestingId?.orgName}, {foodDetails?.requestingId?.address} (Delivery address)
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mt: 2}}>
          {foodDetails?.requestingId?.contactNo}
        </Typography>

        <Typography variant="h6" sx={{textAlign: 'center'}}>
          FOOD DONATOR DETAILS
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mt: 2}}>
          {foodDetails?.food?.venue} (Pickup address)
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mt: 2}}>
          {foodDetails?.food?.user?.contactNo}
        </Typography>

        {distributorStatus==="PENDING" ? (
        <Box sx={{display:'flex', justifyContent: 'center', gap: 1}}>
      <Button variant="contained" style={{backgroundColor: "#4CAF50", marginTop: 3}} onClick={updateAcceptedStatus} /* disabled={disable} */>{/* {disable ? "ACCEPTED" : "ACCEPT"} */}ACCEPT</Button>
            <Button variant="contained" style={{backgroundColor: "#4CAF50", marginTop: 3}} onClick={updateDeclineStatus} /* disabled={disable} */>{/* {disable ? "DECLINED" : "DECLINE"} */}DECLINE</Button>
      </Box>
        ) : distributorStatus==="ACCEPTED" ? (
          <>
        <Typography sx={{textAlign: 'center', fontSize: '16px'}} variant="h6">Update your status</Typography>
       <Button
            onClick={() => updateStatus("Ready for pick up")}
            disabled={disableReady}
          >
            Ready for pick up
          </Button>
          <Button
            onClick={() => updateStatus("Picked up")}
            disabled={disablePickup}
          >
            Picked up
          </Button>
          <Button
            onClick={() => updateStatus("Delivered")}
            disabled={disableDeliver}
          >
            Delivered
          </Button>
          </>
          ) : (null)}
        </CardContent>
      </Card>
      </Grid>
    </div>
  );
}