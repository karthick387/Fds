import { AspectRatio, CardOverflow } from "@mui/joy";
import { Box, Button, Card, CardContent, CardMedia, IconButtonProps, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFoodRequestBasedOnFoodId } from "../../redux/actions/Dashboard";

type Props = {
    title?: string;
    servings?: number;
    image?: string;
    description?: string;
    id?: any;
}
export default function ReceiverFoodCard({title, servings, image, description, id} : Props) {
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.userSlice?.value?.userData?.existingRecord);
  const [ foodRequest, setFoodRequest ] = useState(null);
  console.log("ghhjsjudhdhedhueuehjuf:", foodRequest);
  useEffect(() => {
    const getFoodRequest = async() => {
      try{
        const foodRequest = await dispatch(getFoodRequestBasedOnFoodId(id));
        setFoodRequest(foodRequest);
      }
      catch(error){
        console.log(error);
      }
    }
    getFoodRequest();
  }, [id])
    return( 
      <div style={{width: '100%', position: 'relative', overflow: 'hidden'}}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      >
        <Card 
        sx={{ width: 500, maxWidth: '100%', boxShadow: 'lg'}}>
       <CardOverflow>
        <AspectRatio sx={{ width: '100%' }}>
          <img
            src={image}
            srcSet="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286&dpr=2 2x"
            loading="lazy"
            alt="Paella dish"
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
      <Typography variant="h6">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mt: 2}}>
          {servings} people can be served
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mt: 2}}>
          {description}
        </Typography>
      </CardContent>
      <CardOverflow>
        <Box sx={{ width: '100%', height: 40, backgroundColor: "#4CAF50", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          {!foodRequest ? (
          <Typography sx={{color: 'white', letterSpacing: 2}}>AVAILABLE</Typography>
          ) : (
            <Typography sx={{color: 'white', letterSpacing: 2}}>{foodRequest?.existingRecord?.requestingUserId === userData?.id ? foodRequest?.existingRecord?.foodRequestStatus : "NOT AVAILABLE"}</Typography>)}
        </Box>
      </CardOverflow>
        </Card>
         {hover && (
        <Card sx={{position: 'absolute', top: 0, left: 0, width: 320, maxWidth: '100%', height: '100%', backgroundColor: 'rgba(100, 100, 100, 9)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2}}> 
         <Typography sx={{color: 'white', fontFamily: 'Roboto', fontSize: '16px', marginLeft: 4, marginRight: 4}}>Interested in receiving this food item</Typography> 
         {/* <Button variant="contained" style={{backgroundColor: "#4CAF50"}} onClick={() => window.location.href = `/foodDetail/${title}`}>Click here</Button> */}
         {foodRequest?.existingRecord?.requestingUserId === userData?.id ? (
      <Link href={`/foodDetail/${id}`}>
        <Button variant="contained" style={{ backgroundColor: "#4CAF50" }}>
          Click here
        </Button>
      </Link>
    ) : foodRequest?.existingRecord?.foodRequestStatus === "REQUESTED" || foodRequest?.existingRecord?.foodRequestStatus === "ACCEPTED" ? (
      <Button variant="contained" style={{ backgroundColor: "#4CAF50" }} disabled={foodRequest?.existingRecord?.foodRequestStatus === "REQUESTED" || foodRequest?.existingRecord?.foodRequestStatus === "ACCEPTED"}>
        Click here
      </Button>
    ) : (
<Link href={`/foodDetail/${id}`}>
<Button variant="contained" style={{ backgroundColor: "#4CAF50" }}>
          Click here
        </Button>
</Link>
    )}
                  </Card> 
        )} 
     </div>
    )
  }