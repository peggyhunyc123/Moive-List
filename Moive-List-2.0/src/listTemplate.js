import React, { Fragment } from 'react';
import './App.css';

const Moives = (props) => {
    return (
        <Fragment>

            <div><h2 className='listName'>{props.title}</h2></div>
            <div className='container'>
                {props.data.map((item, index) => (
                    <div className='movie'
                        key={item.id}
                        onMouseOver={() => props.handleMouseOver(item.id)}
                        onMouseOut={props.handleMouseOut}
                    >
                        <div className='title'>{item.title}</div>
                        <div className='cell'>
                            <img src={item.img} alt='movie_img' />
                            {props.show === item.id ? <button
                                className='btn'
                                onClick={() => {props.handleBtnClick(index)}}
                            >{props.btnName}</button> : <button style={{ visibility: "hidden" }} className='btn'>{props.btnName}</button>}
                        </div>
                    </div>
                ))}
            </div>


        </Fragment>
    )
}

export default Moives;