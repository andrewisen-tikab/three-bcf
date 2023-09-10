import CardContent from '@mui/material/CardContent';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { Card, CardMedia, SxProps, Typography } from '@mui/material';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
    ResponderProvided,
    DraggingStyle,
    NotDraggingStyle,
} from 'react-beautiful-dnd';
import { updateTopicIndex } from '../state/bcfSlice';

const grid = 8 as const;

const getListStyle = (isDraggingOver: boolean) => {
    const style: SxProps = {
        background: isDraggingOver ? 'lightblue' : 'transparent',
        display: 'flex',
        padding: grid,
    };
    return style;
};

const getItemStyle = (
    isDragging: boolean,
    spread: DraggingStyle | NotDraggingStyle | undefined = {} as any,
) => {
    const style: SxProps = {
        // userSelect: 'none',
        padding: grid * 2,
        margin: `0 ${grid}px 0 0`,
        background: isDragging ? 'lightgreen' : 'grey',
        ...spread,
    };
    return style;
};

type IssueItemProps = {
    index: string;
    screenshot: string;
};

export function IssueItem({ screenshot: image, index }: IssueItemProps) {
    return (
        <Card>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {index}
                </Typography>
            </CardContent>

            <CardMedia component="img" height="100" image={image} />
        </Card>
    );
}

export default function IssueSorter() {
    const topics = useSelector((state: RootState) => state.bcf.topics);

    const dispatch = useDispatch();

    const onDragEnd = (result: DropResult, _provided: ResponderProvided): void => {
        if (!result.destination) return;

        dispatch(
            updateTopicIndex({ oldIndex: result.source.index, newIndex: result.destination.index }),
        );
    };

    return (
        <CardContent>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                    {(provided, snapshot) => (
                        <div
                            id="WALLA"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver) as any}
                        >
                            {topics.map((topic, _index) => {
                                const { uuid, screenshot, index } = topic;

                                return (
                                    <Draggable
                                        key={`draggable-${uuid}`}
                                        draggableId={uuid}
                                        index={index}
                                    >
                                        {(provided, _snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={
                                                    getItemStyle(
                                                        _snapshot.isDragging,
                                                        provided.draggableProps.style,
                                                    ) as any
                                                }
                                            >
                                                <IssueItem
                                                    key={uuid}
                                                    screenshot={screenshot}
                                                    index={`${index}`}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </CardContent>
    );
}
