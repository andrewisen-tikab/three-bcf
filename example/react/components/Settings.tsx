import React, { useState } from 'react';

import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import CardContent from '@mui/material/CardContent';

import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import Panel from './Panel';

import { DataGrid } from '@mui/x-data-grid';
import type { GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Checkbox from '@mui/material/Checkbox';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function RenderCheckBox(props: GridRenderCellParams<any, boolean>) {
    const [checked, setChecked] = React.useState(props.value);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
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

const rows: GridRowsProp = [
    { id: 1, col1: 'Hello', col2: 'World', col3: true },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome', col3: true },
    { id: 3, col1: 'MUI', col2: 'is Amazing', col3: true },
];

const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
    {
        field: 'col3',
        headerName: 'Column 3',
        width: 150,
        renderCell: RenderCheckBox,
    },
];

function SettingsContent() {
    return (
        <Box
            sx={{
                width: '66vw',
                height: '100vh',
                bgcolor: 'text.secondary',
            }}
        >
            <Panel title="Settings" sx={{ mt: 4 }}>
                <CardContent>
                    <DataGrid
                        checkboxSelection
                        disableRowSelectionOnClick
                        rows={rows}
                        columns={columns}
                    />
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
            >
                <SettingsContent />
            </Drawer>
        </>
    );
}
