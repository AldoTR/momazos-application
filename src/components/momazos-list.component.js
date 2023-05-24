import React, { Component } from "react";
import MomazosDataService from "../services/momazos-service";

import Momazos from "./momazos.component";
import Reaction from "./reactions.component";
import Com from "./comentarios.component";

export default class MomazosList extends Component {
  constructor(props) {

    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
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

  setActiveTutorial(momazos, index) {
    this.setState({
      currentMomazos : momazos,
      currentIndex : index,
    })
    console.log(this.state);
  }

  render() {
    const { momazos, currentMomazos} = this.state;

    return (
      <div className="row">
        <div className="col-md-6">
          <h4>Todos los momazos</h4>

          <ul className="list-group">
            {momazos &&
              momazos.map((momazo, index) => (
                <li
                  key={index}
                  className="styleItemofList"
                >
                  <div onClick={() => this.setActiveTutorial(momazo, index)}
                  >
                  <div className="styleTitlePublication">{momazo.title}</div>
                  <p>{momazo.description}</p>
                  <div>
                    {momazo.url? <img className="styleImagePublication" alt="Preview" height="300px" src={momazo.url} /> : null }
                  </div>
                  <div>
                    <hr />
                    <Reaction/>
                    <Com/>
                  </div>
                  </div>

                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          <ul className="columnStatic">
          {currentMomazos ? (
            <Momazos
              momazo={currentMomazos}
              refreshList={this.refreshList}
            />
          ) : (
            <div>
              <br />
              <p>Haz click en un momazo</p>
            </div>
          )}
          </ul>
        </div>
      </div>
    );
  }
}
