import mongoose from "mongoose";
export const database = async () => {
  mongoose
    .connect(
      process.env.MONGO_URI,
      { dbName: "FoodHut" },
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(async () => {
      console.log("DB is connected");
      const foodData = await mongoose.connection.db  
        .collection("fooditems")
        .find()
        .toArray();
      global.foodItems = foodData;

      const foodCategory = await mongoose.connection.db
        .collection("foodCategories")
        .find()
        .toArray();
      global.foodCategory = foodCategory;
    })
    .catch((error) => {
      console.error("Error connecting to the database:", error);
    });
};
