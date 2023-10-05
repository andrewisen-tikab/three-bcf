import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import Panel from './Panel';

import { DataGrid } from '@mui/x-data-grid';
import type { GridRenderCellParams, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import Checkbox from '@mui/material/Checkbox';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { RootState } from '../state/store';
import { IFCSomething } from '../../types';
import BCFViewer from '../../viewer/BCFViewer';

function RenderCheckBox(props: GridRenderCellParams<any, boolean>) {
    const [checked, setChecked] = React.useState(props.value);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        BCFViewer.setVisibility([props.id as number], event.target.checked);
    };

    return (
        <Checkbox
            icon={<VisibilityIcon />}
            checkedIcon={<VisibilityOffIcon />}
            checked={checked}
            onChange={handleChange}
        />
    );
}

const columns: GridColDef[] = [
    { field: 'type', headerName: 'Type', width: 100 },
    { field: 'objectType', headerName: 'Object Type', width: 250 },
    { field: 'name', headerName: 'Name', width: 380 },
    {
        field: 'visible',
        headerName: 'Visible',
        width: 100,
        renderCell: RenderCheckBox,
    },
];

function getRowId(row: IFCSomething) {
    return row.expressID;
}

const onRowSelectionModelChange = (rowSelectionModel: GridRowSelectionModel) => {
    BCFViewer.setSelection(rowSelectionModel as number[]);
};

function SettingsContent() {
    const state = useSelector((store: RootState) => store.bcf.IFCSomething);

    return (
        <Box
            sx={{
                width: '66vw',
                height: '100vh',
                // bgcolor: 'text.secondary',
                // bgcolor: 'rgba(0,0,0,0.1)',
                // bgcolor: 'rgba(0,0,0,0.5)',
                backgroundColor: 'transparent',
            }}
        >
            <Panel title="Settings" sx={{ mt: 4 }}>
                <CardContent>
                    <Typography variant="body1">
                        This panel allows you to control the selection and visibility of the
                        elements in the model.
                        <br />
                        These settings are unique to each BCF issue.
                    </Typography>
                    <br />
                    <Typography variant="body1">
                        This means that you can have different settings for each BCF issue.
                    </Typography>
                    <br />
                    <Typography variant="body1">
                        The checkbox controls the selection. A selected object will be highlighted
                        in green.
                        <br />
                        The eye icon controls the visibility of the object.
                        <br />
                        <br />
                        N.B: A hidden object will be highlighted if selected (!).
                    </Typography>
                    <br />
                    <Box sx={{ height: '50vh' }}>
                        <DataGrid
                            density="compact"
                            checkboxSelection
                            disableRowSelectionOnClick
                            rows={state}
                            columns={columns}
                            getRowId={getRowId}
                            onRowSelectionModelChange={onRowSelectionModelChange}
                        />
                    </Box>
                </CardContent>
            </Panel>
        </Box>
    );
}

export default function Settings() {
    const [open, setOpen] = useState(false);

    const onClick = () => {
        setOpen((prev) => !prev);
    };

    return (
        <>
            <Button
                aria-label="settings"
                startIcon={open ? <SettingsTwoToneIcon /> : <SettingsIcon />}
                onClick={onClick}
            >
                Settings
            </Button>
            <Drawer
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                variant="persistent"
                hideBackdrop={true}
                PaperProps={{
                    sx: {
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        backdropFilter: 'blur(5px)',
                    },
                }}
            >
                <SettingsContent />
            </Drawer>
        </>
    );
}
