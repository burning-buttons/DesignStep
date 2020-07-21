/*

These components demonstrate user a widget preview where the user can drag elements and choose one.
react-beautiful-dnd is used for drag-and-drop possibility.
Because widget can have one or two-column there are two components for one or two columns accordingly.

*/

import React, { useContext } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  FieldArray,
  Fields,
  getFormValues,
  arrayMove,
  arrayInsert,
  arrayRemove
} from 'redux-form';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Item from './Item';
import { LayoutComponent, Column } from '../../../generator/layoutComponents';
import { extractWidgetLayoutProperties } from '../selectors';
import {
  sizeByTypeMapping,
  COLUMN_QUANTITY
} from '../../../constants/onsiteWidgets';
import { FormContext } from './FormContext';
import { useResetCssStyles } from './resetCss';

const columnToItemsField = {
  [COLUMN_QUANTITY.ONE_COLUMN]: 'items',
  [COLUMN_QUANTITY.TWO_COLUMNS]: 'items2'
};

const Root = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;
  border: 1px solid #ebeaeb;
  border-radius: 4px;
`;

const EditorPreview = styled.div`
  height: 100%;
  min-width: ${({ sizes }) => sizes.width};
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: auto;
  padding: 40px 0;
  background: linear-gradient(
    45deg,
    transparent 45%,
    rgba(0, 0, 0, 0.14) 45%,
    rgba(0, 0, 0, 0.14) 50%,
    transparent 50%,
    transparent 95%,
    rgba(0, 0, 0, 0.14) 95%
  );
  background-size: 10px 10px;
