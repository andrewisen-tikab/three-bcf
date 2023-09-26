import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';

import type { RootState } from '../state/store';
import { addTopicComment, removeTopicComment, updateTopicComment } from '../state/bcfSlice';

type CommentProps = {
    index: number;
};

function Comment({ index }: CommentProps) {
    const comment = useSelector((state: RootState) => state.bcf.selectedTopic?.comments[index]);

    const dispatch = useDispatch();

    const update = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!comment) return;
        dispatch(updateTopicComment({ uuid: comment.uuid, comment: event.target.value }));
    };

    const remove = () => {
        if (!comment) return;
        dispatch(removeTopicComment(comment.uuid));
    };

    if (!comment) return null;

    return (
        <Box sx={{ ml: 2 }}>
            <Paper
                elevation={1}
                component="form"
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    mt: 1,
                }}
                variant="outlined"
            >
                <InputBase sx={{ ml: 1, flex: 1 }} value={comment.comment} onChange={update} />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton
                    color="primary"
                    sx={{ p: '10px' }}
                    aria-label="directions"
                    onClick={remove}
                >
                    <ClearIcon color="error" />
                </IconButton>
            </Paper>
        </Box>
    );
}

function Comments() {
    const comments = useSelector(
        (state: RootState) => state.bcf.selectedTopic?.comments,
        (left, right) => left?.length === right?.length,
    );

    if (!comments) return null;

    return comments.map((_, index) => <Comment key={_.uuid} index={index} />);
}

function NewComment() {
    const [comment, setComment] = React.useState<string>('');
    const dispatch = useDispatch();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    const onClick = () => {
        dispatch(addTopicComment(comment));
        setComment('');
    };

    return (
        <Paper
            elevation={10}
            component="form"
            sx={{ display: 'flex', alignItems: 'center', width: '100%', my: 2 }}
            variant="outlined"
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="New comment..."
                value={comment}
                onChange={onChange}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
                color="primary"
                sx={{ p: '10px' }}
                aria-label="directions"
                onClick={onClick}
            >
                <SendIcon />
            </IconButton>
        </Paper>
    );
}

export default function Communications() {
    return (
        <>
            <NewComment />
            <Comments />
        </>
    );
}
