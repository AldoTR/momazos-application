import React, { Component } from "react";
import MomazosDataService from "../services/momazos-service";

export default class Momazos extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescripton = this.onChangeDescripton.bind(this);
        this.updatePublished = this.updatePublished.bind(this);

        this.state = {
            currentMomazos: {
                id: null,
                title:"",
                description:"",
                published: false,
            },
            message:"",
        };

    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { fisico } = nextProps;
        if (prevState.currentMomazos.id !== Momazos.id){
            return{
                currentMomazos: Momazos,
                message:""
            };
        }

        return prevState.currentMomazos;
    }

    componentDisMount(){
        this.setState({
            currentMomazos: this.props.fisico,
        });
    }

    onChangeTitle(e){
        const title = e.target.value;

        this.setState(function (prevState){
            return {
                currentMomazos: {
                    ...prevState.currentMomazos,
                    title:title,
                },
            };
        });
    }

    onChangeDescripton(e){
        const description = e.target.value;

        this.setState(function (prevState){
            return {
                currentMomazos:{
                    ...prevState.currentMomazos,
                    description:description,
                },
            };
        });
    }


    updatePublished(status){
        MomazosDataService.update(this.state.currentMomazos.id, {
            published: status,
        }).then(()=>{
            this.setState((prevState)=>({
                currentMomazos: {
                    ...prevState.currentMomazos,
                    published: status,
                },
                message: "The status was update successfully!",
            }));
        }).catch((e)=>{
            console.log(e);
        });
    }

    updateMomazos(){
        //const onDataChange={
        //    title: this.state.currentMomazos.title,
        //    description: this.state.currentMomazos.description
        //};

        MomazosDataService.update(this.state.currentMomazos.id, {
            title: this.state.currentMomazos.title,
            description: this.state.currentMomazos.description
        }).then(()=>{
            this.setState({
                message: "The tutorial was updated successfully!",
            });
        }).catch((e)=>{
            console.log(e);
        });
    }

    deleteMomazos(){
        MomazosDataService.delete(this.state.currentMomazos.id)
        .then(()=>{
            this.props.refreshList();
        }).catch((e)=>{
            console.log(e);
        });
    }

    render(){
        const { currentMomazos } = this.state;
        return (
            <div>
                <br/>
                <h4>Momazo Seleccionado</h4>
                {currentMomazos ? (
                    <div className="edit-form">
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentMomazos.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value = {currentMomazos.description}
                                    onChange={this.onChangeDescripton}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                {currentMomazos.published ? "Published" : "Pending"}
                            </div>
                        </form>

                        {currentMomazos.published ? (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={()=> this.updatePublished(false)}
                            >
                                UnPublish
                            </button>
                        ):(
                            <button
                                className="badge badge-primary mr-2"
                                onClick={()=> this.updatePublished(true)}
                            >
                                Publish
                            </button>
                        )}

                        <button
                            className="badge badge-danger mr-2"
                            onClick={()=>this.deleteMomazos()}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={()=>this.updateMomazos()}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ):(
                    <div>
                        <br />
                        <p>Haz click en un momazo</p>
                    </div>
                )}
            </div>
        );
    }
}
