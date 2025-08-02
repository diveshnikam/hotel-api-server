const mongoose = require("mongoose");
const Hotel = require("./models/hotel.model");
const cors = require("cors")
const { initDatabase } = require("./db/db.connect");
const express = require("express")
const app = express()

app.use(express.json())
app.use(cors())

initDatabase();

const newHotel2 = {
  name: "Lake View",
  category: "Mid-Range",
  location: "124 Main Street, Anytown",
  rating: 3.2,
  reviews: [],
  website: "https://lake-view-example.com",
  phoneNumber: "+1234555890",
  checkInTime: "2:00 PM",
  checkOutTime: "12:00 PM",
  amenities: ["Laundry", "Boating"],
  priceRange: "$$$ (31-60)",
  reservationsNeeded: true,
  isParkingAvailable: false,
  isWifiAvailable: true,
  isPoolAvailable: false,
  isSpaAvailable: false,
  isRestaurantAvailable: false,
  photos: [
    "https://example.com/hotel1-photo1.jpg",
    "https://example.com/hotel1-photo2.jpg",
  ],
};

const newHotel3 = {
  name: "Sunset Resort",
  category: "Resort",
  location: "12 Main Road, Anytown",
  rating: 4.0,
  reviews: [],
  website: "https://sunset-example.com",
  phoneNumber: "+1299655890",
  checkInTime: "2:00 PM",
  checkOutTime: "11:00 AM",
  amenities: [
    "Room Service",
    "Horse riding",
    "Boating",
    "Kids Play Area",
    "Bar",
  ],
  priceRange: "$$$$ (61+)",
  reservationsNeeded: true,
  isParkingAvailable: true,
  isWifiAvailable: true,
  isPoolAvailable: true,
  isSpaAvailable: true,
  isRestaurantAvailable: true,
  photos: [
    "https://example.com/hotel2-photo1.jpg",
    "https://example.com/hotel2-photo2.jpg",
  ],
};

const newHotel1 = {
  name: "New Hotel",
  category: "Mid-Range",
  location: "123 Main Street, Frazer Town",
  rating: 4.0,
  reviews: [],
  website: "https://hotel-example.com",
  phoneNumber: "+1234567890",
  checkInTime: "2:00 PM",
  checkOutTime: "12:00 PM",
  amenities: ["Laundry", "Room Service"],
  priceRange: "$$$ (31-60)",
  reservationsNeeded: true,
  isParkingAvailable: true,
  isWifiAvailable: true,
  isPoolAvailable: false,
  isSpaAvailable: false,
  isRestaurantAvailable: true,
  photos: [
    "https://example.com/hotel-photo1.jpg",
    "https://example.com/hotel-photo2.jpg",
  ],
};

const addHotel = async (newHotel) => {
  const newH = new Hotel(newHotel);
  const hotelSave = await newH.save();
  return hotelSave
};

app.post("/hotel", async (req, res) => {
  try{
    const savedData = await addHotel(req.body)
    res.status(201).json({message: "Data added successfully", newData: savedData})
  }catch(error){
    console.log(error)
    res.status(500).json({error: "Failed to save"})
  }
})



const newHotel = async (hotel) => {
  try {
    const hotelNew = Hotel(hotel);
    const hotelSave = await hotelNew.save();
  } catch (error) {
    throw error;
  }
};

//newHotel(newHotel2)

//newHotel(newHotel3)

const showAllHotels = async () => {
  try {
    const allHotels = await Hotel.find();
    return allHotels;
  } catch (error) {
    throw error;
  }
};

app.get("/hotels", async (req, res) => {
  try{

    const allHotels = await showAllHotels()

    if(allHotels != 0){
      res.json(allHotels)
    }else{
      res.status(404).json({error: "hotels not found"})
    }

  }catch(error){
    res.status(500).json({error: "Faile to fetch"})
  }
})


//showAllHotels()

const showByName = async (hotelName) => {
  try {
    const hotelByName = await Hotel.find({ name: hotelName });
    return hotelByName;
  } catch (error) {
    throw error;
  }
};

app.get("/hotels/:hotelName", async (req, res) => {
  try{

    const hotelByName = await showByName(req.params.hotelName)

    if(hotelByName.length > 0){
      res.json(hotelByName)
    }else{
      res.status(404).json({error: "hotels not found"})
    }

  }catch(error){
    res.status(500).json({error: "Faile to fetch"})
  }
})

//showByName("Lake View")

const showParkingAvailable = async () => {
  try {
    const parkingAvailable = await Hotel.find({ isParkingAvailable: true });
    console.log(parkingAvailable);
  } catch (error) {
    throw error;
  }
};

//showParkingAvailable()

const showRestaurantAvailable = async () => {
  try {
    const restaurantAvailable = await Hotel.find({
      isRestaurantAvailable: true,
    });
    console.log(restaurantAvailable);
  } catch (error) {
    throw error;
  }
};

