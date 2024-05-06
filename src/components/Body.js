import React from 'react'
import RestaurantCard from './RestaurantCard'
import {Row, Col} from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Loader from './Loader'


  
const Body = () => {

    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);

    const [searchText, setSearchText] = useState("");

    console.log("Rendering");
    //Whenever we try to change state variable react re-renders our whole body component
// -30:00
    useEffect(()=>{
     fetchData();
    }, []);

    const fetchData = async () => {
      const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.61610&lng=73.72860&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
      const json = await data.json();

      console.log(json);
      setListOfRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

    }
    
//Conditional Rendering : rending on the basis of contions is 'conditional rendering'
    if(listOfRestaurants.length === 0){
      return <Loader/>
    }

    return (
        <>

<Col>        
<div className='filter' style={{display:"flex"}} >
        <button className='btn btn-dark' onClick={() => {
          const filteredList = listOfRestaurants.filter((res) => res.info.avgRating > 3.9 );
           setListOfRestaurants(filteredList);
        }} >
          Filter <i className="fas fa-search"></i></button>
          </div>

          <div className='search' >
            <input type='text' className='search-box my-2' value={searchText} 
            onChange={(e) => {
                  setSearchText(e.target.value);
              
            }} />
            <button className='btn btn-dark my-3' style={{margin:"10px", lineHeight:"0.2rem"}}
              onClick={() => {
                console.log(searchText)
                const filteredRestaurant = listOfRestaurants.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()));
                setFilteredRestaurant(filteredRestaurant);
              
              }} 
            > Search</button>
          </div>
          </Col>
       
         <Row>
            
    {filteredRestaurant.map((restaurant) => (
         <Col key={restaurant.info.id} sm={12} md={6} lg={4} xl={3} > 
        <RestaurantCard resData={restaurant}/>
        
         </Col>
    ))}
      
    </Row> 
         </>
        // <div className="body" >
        //     <div className="search">Search</div>
        //      <div className="res-container">
        //         {
        //           resList.map(restaurant => <RestaurantCard key={restaurant.info.id} resData={restaurant} />)
        //         }
        //      </div>
        // </div>
    )
}

export default Body
