/*

FormContext stores many common values that are used by many slot components.
Context usage is more useful in this case because we don't need to pass all these variables down throw the tree directly.

*/

import React, { createContext, useState } from 'react';

export const FormContext = createContext();

export const FormContextProvider = ({
  children,
  form,
  section,
  horizontal,
  widgetType,
  sizeType,
  columnQuantity,
  singleWidgetType,
  elements
}) => {
  const [activeElementId, setActiveElementId] = useState();

  return (
    <FormContext.Provider
      value={{
        activeElementId,
        setActiveElementId,
        form,
        section,
        horizontal,
        widgetType,
        sizeType,
        columnQuantity,
        singleWidgetType,
        elements
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
