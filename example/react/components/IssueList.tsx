import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';

import BCFViewer from '../../viewer/BCFViewer';
import { RootState } from '../state/store';
import { selectTopic } from '../state/bcfSlice';
import * as BCF from '../../../src';

const columns: GridColDef[] = [
    { field: 'index', headerName: 'No.', type: 'number', width: 80 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'topicStatus', headerName: 'Status', flex: 1 },
];

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '.selected-row': { backgroundColor: theme.palette.action.selected },
}));

export default function IssueList() {
    const topics = useSelector((state: RootState) => state.bcf.topics);
    const selected = useSelector((state: RootState) => state.bcf.selectedTopic);
    const dispatch = useDispatch();

    if (!topics) return null;
    if (topics.length === 0) return null;

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <StyledDataGrid
                rows={topics}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                getRowId={(row) => row.uuid}
                onRowClick={(params) => {
                    // Find the topic from the state
                    const topic = topics.filter((topic) => topic.uuid === params.id)[0];
                    if (!topic) return;

                    // Convert the topic to the THREE.js version
                    const topic3 = new BCF.THREE.Topic_Three();
                    topic3.fromJSON(topic);
                    BCFViewer.setTopicCameraState(topic3);

                    // Finally, update the state
                    dispatch(selectTopic(topic.index));
                }}
                getCellClassName={(params: any) => {
                    return params.id === selected?.uuid ? 'selected-row' : '';
                }}
            />
        </div>
    );
}
