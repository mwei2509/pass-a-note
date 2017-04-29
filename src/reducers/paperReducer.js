let id = 0
let defaultState = {
  bgdeg: 150
}
export default function paperReducer(state=defaultState, action){
  switch(action.type){
    case "UPDATE_PAPER":
      return Object.assign({}, state, action.paper)
    default:
      return state
  }
}
