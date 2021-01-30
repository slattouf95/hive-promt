export default function reducer(state, action) {
  switch (action.type) {
    case "GET_ITEMS":
      return {
        ...state,
        items: action.payload
      };
    case "TOGGLE_ITEM":
      let selected;
      const {id,val} = action.payload;
      if(state.isMultiSelect){
        if(state.selectedItems.has(id)){
          selected = new Map(state.selectedItems)
          selected.delete(id);
        }else {
          selected = new Map(state.selectedItems).set(id,val);
        }
      }else {
        if(state.selectedItems.has(id)){
          selected = new Map();
        }else {
          selected = new Map().set(id,val);
        }
      };

      return {
        ...state,
        selectedItems: selected
      };
  
    case "SELECT_ALL":
      const selectAll = new Map();

      for(let i = 0; i < state.items.length; i ++){
        selectAll.set(state.items[i].id,state.items[i].val);
      }

      return {
        ...state,
        selectedItems: selectAll
      };
    case "DESELECT_ALL":
      let select = new Map();

      return {
        ...state,
        selectedItems: select
      };
    case "LOAD_MORE":
      let newItems = state.items;
      function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

      newItems.push({id: getRandomInt(10000), val: 'test'},{id: getRandomInt(10000), val : 'test'},{id: getRandomInt(10000), val: 'test'});
      return {
        ...state,
        items: newItems
      };
    default:
      return state;
  }
};