import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import FoodItem from "./FoodItem";

const FoodDisplay = ({ category }) => {

    const { food_list } = useContext(StoreContext)

    return (
        <div id="dish" className=" w-11/12  ">

            <div>
                <h2 className='font-outfit font-bold text-2xl mx-14 my-8' >Top dishes in Lucknow</h2>
            </div>

            <div className="grid grid-cols-4 ml-24   gap-8  ">
                {food_list.map((item, i) => {
                    if(category==="All" || category===item.category) {

                            return <FoodItem key={item._id} id={item._id} name={item.name}  description={item.description} price={item.price} image={item.image} />
                        
                        }
                })}
            </div>
        </div>
    )
}

export default FoodDisplay