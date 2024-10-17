const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://gofood:1488@cluster0.orp4s.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0';
const MongoDb = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        console.log('Successfully connected to MongoDB');

        // Fetch data from the collection
        const fetched_data = await mongoose.connection.db.collection("food_items");
        const data = await fetched_data.find({}).toArray();
                global.food_items = data;

        // Fetch data from the collection
        const fetched_category = await mongoose.connection.db.collection("foodCategory");
        const catdata = await fetched_category.find({}).toArray();
                global.foodCategory = catdata;                



        // Log the fetched data
        // console.log(fetched_data);

    } catch (error) {
        console.error('Error connecting to MongoDB or fetching data', error);
    } 
    // finally {
    //     // Close the connection
    //     // mongoose.connection.close();
    // }
}

module.exports = MongoDb;

