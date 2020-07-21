/*

This Toolbar's panel provides us the possibility to choose an element that we want to add to a widget on the preview.
A new element is inserted into the store by dispatching a redux-form action push. Form values are delivered by the context.
All new elements have a unique ID. Type with the last 6 symbols of random UUID.

*/

import uuid from 'uuid/v4';
import isNil from 'lodash/isNil';
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { arrayPush } from 'redux-form';
import { Box, Button, FormLabel } from '@material-ui/core';
import {
  elements as ELEMENTS,
  DEFAULT_ELEMENT_VALUES
} from '../../../constants/onsiteWidgets';
import { FormContext } from './FormContext';

const generateId = type => `${type}-${uuid().slice(-6)}`;

const elementTypeMapping = {
  [ELEMENTS.IMAGE]: {
    title: 'image'
  },
  [ELEMENTS.SEPARATOR]: {
    title: 'separator'
  },
  [ELEMENTS.TEXT]: {
    title: 'text'
  },
  [ELEMENTS.BUTTON]: {
    title: 'button'
  },
  [ELEMENTS.FORM]: {
    title: 'form'
  },
  [ELEMENTS.SOCIAL]: {
    title: 'social links'
  }
};

export const ElementsToolbar = () => {
  const dispatch = useDispatch();
  const { activeElementId, form, section, elements = [] } = useContext(
    FormContext
  );

  if (!isNil(activeElementId)) {
    return null;
  }

  const push = item => dispatch(arrayPush(form, `${section}.items`, item));
  const addItem = type => () => {
    const defaultValues = DEFAULT_ELEMENT_VALUES[type] || {};
    const item = { type, id: generateId(type), ...defaultValues };

    push(item);
  };

  return (
    <Box display="flex" alignItems="baseline">
      <FormLabel>Choose element:</FormLabel>
      {elements.map(el => (
        <Button key={el} onClick={addItem(el)}>
          {elementTypeMapping[el].title}
        </Button>
      ))}
    </Box>
  );
};
