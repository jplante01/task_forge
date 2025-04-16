import { createContext, useState } from "react";
import * as React from "react";
import PropTypes from "prop-types";

export const UIStateContext = createContext();

export const UIStateProvider = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <UIStateContext.Provider value={{ selectedProject, setSelectedProject }}>
      {children}
    </UIStateContext.Provider>
  );
};

UIStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
