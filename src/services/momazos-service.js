import {firestore} from "../firebase";

const db = firestore.collection("/momazos");

class MomazosDataService{
    getAll(){
        return db;
    }

    create(momazos){
        return db.add(momazos);
    }

    update(id, value){
        return db.doc(id).update(value);
    }

    delete(id){
        return db.doc(id).delete();
    }
}

const FDS=new MomazosDataService();
export default FDS;
