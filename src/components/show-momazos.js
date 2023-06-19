import React, { Component } from 'react';
import MomazosDataService from "../services/momazos-service";
import LoginWithGoogle from './google_signin_reactions_comments'

export default class  MomazosList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMomazos = this.setActiveMomazos.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      MomazosList: [],
      CurrentMomazos: null,
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
    let MomazosList = [];

    items.forEach((item) => {
      let id = item.id;
      let data = item.data();
      MomazosList.push({
        id: id,
        title: data.title,
        url: data.url,
        description: data.description,
        published: data.published,
      });
    });

    this.setState({
      MomazosList: MomazosList,
    });
  }

  refreshList() {
    this.setState({
      CurrentMomazos: null,
    });
  }

  setActiveMomazos(meme) {
    this.setState({
      CurrentMomazos: meme,
    });
  }

  render() {
    const { MomazosList, CurrentMomazos } = this.state;

    return (
      <div className="gallery">
        {CurrentMomazos ? (
          <div>
            
            <div>
              <h4>Título: {CurrentMomazos.title}</h4>
              <p>Descripción: {CurrentMomazos.description}</p>
              <img className="firebase-image" src={CurrentMomazos.url} alt={CurrentMomazos.title} />
            </div>
            <div>
              <LoginWithGoogle CurrentMomazos={CurrentMomazos} />
            </div>
            <div className='divButton'>
              <button className='buttonStl' onClick={this.refreshList}>Regresar</button>
            </div>
          </div>
        ) : (
          MomazosList &&
          MomazosList.map((meme) => (
            <div className="gallery-item" key={meme.id}>
              <h4>{meme.title}</h4>
              <img src={meme.url} alt={meme.title} onClick={() => this.setActiveMomazos(meme)} />
              <div className="gallery-item-description">
                <p>{meme.description}</p>
                <button className='buttonStl' onClick={() => this.setActiveMomazos(meme)}>Detalles</button>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
}
