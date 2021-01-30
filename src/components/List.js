import React, {useContext, useEffect,useRef, useState} from 'react';
import DropdownContext from "../context";
import './styles/List.css';


const List = ({isOpen}) => {
  const { state, dispatch } = useContext(DropdownContext);
  const [isFetching, setIsFetching] = useState(false);
  const listRef = useRef();

  useEffect(() => {
    const isScrolling =  () => {
      if (
        listRef.current.scrollTop + listRef.current.clientHeight >= listRef.current.scrollHeight ||
        isFetching
      ){
        setIsFetching(true);
        dispatch({type:"LOAD_MORE"});
        setIsFetching(false);
      }
    };
    if(isOpen){
      listRef.current.addEventListener("scroll", isScrolling,false);
    }
    return () => {
      if(listRef?.current){
        listRef.current.removeEventListener("scroll", isScrolling)
      }
    };
  }, [isOpen]);
  
  return (
    <div 
      ref={listRef} 
      className="dropdown-list" 
      style={{height: 100, overflow: "scroll"}}
    >
      {
        state.items.map(({id,val}) => (
          <div className={"dropdown-item"} key={id} onClick={() => {dispatch({type: "TOGGLE_ITEM",payload: {id, val}})}}>
            {val}
            <div>
            {state.selectedItems.has(id) && <img alt="check mark" src="https://img.icons8.com/small/16/000000/filled-checked-checkbox.png"/>}
            </div>
          </div>
        ))
      }
    </div>
  );
  
};

export default List;