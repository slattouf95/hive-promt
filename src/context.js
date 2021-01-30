import React from "react";

const DropdownContext = React.createContext({
  items: [],
  selectedItems: new Map(),
  isMultiSelect: true,
});

export default DropdownContext;
