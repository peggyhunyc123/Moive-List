import React, { Fragment, Component } from 'react';
import store from './store/index';
import './App.css';
import Moives from './listTemplate';
import axios from "axios";

class App extends Component {

  componentDidMount() {
    const action = getMovies();
    store.dispatch(action);
  }
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    store.subscribe(this.handleStoreChange);
  }

  render() {
    let list = '';
    list = (this.state.mylist.length === 0) ? <span style={{color:' lightslategray'}}>You don't like anything</span> : <ul className='list'>{this.state.mylist.map((item) => (
      <li key={item.id}>{item.title}</li>
    ))}</ul>
    return (
      <Fragment>
        <div className='logo'>
          <img src='https://assets.brand.microsites.netflix.io/assets/1ed15bca-b389-11e7-9274-06c476b5c346_cm_800w.png?v=20'
           alt='logo' 
           style={{width:'268px',height:'auto'}}/>
        </div>
        <div>
          <Moives
            data={this.state.mylist}
            handleMouseOver={this.handleMouseOver}
            handleMouseOut={this.handleMouseOut}
            title={'My List'}
            show={this.state.show}
            handleBtnClick={this.handleBtnRemove}
            btnName={'Remove'}
          />
        </div>

        <div>
          <Moives
            data={this.state.recommendations}
            handleMouseOver={this.handleMouseOver}
            handleMouseOut={this.handleMouseOut}
            title={'Recommendations'}
            show={this.state.show}
            handleBtnClick={this.handleBtnAdd}
            btnName={'Add'}
          />
        </div>
        <h2 style={{color:' lightslategray'}}>My List:</h2>
        {list}
      </Fragment>
    );
  }

  handleBtnAdd = (index) => {
    const action = {
      type: 'ADD_MOVIE',
      index
    }
    store.dispatch(action);
  }

  handleBtnRemove = (index) => {
    const action = {
      type: 'REMOVE_MOVIE',
      index
    }
    store.dispatch(action);
  }

  handleMouseOver(id) {
    const action = {
      type: 'MOUSE_OVER',
      id
    }
    store.dispatch(action);
  }

  handleMouseOut() {
    const action = {
      type: 'MOUSE_OUT',
    }
    store.dispatch(action);
  }

  handleStoreChange() {
    this.setState(store.getState());
  }
}

const getMovies= () => {
  return (dispatch) => {
    axios.get('./data.json').then((res) => {
      const data = res.data;
      const action = {
        type: 'GET_DATA',
        data
      };
      dispatch(action);
    })
  }
}

export default App;

