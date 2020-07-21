/*

This module shows components that are used for a complex widget form. 
The form allows users to set up a content of widget markup without coding.
Element is a simple block like a button, text, or input with a button. Each element has a special settings form.
Widget is a container with one or two columns, element direction, special size, background color, and other options.
Users can drag elements using a mouse or toolbar's buttons, remove elements.

*/

/*

DesignStepLayout provides a flexible template. 
It's responsible for a common page markup but doesn't depend on types of slot components.

*/

import get from 'lodash/fp/get';
import React from 'react';
import { reduxForm, FormSection, getFormValues } from 'redux-form';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Preview from './Preview';
import SettingsSide from './SettingsSide';
import { ElementsToolbar } from './ElementsToolbar';
import { ActiveElementToolbar } from './ActiveElementToolbar';
import { StepButtons } from '../../Stepper/StepButtons';
import { FormContextProvider } from './FormContext';
import { directions } from '../../../constants/onsiteWidgets';

const SECTION_NAME = 'widget';
const selectType = get(`${SECTION_NAME}.type`);
const selectSizeType = get(`${SECTION_NAME}.sizeType`);
const getDirection = get(`${SECTION_NAME}.flexDirection`);
const getColumnQuantity = get(`${SECTION_NAME}.columnQuantity`);

const DesignStepLayout = ({
  toolbarSlot,
  settingsSlot,
  previewSlot,
  footerSlot
}) => (
  <Box py={2} px={4}>
    <Grid container spacing={2}>
      <Grid xs={12} item>
        {toolbarSlot}
      </Grid>
      <Grid xs={12} lg={8} item>
        {previewSlot}
      </Grid>
      <Grid xs={12} lg={4} item>
        {settingsSlot}
      </Grid>
      <Grid xs={12} item>
        {footerSlot}
      </Grid>
    </Grid>
  </Box>
);

/*

DesignStep is a part of a wizard form. 
It manipulates with context, determines slots, and uses redux hooks for store access.

Toolbar's panels is connected to context. Each panel visibility depends on context values.

*/

const Toolbar = () => (
  <>
    <ElementsToolbar />
    <ActiveElementToolbar />
  </>
);

const DesignStep = ({
  onBack,
  onSubmit,
  invalid,
  submitting,
  form,
  singleWidgetType,
  elements
}) => {
  const values = useSelector(getFormValues(form));
  const widgetType = selectType(values);
  const columnQuantity = getColumnQuantity(values);
  const sizeType = selectSizeType(values);
  const horizontal = getDirection(values) === directions.ROW;

  return (
    <FormContextProvider
      form={form}
      section={SECTION_NAME}
      horizontal={horizontal}
      widgetType={widgetType}
      sizeType={sizeType}
      columnQuantity={columnQuantity}
      singleWidgetType={singleWidgetType}
      elements={elements}
    >
      <form>
        <FormSection name={SECTION_NAME}>
          <DesignStepLayout
            toolbarSlot={<Toolbar />}
            settingsSlot={<SettingsSide />}
            previewSlot={<Preview />}
            footerSlot={
              <StepButtons
                onBack={onBack}
                onNext={onSubmit}
                disabled={invalid || submitting}
              />
            }
          />
        </FormSection>
      </form>
    </FormContextProvider>
  );
};

export default reduxForm()(DesignStep);
