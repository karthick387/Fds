import { Grid, Typography } from "@mui/material";
import FoodCard from './donorFoodCard';
import ReceiverFoodCard from '../../components/src/receiverFoodCard';
import DistributorFoodCard from "./distributorFoodCard";

type Props = {
  user?: string;
  foodDetails?: any;
};

export default function FoodMap({user, foodDetails}: Props) {
  console.log("FOOD DETAOILS       :", foodDetails);
    return( 
    <div>
        <Grid container spacing={2}>
          {foodDetails!==null || foodDetails!==undefined ? 
           Array.isArray(foodDetails) ? (
      foodDetails?.map((data: any, index: any) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          {user==='donor' ? (
          <FoodCard
          id={data.foodId}
            title={data.foodName}
            servings={data.peopleToBeServed}
            image="/images/food_1.jpg"
            description={data.description}
            venue={data.venue}
          />
          ) : user==='receiver' ? (
            <ReceiverFoodCard 
            id={data.foodId}
            title={data.foodName}
            servings={data.peopleToBeServed}
            image="/images/food_1.jpg"
            description={data.description}
            />
          ) : (
            <DistributorFoodCard 
            foodDetails={data}
            description={data?.food?.description}
            venue={data?.food?.venue}
            title={data?.food?.foodName}
            distributorStatus={data?.distributorStatus}
            foodReqId={data?.foodReqId}
            />
          )}
        </Grid>
      ))
      ) : (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          {user==='donor' ? (
          <FoodCard
          id={foodDetails?.foodId}
            title={foodDetails?.foodName}
            servings={foodDetails?.peopleToBeServed}
            image="/images/food_1.jpg"
            description={foodDetails?.description}
            venue={foodDetails?.venue}
          />
          ) : user==='receiver' ? (
            <ReceiverFoodCard 
            id={foodDetails?.foodId}
            title={foodDetails?.foodName}
            servings={foodDetails?.peopleToBeServed}
            image="/images/food_1.jpg"
            description={foodDetails?.description}
            />
          ) : (
            <DistributorFoodCard 
            foodId={foodDetails?.foodId}
            foodReqId={foodDetails?.foodReqId}
            foodDetails={foodDetails}
            foodRequestStatus={foodDetails?.foodRequestStatus}
            distributorStatus={foodDetails?.distributorStatus}
            description={foodDetails?.food?.description}
            venue={foodDetails?.food?.venue}
            title={foodDetails?.food?.foodName}
            />
          )}
        </Grid>
      ) : (
        <Typography>No records found</Typography>
      )}
    </Grid>
    </div>
    )
  }