import data from '../data.json';

const defaultState = {
    show: 1000000,
    mylist: data.mylist,
    recommendations: data.recommendations
}

export default (state = defaultState, action) => {
    if (action.type === 'ADD_MOVIE') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.mylist.push(newState.recommendations[action.index]);
        newState.recommendations.splice(action.index, 1);

        return newState;
    }
    if (action.type === 'REMOVE_MOVIE') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.recommendations.push(newState.mylist[action.index]);
        newState.mylist.splice(action.index, 1);
        return newState;
    }
    if (action.type === 'MOUSE_OVER') {
        const newState = JSON.parse(JSON.stringify(state));
        
        newState.show = action.id;
        return newState;
    }
    if (action.type === 'MOUSE_OUT') {
        const newState = JSON.parse(JSON.stringify(state));
        newState.show = 10086;
        return newState;
    }
    return state;
}