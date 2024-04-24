"use client"
import { Box, Button, ImageList, ImageListItem, Typography } from "@mui/material";
import { getUser, onUpdateUser } from '../../redux/actions/Dashboard';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import '../../app/style.css';
import { useRouter } from "next/navigation";
import Link from "next/link";
import Distributor from "@/app/distributor/page";
import Receiver from "@/app/receiver/page";
import Donor from "@/app/donor/page";

export default function Home2({session}: any) {
  const userData = useSelector((state) => state?.userSlice?.value?.userData?.existingRecord);
  console.log("USERDATA:", userData);
  const router = useRouter();
  const dispatch = useDispatch();
  const [ user, setUser ] = useState(userData);
  const [ userType, setUserType ] = useState(user?.userType);
  const currentDate = new Date().toISOString();
  const [ updateUser, setUpdatedUser ] = useState({
    orgName: '',
    address: '',
    contactNo: '',
    userType: user?.userType,
    todayDate: currentDate,
    startTime: '',
    endTime: '',
  });
  useEffect(()=>{
    const getUserDetails = async() => {
      try{
  if(session!==null){
    const user = await dispatch(getUser(session?.user?.email));
    setUser(user);
  }
}
    catch(error){
      console.error('Error fetching user records:', error);
    }
} 
getUserDetails();
}, [session, dispatch])

useEffect(() => {
  setUpdatedUser(prevState => ({ ...prevState, userType: userType?.toUpperCase() }));  
  const updateUserDetails = async() => {
    try{
  if(userType!==null){
     const updatedData = await dispatch(onUpdateUser(updateUser, session?.user?.email));
     setUser(updatedData);
  }
}
catch(error){
  console.error('Error updating usertypes of user records:', error);
}
}
updateUserDetails()
}, [userType, updateUser?.userType])

const handleClick = () => {
  console.log("USERTYPE:", user?.userType?.toLowerCase());
  if(userType!==null || userType!==undefined){
    const lowerCaseUserType = user?.userType?.toLowerCase();
  // window.location.href = `/${lowerCaseUserType}`; 
  router.push(`/${lowerCaseUserType}`); 
  }
}

  return (   
    <>
    {/* {session!==null ? ( */}
    {userData?.userType===null || userData?.userType===undefined? (
      <Box sx={{backgroundColor: '#E6E6E6', display: 'flex', justifyContent: 'center', flexDirection: 'column', borderRadius: 5, marginTop: 12, marginBottom: -10, padding: 5}}>
      <Typography sx={{fontSize: '20px', textAlign: 'center'}} variant="h1">Whom do you want to signin as</Typography>
    <ImageList sx={{ width: 800, paddingTop: '50px'}} cols={3} gap={70}>
      {itemData.map((item) => (
        <ImageListItem key={item.img} onClick={() => setUserType(item.title)}>
         {/* <ImageListItem key={item.img}> */}
         {/* <ImageListItem key={item.img} onClick={() => handleImageClick(item)}> */}
          <img
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
            className="image-hover"
          />
          <Typography variant="body1" className="message">
    {item.title==='donor' ? ("Donor") : (item.title==='receiver' ? ("Receiver") : ("Distributor"))}
  </Typography>
        </ImageListItem>
      ))}
    </ImageList> 
    </Box>
) : (
  <>
  {/* <Typography sx={{fontSize: '20px'}} variant="h1">You are now logged in as {userData?.userType}</Typography> */}
  {/* <Button onClick={handleClick}>Proceed</Button> */}
  {/* <Link href={`/${userData?.userType}`}>Proceed</Link> */}
  {userData?.userType === 'DONOR' ? (
    <Box sx={{width: '100%'}}>
    <Donor />
    </Box>
  ) : userData?.userType === 'RECEIVER' ? (
    <Box sx={{width: '100%'}}>
    <Receiver />
    </Box>
  ) : (
    <Distributor />
  )}
  </>
)}
{/* ) : (
  <Typography>Error</Typography>
 )}  */}
    </>
  )
}
  
const itemData = [
  {
    img: '/images/food_donator.jpg',
    title: 'donor',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'receiver',
  },
  {
    img: '/images/food_distributor.jpg',
    title: 'distributor',
  }
]