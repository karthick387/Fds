import { Button, Card, CardContent, CardMedia, Collapse, IconButton, IconButtonProps, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFoodRequestBasedOnFoodId, onUpdateFoodRequest } from "../../redux/actions/Dashboard";
import Link from "next/link";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }
  
  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
type Props = {
  id?: any;
    title?: string;
    servings?: string;
    image?: string;
    description?: string;
    venue?: string;
}
export default function FoodCard({title, servings, image, description, venue, id} : Props) {
    const [expanded, setExpanded] = useState(false);
    const loader = useSelector((state) => state?.loaderSlice?.value?.isLoading);
    const dispatch = useDispatch();
    const [ food, setFood ] = useState(null);
    const [ status, setStatus ] = useState({
      foodRequestStatus: "ACCEPTED",
      distributorStatus: 'PENDING',
    })

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const getFoodRequests = async() => {
      try{
        const food = await dispatch(getFoodRequestBasedOnFoodId(id));
        setFood(food);
      }
      catch(error){
        console.log(error);
      }
    }
    getFoodRequests();
  }, [id])

  const acceptRequest = async() => {
    try{
      await dispatch(onUpdateFoodRequest(status, id))
    }
catch(error){
  console.log(error);
}
  }
  

    return( 
    <div>
        <Card sx={{ width: 300 }}>
        <Link href={`/receiverFoodDetail/${id}`}>
        <CardMedia
        component="img"
        height="194"
        image= {image}
        alt="Paella dish"
      />
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
      Venue Details<ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
           {venue}
          </Typography>
        </CardContent>
      </Collapse>
      {food?.existingRecord?.foodRequestStatus==="REQUESTED" ? (
      <Button variant="contained" style={{backgroundColor: "#4CAF50"}} onClick={acceptRequest} disabled={loader}>
      REQUESTED
            </Button>
      ) : food?.existingRecord?.foodRequestStatus==="ACCEPTED" ? (
        <Button variant="contained" style={{backgroundColor: "#4CAF50"}} disabled>
      ACCEPTED
            </Button>
      ) : (null)}
      </Link>
        </Card>
    </div>
    )
  }