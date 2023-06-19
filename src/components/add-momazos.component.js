import React, { Component } from "react";
import MomazosDataService from "../services/momazos-service";
import "firebase/compat/storage";
import firebase  from "firebase/compat/app";
export const storage = firebase.storage();

export default class ADDMomazos extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveMomazos = this.saveMomazos.bind(this);
        this.newMomazos = this.newMomazos.bind(this);
        //this.onChangeURL=this.onChangeURL.bind(this);

        this.state ={
            title: "",
            description: "",
            published: false,
            url:"",
            submitted: false,
        };
    }

    onChangeFile(e) {

        console.log (e.target.files[0])
    
        this.setState({
          file : e.target.files[0]
        });
    }

    handleUpload(e, file) {
        e.preventDefault();
        console.log(file);
        alert(file.name);
        const uploadTask = storage.ref('/images/'+file.name).put(file);
        uploadTask.on("state_changed", console.log, console.error, ()=>{
          storage
                .ref("images")
                .child(file.name)
                .getDownloadURL()
                .then((myurl)=>{
                  alert(myurl);
                  this.setState({ url: myurl });
                });
        });
      }

    onChangeTitle(e){
        this.setState({
            title: e.target.value,
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value,
        });
    }

    saveMomazos(){
        let data={
            title:this.state.title,
            description: this.state.description,
            published: false,
            url: this.state.url
        };

        MomazosDataService.create(data).then(()=>{
            console.log("Created new item successfully!");
            this.setState({
                submitted: true,
            });
        })
        .catch((e) => {
            console.log(e);
        });
    }

    newMomazos(){
        this.setState({
            title: "",
            description: "",
            published: false,
            url:"",
            submitted: false,
        });
    }

    render(){
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>you submitted successfuly!</h4>
                        <button className="btn btn-success" onClick={this.newMomazos}>
                            Add
                        </button>
                    </div>
                ):(
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                name="title"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                name="description"
                            />
                        </div>
                        <br/>
                        
                        <div>
                
                            <form onSubmit={ (event) => {
                                this.handleUpload(event, this.state.file)
                            }} >
                            <input type="file" onChange={(event)=> { 
                                this.onChangeFile(event) 
                            }} />
                            { this.state.file ? <img alt="Preview" height="200" src={URL.createObjectURL(this.state.file)} /> : null }
                            <button disabled={!this.state.file}>upload to firebase</button>
                            </form>
                            
                            <br/>
                            <button onClick={this.saveMomazos} className="btn btn-success">
                            submit
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
