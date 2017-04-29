let id = 0
export default function pinsReducer(state={pins: []}, action){
  switch(action.type){
    case 'ADD_PIN':
      id++
      let pin = {...action.pin, id: id}
      return {pins: state.pins.concat(pin)}
    case 'UPDATE_PIN':
    let newstate = Object.assign({}, state, {pins: state.pins.map(pin=>{
      if (pin.id===action.pin.id){
        return Object.assign({}, pin, action.pin)
      }else{
        return pin
      }
    })})
      return newstate
    case 'MOVE_PIN':
      let newState = Object.assign({}, state, {pins: state.pins.map(pin=>{
        if (pin.id === action.pin.id){
          return Object.assign({}, pin, {x: action.pin.x, y: action.pin.y})
        }else{
          return pin
        }
      })})
      return newState
    case 'DELETE_PIN':
      return {pins: state.pins.filter(pin=>(pin.id !== action.id))}
    default:
      return state
  }
}
