let id = 0
export default function makePins(state={pins: []}, action){
  switch(action.type){
    case 'ADD_PIN':
      id++
      let pin = {...action.pin, id: id}
      return {pins: state.pins.concat(pin)}
    case 'UPDATE_TEXT':
    let newstate = Object.assign({}, state, {pins: state.pins.map(pin=>{
      if (pin.id===action.pin.id){
        return Object.assign({}, pin, {text: action.pin.text, max: action.pin.max})
      }else{
        return pin
      }
    })})
      return newstate
    case 'DELETE_PIN':
      return {pins: state.pins.filter(pin=>(pin.id !== action.id))}
    default:
      return state
  }
}
