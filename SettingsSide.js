/*

This component is responsible for the right-side settings panel.
It watches on an active element and shows either an element panel or a widget panel.

*/

import get from 'lodash/fp/get';
import isNil from 'lodash/isNil';
import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFormValues, change } from 'redux-form';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import FormLabel from '@material-ui/core/FormLabel';
import BackIcon from '@material-ui/icons/KeyboardBackspace';
import ItemFields from './ItemFields';
import { MainFields } from '../WidgetFormsFields/MainFields';
import { FormContext } from './FormContext';
import { isWidgetPristine } from '../../../constants/onsiteWidgets';

const findActiveElement = (id, items, itemsName) => {
  const index = items.findIndex(item => item.id === id);

  if (index === -1) {
    return [];
  }

  return [items[index], `${itemsName}.${index}`];
};

const Settings = () => {
  const {
    activeElementId,
    setActiveElementId,
    form,
    section,
    widgetType,
    horizontal,
    singleWidgetType
  } = useContext(FormContext);
  const values = useSelector(getFormValues(form));
  const dispatch = useDispatch();
  const changeField = (...args) => dispatch(change(...args));

  const backgroundImage = get(`${section}.backgroundImage`, values);
  const pristine = isWidgetPristine(values[section]);

  if (isNil(activeElementId)) {
    return (
        <MainFields
          singleWidgetType={singleWidgetType}
          isWidgetPristine={pristine}
          section={section}
          form={form}
          change={changeField}
          backgroundImage={backgroundImage}
          widgetType={widgetType}
        />
    );
  }

  const items = get(`${section}.items`, values);
  const items2 = get(`${section}.items2`, values);

  const [activeElementFromItems, activePathFromItems] = findActiveElement(
    activeElementId,
    items,
    'items'
  );
  const [activeElementFromItems2, activePathFromItems2] = findActiveElement(
    activeElementId,
    items2,
    'items2'
  );

  const activeElement = activeElementFromItems || activeElementFromItems2;
  const activePath = activePathFromItems || activePathFromItems2;

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" alignItems="center">
        <IconButton onClick={() => setActiveElementId(null)}>
          <BackIcon />
        </IconButton>

        <FormLabel component={Box} ml={1}>
          Settings: {widgetType}
        </FormLabel>
      </Box>
      <ItemFields
        type={activeElement.type}
        path={activePath}
        isHorizontal={horizontal}
        values={values}
        section={section}
        form={form}
      />
    </Box>
  );
};

export default Settings;
