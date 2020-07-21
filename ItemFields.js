/*

ItemFields is a polymorphic element that returns an element form component depending on type

*/

import React from 'react';
import ButtonFields from '../WidgetFormsFields/ButtonFields';
import FormFields from '../WidgetFormsFields/FormFields';
import ImageFields from '../WidgetFormsFields/ImageFields';
import SeparatorFields from '../WidgetFormsFields/SeparatorFields';
import TextFields from '../WidgetFormsFields/TextFields';
import SocialFields from '../WidgetFormsFields/SocialFields';
import { elements } from '../../../constants/onsiteWidgets';

const typeToFieldsMap = {
  [elements.BUTTON]: ButtonFields,
  [elements.FORM]: FormFields,
  [elements.IMAGE]: ImageFields,
  [elements.SEPARATOR]: SeparatorFields,
  [elements.TEXT]: TextFields,
  [elements.SOCIAL]: SocialFields
};

const ItemFields = ({ type, ...rest }) => {
  const FieldsComponent = typeToFieldsMap[type];

  if (!FieldsComponent) {
    return null;
  }

  return <FieldsComponent {...rest} />;
};

export default ItemFields;