//showRestaurantAvailable()

const showByCategoryName = async (categoryNAME) => {
  try {
    const byCategoryName = await Hotel.find({ category: categoryNAME });
    return byCategoryName;
  } catch (error) {
    throw error;
  }
};

app.get("/hotels/category/:hotelCategory", async (req, res) => {
  try{

    const hotelsByCategory = await showByCategoryName(req.params.hotelCategory)

    if(hotelsByCategory.length > 0){
      res.json(hotelsByCategory)
    }else{
      res.status(404).json({error: "Hotel not found"})
    }

  }catch(error){
    res.status(500).json({error: "Failed to fetch"})
  }
})

//showByCategoryName("Mid-Range")

const getHotelsByPriceRange = async (price) => {
  try {
    const hotels = await Hotel.find({ priceRange: price });
    console.log(hotels);
  } catch (error) {
    throw error;
  }
};






//getHotelsByPriceRange("$$$$ (61+)");

const getHotelsByRating = async (rating) => {
  try {
    const hotels = await Hotel.find({ rating: rating });
    return hotels;
  } catch (error) {
    throw error;
  }
};


app.get("/hotels/rating/:hotelRating", async (req, res) => {
  try{

    const hotelsByRating = await getHotelsByRating(req.params.hotelRating)

    if(hotelsByRating.length > 0){
      res.json(hotelsByRating)
    }else{
      res.status(404).json({error: "Hotel not found"})
    }

  }catch(error){
    res.status(500).json({error: "Failed to fetch"})
  }
})



//getHotelsByRating(4.0);

const getHotelByPhoneNumber = async (phone) => {
  try {
    const hotel = await Hotel.findOne({ phoneNumber: phone });
    return hotel;
  } catch (error) {
    throw error;
  }
};

app.get("/hotels/directory/:phoneNumber", async (req, res) => {
  try{

    const hotelByPhoneNo = await getHotelByPhoneNumber(req.params.phoneNumber)

    if(hotelByPhoneNo){
      res.json(hotelByPhoneNo)
    }else{
      res.status(404).json({error: "Hotel not found"})
    }

  }catch(error){
    res.status(500).json({error: "Failed to fetch"})
  }
})

//getHotelByPhoneNumber("+1299655890");

const updateDataById = async (hotelId, dataToUpdate) => {
  try {
    const data = await Hotel.findByIdAndUpdate({ _id: hotelId }, dataToUpdate, {
      new: true,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

app.post("/hotels/:hotelId", async (req, res) => {
  try{
      const updatedData = await updateDataById(req.params.hotelId, req.body)
      if(updatedData){
        res.status(200).json({message: "Data Updated Successfully", data: updatedData})
      }else{
        res.status(404).json({error: "Hotel not found"})
      }
  }catch(error){
    res.status(500).json({error: "Failed to Update"})
  }
})

//updateDataById("687629042fe577550692c87b", {checkOutTime: "11am"})

const updateDataByName = async (hotelName, dataToUpdate) => {
  try {
    const data = await Hotel.findOneAndUpdate(
      { name: hotelName },
      dataToUpdate,
      { new: true }
    );
    console.log(data);
  } catch (error) {
    throw error;
  }
};

//updateDataByName("Sunset Resort",{rating: 4.2} )

const updateDataByPhoneNumber = async (phone, dataToUpdate) => {
  try {
    const data = await Hotel.findOneAndUpdate(
      { phoneNumber: phone },
      dataToUpdate,
      { new: true }
    );
    console.log(data);
  } catch (error) {
    throw error;
  }
};

//updateDataByPhoneNumber("+1299655890", { phoneNumber: "+1997687392" });

const deleteByHotelId = async (hotelId) => {
  try {
    const deleteHotel = await Hotel.findByIdAndDelete(hotelId);
    return deleteHotel
  } catch (error) {
    throw error;
  }
};

app.delete("/hotels/:hotelId", async (req, res) => {
    try{

      const deletedData = await deleteByHotelId(req.params.hotelId)

      if(deletedData){
        res.status(200).json({message: "Data deleted Successfully", data: deletedData})
      }

    }catch(error){
      res.status(500).json({error: "Failed to delete"})
    }
})

//deleteByHotelId("68727e5a64e66e5323aba324")

const deleteByHotelNumber = async (hotelNumber) => {
  try {
    const deleteHotel = await Hotel.findOneAndDelete(hotelNumber);
    console.log("This Data is deleted", deleteHotel);
  } catch (error) {
    throw error;
  }
};

//deleteByHotelNumber({ phoneNumber: "+1997687392" });



const PORT = 3000

app.listen(PORT, () => {
  console.log("Server is ruuning on PORT", PORT)
})
