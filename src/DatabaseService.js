import {fires} from "./firebase";

const db=fires.collection("/businesses");

const getAll= () => {
    return db;
}

const create = (data) => {
    return db.add(data);
};

//add a car to a business

const get = (key) =>{
    return db.child(key);
}

//MORE FUNCTIONS TO BE ADDED LATER
const DatabaseService = {
    getAll,
    create,
};

export default DatabaseService;