import { Grid } from "@mui/material";
import DistributorList from 'components/src/distributor/distributorList';

type Props = {
  distributor?: any,
  food?: any,
}

export default function DistributorMap({distributor, food}: Props) {
    return( 
    <div>
        <Grid container spacing={2}>
      {distributor?.map((data: any, index: any) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <DistributorList 
            id={data.id}
            name={data.name}
            address={data.address}
            contactNo={data.contactNo}
            startTime={data.startTime}
            endTime={data.endTime}
            image='/images/A10.jpg'
            food={food}
        />
        </Grid>
      ))}
    </Grid>
    </div>
    )
  }