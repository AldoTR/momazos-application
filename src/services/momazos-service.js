import firebase from "../firebase";

const db = firebase.collection("Momazos");

class MomazosDataService{
    getAll(){
        return db;
    }

    create(Momazos){
        return db.add(Momazos);
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
