import React, { Fragment, Component } from 'react';
import store from './store/index';
import './APP.css';

class APP extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.handleStoreChange = this.handleStoreChange.bind(this);
    // this.handleMouseIn = this.handleMouseIn.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseOver= this.handleMouseOver.bind(this);

    store.subscribe(this.handleStoreChange);
  }

  render() {
    let list = '';
    list = (this.state.mylist.length ===0) ?  "You don't like anything" : <ul>{this.state.mylist.map((item) => (
      <li key={item.id}>{item.title}</li> 
     ))}</ul>
    return (
      <Fragment>
        <h2>My List</h2>
        <div className='container'>
        
          {this.state.mylist.map((item, index) => (
            <div className='movie'
              key={item.id}
              onMouseOver={()=>this.handleMouseOver(item.id)}
              onMouseOut={this.handleMouseOut}
            >
              <div className='title'>{item.title}</div>
              <div className='cell'>
              <img src={item.img} alt='movie_img' />
              {this.state.show===item.id ? <button
                className='btn'
                onClick={this.handleBtnRemove.bind(this, index)}
              >Remove</button> : <button style={{visibility:"hidden"}} className='btn'>Remove</button>}
              </div>
            </div>
          ))}
        </div>
        <h2>Recommendations</h2>
        <div className='container'>
        
          {this.state.recommendations.map((item, index) => (
            <div className='movie'
              key={item.id}
              id={item.id}
              onMouseOver={()=>this.handleMouseOver(item.id)}
              onMouseOut={this.handleMouseOut}
            >
              <div className='title'>{item.title}</div>
              <div className='cell'>
              <img src={item.img} alt='movie_img' />
              {this.state.show===item.id ? <button
                className='btn'
                onClick={this.handleBtnAdd.bind(this, index)}
              >Add</button> : <button style={{visibility:"hidden"}} className='btn'>Add</button>}
              </div>
            </div>
          ))}
        </div>
        <h2>My List:</h2>
          {list}
      </Fragment>
    );
  }

  handleBtnAdd(index) {
    const action = {
      type: 'ADD_MOVIE',
      index
    }
    store.dispatch(action);
  }

  handleBtnRemove(index) {
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

export default APP;

