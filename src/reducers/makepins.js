let id = 0
export default function makePins(state={pins: []}, action){
  switch(action.type){
    case 'ADD_PIN':
      id++
      let pin = {...action.pin, id: id}
      return {pins: state.pins.concat(pin)}
    case 'DELETE_PIN':
      return {pins: state.pins.filter((pin)=>pin.id !== action.id)}
    default:
      return state
  }
}
