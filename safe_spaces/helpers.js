//--------HELPERS--------//

//Get key fom val in dictionary
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}


// Check JSON object entries number
function checkJSON(){
    //Count objects in places  -- JSON check
    let list2 = []
    for (let i = 0; i < places.length; i++) {
        for (let j = 0; j < places[i].objects.length; j++) {
            console.log(places[i].objects.length)   // num of objects per place
            if (list2.indexOf(places[i].objects[j]) === -1){
                list2.push(places[i].objects[j]);
            }
        }
    }
    console.log(list2.length)

    list2.forEach(
        obj => {
            if (objects.indexOf(obj) === -1){
                console.log(obj)
            }
        }
    )
}
