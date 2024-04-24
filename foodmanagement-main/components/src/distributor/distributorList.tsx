import { AspectRatio, CardOverflow } from "@mui/joy";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFoodRequest, getFoodRequestBasedOnDistributorId, getFoodRequestBasedOnFoodId } from "../../../redux/actions/Dashboard";
import { convertTo12HourFormat } from "utils/timeConversion";

type Props = {
  id?: string,
    name?: string;
    address?: string;
    contactNo?: string;
    startTime?: string;
    endTime?: string;
    image?: string;
    food?: any;
}
export default function DistributorList({id, name, address, contactNo, startTime, endTime, image, food} : Props) {
  const convertedStartTime = convertTo12HourFormat(startTime);
  const convertedEndTime = convertTo12HourFormat(endTime);
  const dispatch = useDispatch();
  let [ foodRequest, setFoodRequest ] = useState(null);
  const [ distributor, setDistributor ] = useState(null);
  const userData = useSelector((state) => state?.userSlice?.value?.userData?.existingRecord);
  const [ bookRequest, setBookRequest ] = useState({
    foodRequestStatus: "REQUESTED",
    distributorStatus: "PENDING", 
    foodId: food?.foodId,
    requestingUserId: userData?.id,
    requestedDistributorId: id,
  })
  const book = async() => {
    try{
      const foodRequest = await dispatch(createFoodRequest(bookRequest));
      setFoodRequest(foodRequest?.existingRecord);
    }
    catch(error){
      console.log(error);
  }
  }
  useEffect(() => {
    const getFoodRequest = async() => {
      try{
        const distributor = await dispatch(getFoodRequestBasedOnDistributorId(id));
        console.log("DISTRIBUTOR:", distributor);
        if(distributor?.existingRecord?.foodId===food.foodId){
        setDistributor(distributor);
        }
      }
      catch(error){
        console.log(error);
      }
    }
    getFoodRequest();
  }, [id])
  console.log("DISTRIBUTOR1:", distributor);

  useEffect(() => {
    const getFoodRequest = async() => {
      try{
        const foodRequest = await dispatch(getFoodRequestBasedOnFoodId(food?.foodId));
        setFoodRequest(foodRequest?.existingRecord);
        }
      catch(error){
        console.log(error);
        setFoodRequest(null);
      }
    }
    getFoodRequest();
  }, [])

    return( 
      <div style={{margin: 15}}>
        <Card 
        sx={{ width: 320, maxWidth: '100%', boxShadow: 'lg', backgroundColor: "#4CAF50", color: 'white'}}>
       <CardOverflow>
        {/* <AspectRatio sx={{ minWidth: 250, borderRadius: '10px'}}> */}
          <img style={{width: 250, height: '150px', display: 'block', marginTop: 10, marginLeft: 'auto', marginRight: 'auto'}}
            src={image}
            // srcSet="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286&dpr=2 2x"
            loading="lazy"
            alt="Paella dish"
          />
        {/* </AspectRatio> */}
      </CardOverflow>
      <CardContent>
      <Typography variant="h6">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mt: 2}}>
          {address} 
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mt: 2}}>
          {contactNo}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mt: 2}}>
          Available from {convertedStartTime} to {convertedEndTime}
        </Typography>
      </CardContent>
      <CardOverflow>
        <Box sx={{ width: 320, height: 40, backgroundColor: "#4CAF50", display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2}}>
      {foodRequest===null ? (
      <Button sx={{width: '50%', borderRadius: '15px',
        backgroundColor: '#2e7d32', 
        color: 'white', 
      }} onClick={book}>BOOK</Button>
        ) : (
          distributor?.existingRecord?.distributorId?.id===id ? (
            <Button sx={{width: '50%', borderRadius: '15px',
              backgroundColor: '#2e7d32', 
              color: 'white', 
            }} onClick={book} disabled>{distributor?.existingRecord?.distributorStatus}
              </Button>
        ) : (
          <Button sx={{width: '50%', borderRadius: '15px',
          backgroundColor: '#2e7d32', 
          color: 'white', 
        }} onClick={book} disabled>BOOK
          </Button>
        ))}
        </Box>
      </CardOverflow>
        </Card>
     </div>
    )
  }