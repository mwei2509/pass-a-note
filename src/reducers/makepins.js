let id = 0
export default function makePins(state={coords: []}, action){
  switch(action.type){
    case 'ADD_PIN':
      id++
      let coord = {...action.coord, id: id}
      return {coords: state.coords.concat(coord)}
    default:
      return state
  }
}
