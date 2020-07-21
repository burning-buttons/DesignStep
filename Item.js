/*

Item is a polymorphic component that returns an element's component depending on type.

*/

import React from 'react';
import { Button } from '../../../generator/items/Button';
import { Form } from '../../../generator/items/Form';
import { Image } from '../../../generator/items/Image';
import { Separator } from '../../../generator/items/Separator';
import { Text } from '../../../generator/items/Text';
import { Social } from '../../../generator/items/Social';
import { elements } from '../../../constants/onsiteWidgets';

const elementByTypeMapping = {
  [elements.BUTTON]: Button,
  [elements.FORM]: Form,
  [elements.IMAGE]: Image,
  [elements.SEPARATOR]: Separator,
  [elements.TEXT]: Text,
  [elements.SOCIAL]: Social
};

const getPreviewCommonItemStyle = (horizontal, active) => ({
  pointerEvents: 'none',
  cursor: 'pointer',
  outline: 'none',
  ...(horizontal
    ? { marginRight: '10px' }
    : { marginBottom: '10px', width: '100%' }),
  border: active ? '1px dashed cyan' : '1px dashed lightgray'
});

const commonStyle = {
  display: 'flex'
};

const getCommonItemStyle = (horizontal, additionStyles) =>
  horizontal
    ? {
        ...commonStyle,
        ...additionStyles,
        flexDirection: 'row'
      }
    : {
        ...commonStyle,
        ...additionStyles,
        flexDirection: 'column'
      };

const Item = ({
  item,
  innerRef,
  horizontal,
  sizes,
  active,
  alignItems,
  layoutProps,
  ...rest
}) => {
  const ItemComponent = elementByTypeMapping[item.type];

  return (
    <div ref={innerRef} {...rest}>
      <div style={getPreviewCommonItemStyle(horizontal, active)}>
        <ItemComponent
          layoutProps={layoutProps}
          commonStyle={getCommonItemStyle(horizontal, { alignItems })}
          horizontal={horizontal}
          sizes={sizes}
          {...item}
          isEditing
        />
      </div>
    </div>
  );
};

export default Item;