`;

const DraggableTwoColumnFields = ({
  items,
  items2,
  direction,
  widgetLayoutProps,
  columnLayoutProps,
  layoutProperties,
  elementProps,
  move,
  remove,
  insert,
  section,
  sizeType
}) => {
  const classes = useResetCssStyles();
  const { activeElementId, setActiveElementId } = useContext(FormContext);
  const elements1 = items.input.value;
  const elements2 = items2.input.value;

  const onDragEnd = (source, destination) => {
    move(
      `${section}.${columnToItemsField[destination.droppableId]}`,
      source.index,
      destination.index
    );
  };

  const onDragEndBetweenColumns = (source, destination) => {
    let sourceArray =
      columnToItemsField[source.droppableId] === 'items'
        ? elements1
        : elements2;

    remove(
      `${section}.${columnToItemsField[source.droppableId]}`,
      source.index
    );

    insert(
      `${section}.${columnToItemsField[destination.droppableId]}`,
      destination.index,
      sourceArray[source.index]
    );
  };

  const handleDragEnd = result => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      onDragEnd(source, destination);
    }

    if (source.droppableId !== destination.droppableId) {
      onDragEndBetweenColumns(source, destination);
    }
  };

  return (
    <div
      id="reset-css"
      className={classes.reset}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <LayoutComponent {...widgetLayoutProps} sizeType={sizeType}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable
            droppableId={COLUMN_QUANTITY.ONE_COLUMN}
            direction={direction}
          >
            {(provided, snapshot) => (
              <Column
                {...columnLayoutProps}
                innerRef={provided.innerRef}
                twoColumned
              >
                {elements1.map((element, index) => (
                  <Draggable
                    key={element.id}
                    draggableId={element.id}
                    index={index}
                  >
                    {(nestProvided, nestSnapshot) => (
                      <Item
                        item={element}
                        sizes={elementProps.sizes}
                        alignItems={columnLayoutProps.alignItems}
                        horizontal={elementProps.horizontal}
                        onClick={() => setActiveElementId(element.id)}
                        active={element.id === activeElementId}
                        innerRef={nestProvided.innerRef}
                        layoutProps={layoutProperties}
                        {...nestProvided.draggableProps}
                        {...nestProvided.dragHandleProps}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Column>
            )}
          </Droppable>
          <Droppable
            droppableId={COLUMN_QUANTITY.TWO_COLUMNS}
            direction={direction}
          >
            {(provided, snapshot) => (
              <Column
                {...columnLayoutProps}
                innerRef={provided.innerRef}
                twoColumned
              >
                {elements2.map((element, index) => (
                  <Draggable
                    key={element.id}
                    draggableId={element.id}
                    index={index}
                  >
                    {(nestProvided, nestSnapshot) => (
                      <Item
                        item={element}
                        sizes={elementProps.sizes}
                        alignItems={columnLayoutProps.alignItems}
                        horizontal={elementProps.horizontal}
                        onClick={() => setActiveElementId(element.id)}
                        active={element.id === activeElementId}
                        innerRef={nestProvided.innerRef}
                        layoutProps={layoutProperties}
                        {...nestProvided.draggableProps}
                        {...nestProvided.dragHandleProps}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Column>
            )}
          </Droppable>
        </DragDropContext>
      </LayoutComponent>
    </div>
  );
};

const DraggableFields = ({
  fields: elements,
  direction,
  widgetLayoutProps,
  columnLayoutProps,
  layoutProperties,
  elementProps,
  sizeType
}) => {
  const classes = useResetCssStyles();

  const onDragEnd = result => {
    elements.move(result.source.index, result.destination.index);
  };
  const { activeElementId, setActiveElementId } = useContext(FormContext);

  const handleDragEnd = result => {
    if (!result.destination) {
      return;
    }

    onDragEnd(result);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={COLUMN_QUANTITY.ONE_COLUMN} direction={direction}>
        {(provided, snapshot) => (
          <div
            id="reset-css"
            className={classes.reset}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <LayoutComponent {...widgetLayoutProps} sizeType={sizeType}>
              <Column {...columnLayoutProps} innerRef={provided.innerRef}>
                {elements.getAll().map((element, index) => (
                  <Draggable
                    key={element.id}
                    draggableId={element.id}
                    index={index}
                  >
                    {(nestProvided, nestSnapshot) => (
                      <Item
                        item={element}
                        sizes={elementProps.sizes}
                        alignItems={columnLayoutProps.alignItems}
                        horizontal={elementProps.horizontal}
                        onClick={() => setActiveElementId(element.id)}
                        active={element.id === activeElementId}
                        innerRef={nestProvided.innerRef}
                        layoutProps={layoutProperties}
                        {...nestProvided.draggableProps}
                        {...nestProvided.dragHandleProps}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Column>
            </LayoutComponent>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const Preview = () => {
  const {
    widgetType,
    sizeType,
    section,
    horizontal,
    form,
    columnQuantity
  } = useContext(FormContext);
  const dispatch = useDispatch();
  const values = useSelector(getFormValues(form));

  if (!widgetType || !sizeType) {
    return null;
  }

  const sizes = sizeByTypeMapping[sizeType];

  const { layoutProperties, columnProperties } = extractWidgetLayoutProperties(
    values.widget
  );

  const widgetLayoutProps = {
    sizes,
    widgetType,
    ...layoutProperties
  };

  const elementProps = {
    sizes,
    horizontal
  };

  const direction = horizontal ? 'horizontal' : 'vertical';

  const move = (field, fromIndex, toIndex) =>
    dispatch(arrayMove(form, field, fromIndex, toIndex));

  const remove = (field, index) => dispatch(arrayRemove(form, field, index));

  const insert = (field, index, value) =>
    dispatch(arrayInsert(form, field, index, value));

  return (
    <Root>
      <EditorPreview sizes={sizes}>
        {columnQuantity === COLUMN_QUANTITY.ONE_COLUMN && (
          <FieldArray
            name="items"
            component={DraggableFields}
            direction={direction}
            elementProps={elementProps}
            widgetLayoutProps={widgetLayoutProps}
            layoutProperties={layoutProperties}
            columnLayoutProps={columnProperties}
            sizeType={sizeType}
          />
        )}
        {columnQuantity === COLUMN_QUANTITY.TWO_COLUMNS && (
          <Fields
            names={['items', 'items2']}
            component={DraggableTwoColumnFields}
            direction={direction}
            elementProps={elementProps}
            widgetLayoutProps={widgetLayoutProps}
            layoutProperties={layoutProperties}
            columnLayoutProps={columnProperties}
            move={move}
            remove={remove}
            insert={insert}
            section={section}
            sizeType={sizeType}
          />
        )}
      </EditorPreview>
    </Root>
  );
};

export default Preview;
