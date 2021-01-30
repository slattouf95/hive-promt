import React, {useState, useContext, useReducer, useEffect} from 'react';
import DropdownContext from '../context';
import DropdownReducer from '../reducer';
import List from './List.js';
import './styles/Dropdown.css';

const items = [{id: 1, val: 'Option 1'},{id: 2, val : 'Option 2'},{id: 3 , val: 'Option 3'},{id: 4, val: 'Option 1'},{id: 5, val : 'Option 2'},{id: 6 , val: 'Option 3'},{id: 7, val: 'Option 1'},{id: 8, val : 'Option 2'},{id: 9 , val: 'Option 3'},{id: 10, val: 'Option 1'},{id: 11, val : 'Option 2'},{id: 12 , val: 'Option 3'},{id: 13, val: 'Option 1'},{id: 14, val : 'Option 2'},{id: 15 , val: 'Option 3'}]

const Dropdown = () => {

  const initialState = useContext(DropdownContext);
  const [state,dispatch] = useReducer(DropdownReducer, initialState);
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    dispatch({
      type: "GET_ITEMS",
      payload: items
    })
  },[]);

  const handleToggle = () => {
    setIsOpen( prevIsOpen => !prevIsOpen);
  };

  const getLabel = () => {
    let label = "";
    let counter = 0;
    let size = state.selectedItems.size 
    if(size === 0){
      return "No Option Chosen"
    }else {

      for(let [key,value] of state.selectedItems){
        if(counter > 3 && size > 3){
          return label.slice(2).concat(' ...')
        }
        label += `, ${value}`;
        counter += 1;
      }
      return label.slice(2);
    }
  }

  return (
    <DropdownContext.Provider value={{state, dispatch}} className={"dropdown"} >
      <div>Dropdown</div>
      <div onClick={handleToggle} className={"dropdown-select"} > 
        {getLabel()}
        {
        isOpen ? <img alt="chevron up" src="https://img.icons8.com/plumpy/24/000000/chevron-down.png"/> :  <img alt="chevron down" src="https://img.icons8.com/plumpy/24/000000/chevron-up.png"/>
        }
      </div>
      {
        isOpen && <List isOpen={isOpen} />
      }
      {
        isOpen && state.isMultiSelect && (
          <>
            <button onClick={() => dispatch({type:"SELECT_ALL"})}>Select All </button>
            <button onClick={() => dispatch({type:"DESELECT_ALL"})}>Deselect All </button>
          </>
        )
      }
    </DropdownContext.Provider>
  );
};

export default Dropdown;







