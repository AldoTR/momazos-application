import React, { Component } from "react";
import MomazosDataService from "../services/momazos-service";

import Momazos from "./momazos.component";

export default class MomazosList extends Component {
  constructor(props) {

    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMomazos = this.setActiveMomazos.bind(this);
    this.onDataChange = this.onDataChange.bind(this);
//  this.state = this.state.bind(this);

    this.state = {
      momazos: [],
      currentMomazos: null,
      currentIndex: -1,
    };

    this.unsubscribe = undefined;
  }

  componentDidMount() {
    this.unsubscribe = MomazosDataService.getAll().orderBy("title", "asc").onSnapshot(this.onDataChange);
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  onDataChange(items) {
    let momazos = [];

    items.forEach((item) => {
      let id = item.id;
      let data = item.data();
      momazos.push({
        id: id,
        title: data.title,
        description: data.description,
        url:data.url,
        published: data.published,
      });
    });

    this.setState({
      momazos: momazos,
    });
  }

  refreshList() {
    this.setState({
      currentMomazos: null,
      currentIndex: -1,
    });
  }

  setActiveMomazos(memes, index) {
    this.setState({
      currentMomazos : memes,
      currentIndex : index,
    })
    console.log(this.state);
  }

  render() {
    const { momazos, currentMomazos, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Momazos List</h4>

          <ul className="list-group">
            {momazos &&
              momazos.map((meme, index) => (
                <li
                  className={ "list-group-item " + (index === currentIndex ? "active" : "") }
                  onClick={() => this.setActiveMomazos(meme, index)}
                  key={index}
                >
                  {meme.title}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentMomazos ? (
            <Momazos
              momazos={currentMomazos}
              refreshList={this.refreshList}
            />
          ) : (
            <div>
              <br />
              <p>Haz click en un momazo</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
