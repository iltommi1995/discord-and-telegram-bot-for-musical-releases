const fs = require('fs');

// This function is used to check if the data to insert are
// already present in my dataset

const whileLoop = async (dataset, toAdd, present) => {
    present = false;
    var i = 0;
    
    while(present == false && i < dataset.length) {
        present = dataset[i].albumName == toAdd.albumName ? true : false;
        console.log(i);
        console.log(dataset[i].albumName + "    " + toAdd.albumName + "   " + present);
        i ++;
    } 
    
    // Returns the boolean "present"
    
    return present;      
}

// This is the function that will be called inside the resolvers. 
// The data already stored, the data to insert and the output json
// path must be passed

const insert = async (dataset, toAdd, path) => {

    var present = true;

    // It's called a function "whileLoop" that returns a boolean that
    // makes me understand whether the data to be inserted are present
    // or not within the data already archived

    present = await whileLoop(dataset, toAdd, present);

    // If the data to be entered are not present, then they will be
    // inserted in the json

    if(present == false) {
        dataset.push(toAdd);
        console.log(dataset);
        fs.writeFile(path, JSON.stringify(dataset), function(err) {
            if (err) throw err;
        });
    } else {
        // If data to be entered are already present, nothing is done

        console.log("Data already present!");
    }

    // Updated data are returned
    return dataset;
}

module.exports.insert = insert;