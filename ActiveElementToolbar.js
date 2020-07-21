/*

It's the Toolbar panel that provides actions to manipulate elements. It works with a selected element (active).
Because we need to manipulate elements throw two columns, different orders it's used react-redux hooks for selecting store data and dispatching actions.
useMemo and useCallback are used for memory optimization.
User can move the active element up or down (right or left if direction is row) and remove this element.

*/

import get from 'lodash/get';
import isNil from 'lodash/isNil';
import React, { useContext, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { arrayRemove, arrayMove, getFormValues } from 'redux-form';
import { Box, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { FormContext } from './FormContext';

const COLUMNS = ['items', 'items2'];

const findItemById = (id, elementsByColumns) => {
  let element;
  let column;
  let index;

  for (let i = 0; i < COLUMNS.length; i++) {
    if (element) {
      break;
    }

    const name = COLUMNS[i];
    const idx = elementsByColumns[name].findIndex(element => element.id === id);

    if (idx !== -1) {
      element = elementsByColumns[name][idx];
      column = name;
      index = idx;
    }
  }

  return [index, column, element];
};

export const ActiveElementToolbar = () => {
  const [activeIndex, setActiveIndex] = useState();
  const [activeColumn, setActiveColumn] = useState();
  const [activeLength, setActiveLength] = useState();
  const dispatch = useDispatch();
  const { activeElementId, setActiveElementId, form, section } = useContext(
    FormContext
  );

  const formValues = useSelector(getFormValues(form));

  const paths = {
    [COLUMNS[0]]: `${section}.${COLUMNS[0]}`,
    [COLUMNS[1]]: `${section}.${COLUMNS[1]}`
  };

  const columnElements = {
    [COLUMNS[0]]: get(formValues, paths[COLUMNS[0]], []),
    [COLUMNS[1]]: get(formValues, paths[COLUMNS[1]], [])
  };

  const length = {
    [COLUMNS[0]]: columnElements[COLUMNS[0]].length,
    [COLUMNS[1]]: columnElements[COLUMNS[1]].length
  };

  useEffect(() => {
    if (activeElementId) {
      const [index, column] = findItemById(activeElementId, columnElements);

      setActiveIndex(index);
      setActiveColumn(column);
      setActiveLength(length[column]);
    }
  }, [activeElementId, columnElements, length]);

  if (isNil(activeElementId)) {
    return null;
  }

  const remove = id => {
    const [index, column] = findItemById(id, columnElements);
    dispatch(arrayRemove(form, paths[column], index));
    setActiveElementId(undefined);
  };

  const removeItem = () => {
    remove(activeElementId);
    setActiveIndex(undefined);
    setActiveColumn(undefined);
  };

  const move = (idx, nextIdx, path) =>
    dispatch(arrayMove(form, path, idx, nextIdx));

  const moveUp = () => {
    const newIndex = activeIndex - 1;

    move(activeIndex, newIndex, paths[activeColumn]);
    setActiveIndex(newIndex);
  };

  const moveDown = () => {
    const newIndex = activeIndex + 1;

    move(activeIndex, newIndex, paths[activeColumn]);
    setActiveIndex(newIndex);
  };

  return (
    <Box display="flex" alignItems="center">
      <Button onClick={removeItem}>
        <DeleteIcon color="error" />
      </Button>
      <Button onClick={moveUp} disabled={activeIndex === 0}>
        <ArrowUpwardIcon />
      </Button>
      <Button onClick={moveDown} disabled={activeIndex + 1 === activeLength}>
        <ArrowDownwardIcon />
      </Button>
    </Box>
  );
};
