import React, { useState, useEffect } from 'react';
import {
  Box, Avatar, Typography, Button, Stack, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { FileDownload, FileUpload, Edit, AddBoxOutlined } from '@mui/icons-material';
import axios from 'axios';

const getStatusChip = (status) => {
  const colorMap = {
    'New': 'info',
    'In-progress': 'warning',
    'Completed': 'success'
  };
  return (
    <Chip
      label={status}
      color={colorMap[status]}
      variant="outlined"
      size="small"
      sx={{ textTransform: 'capitalize' }}
    />
  );
};

const DetailedReport = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('add'); // 'add' or 'edit'
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    value: '',
    date: '',
    status: '',
    avatar: ''
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = () => {
    axios.get('http://localhost:3001/detailedReport')
      .then(res => setRows(res.data))
      .catch(err => console.error('Error fetching data:', err));
  };

  const handleOpenDialog = () => {
    setMode('add');
    setFormData({
      name: '',
      company: '',
      value: '',
      date: '',
      status: '',
      avatar: ''
    });
    setOpen(true);
  };

  const handleEditDialog = (row) => {
    setMode('edit');
    setSelectedId(row.id);
    setFormData({
      name: row.name,
      company: row.company,
      value: row.value,
      date: row.date,
      status: row.status,
      avatar: row.avatar
    });
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setFormData({
      name: '',
      company: '',
      value: '',
      date: '',
      status: '',
      avatar: ''
    });
    setSelectedId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddDetailReport = () => {
    axios.post('http://localhost:3001/detailedReport', formData)
      .then(res => {
        setRows(prev => [...prev, res.data]);
        handleCloseDialog();
      })
      .catch(err => console.error('Error creating report:', err));
  };

  const handleEditDetailReport = () => {
    axios.put(`http://localhost:3001/detailedReport/${selectedId}`, formData)
      .then(() => {
        setRows(prev =>
          prev.map(row => (row.id === selectedId ? { ...formData, id: selectedId } : row))
        );
        handleCloseDialog();
      })
      .catch(err => console.error('Error updating report:', err));
  };

  const columns = [
    {
      field: 'checkbox',
      headerName: '',
      width: 50,
      renderCell: () => <input type="checkbox" />,
      sortable: false,
      filterable: false,
      disableColumnMenu: true
    },
    {
      field: 'name',
      headerName: 'Customer Name',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar src={params.row.avatar} alt={params.value} />
          <Typography variant="body2" fontWeight={600}>{params.value}</Typography>
        </Stack>
      )
    },
    { field: 'company', headerName: 'Company', flex: 1 },
    { field: 'value', headerName: 'Order Value', flex: 1 },
    { field: 'date', headerName: 'Order Date', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => getStatusChip(params.value)
    },
    {
      field: 'edit',
      headerName: '',
      width: 50,
      renderCell: (params) => (
        <Edit fontSize="small" onClick={() => handleEditDialog(params.row)} sx={{ cursor: 'pointer' }} />
      ),
      sortable: false,
      filterable: false,
      disableColumnMenu: true
    }
  ];

  return (
    <Box sx={{ height: 500, width: '100%', p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={700}>
          <i className="bi bi-file-earmark-text"></i> Detailed report
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button onClick={handleOpenDialog} variant="outlined" color="primary" startIcon={<AddBoxOutlined />}>
            Add
          </Button>
          <Button variant="outlined" startIcon={<FileDownload />}>Import</Button>
          <Button variant="outlined" color="error" startIcon={<FileUpload />}>Export</Button>
        </Stack>
      </Stack>

      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        autoHeight
      />

      {/* Dialog */}
      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{mode === 'add' ? 'Add New Detail Report' : 'Edit Detail Report'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField name="name" label="Customer Name" fullWidth value={formData.name} onChange={handleChange} />
            <TextField name="company" label="Company" fullWidth value={formData.company} onChange={handleChange} />
            <TextField name="value" label="Order Value" fullWidth value={formData.value} onChange={handleChange} />
            <TextField name="date" label="Order Date (DD/MM/YYYY)" fullWidth value={formData.date} onChange={handleChange} />
            <TextField
              select
              name="status"
              label="Status"
              fullWidth
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="In-progress">In-progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </TextField>
            <TextField name="avatar" label="Avatar URL (optional)" fullWidth value={formData.avatar} onChange={handleChange} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          {mode === 'add' ? (
            <Button variant="contained" onClick={handleAddDetailReport}>
              Add New Detail Report
            </Button>
          ) : (
            <Button variant="contained" onClick={handleEditDetailReport}>
              Edit This Detail Report
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DetailedReport;
