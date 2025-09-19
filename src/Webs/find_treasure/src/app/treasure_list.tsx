import React, {useState} from 'react';
import {useCreateTreasureHook, useGetTreasureHook} from "./treasure.hook.ts";
import {formatDateTimeVi, type Pagination} from "./extensions.ts";
import {
    Table, Button, TableBody, TablePagination, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter,
    Modal, Typography, Box,
    TextField
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type {TreasureMapCreateModel} from "./treasure.service.ts";
import {Controller, useForm} from "react-hook-form";


const TreasureList: React.FC = () => {
    const schema = yup.object({
        rows: yup.number().required().min(1),
        columns: yup.number().required().min(1),
        chestTypes: yup.number().required().min(1),
        matrix: yup
            .string()
            .required("Matrix is required")
            .test("valid-matrix", "Invalid matrix JSON or dimensions", function (value) {
                const { rows, columns } = this.parent;
                try {
                    const matrix = JSON.parse(value);
                    if (!Array.isArray(matrix)) return false;
                    if (matrix.length !== rows) return false;
                    if (matrix.some((row: any) => !Array.isArray(row) || row.length !== columns)) return false;
                    return true;
                } catch {
                    return false;
                }
            }),
    });
    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        pageSize: 10,
    })
    

    const { data: treasures, isLoading, error, refetch } = useGetTreasureHook(pagination);
    const [openCreateModal, setOpenCreateModal] = useState(false)
  
    const {mutate, isPending, reset} = useCreateTreasureHook()
    
    const { handleSubmit, control, formState } = useForm<TreasureMapCreateModel & { matrix: string }>({
        defaultValues: {
            rows: 3,
            columns: 3,
            chestTypes: 3,
            matrix: "[[1,2,3],[2,1,3],[3,2,1]]",
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: any) => {
        const model: TreasureMapCreateModel & { matrix: string } = {
            rows: data.rows,
            columns: data.columns,
            chestTypes: data.chestTypes,
            matrix: JSON.parse(data.matrix),
        };
        console.log("TreasureMapCreateModel:", model);
        mutate(model, {
            onSuccess: (data: any) => {
                alert("Form submitted! Check console.");
                reset();
                setOpenCreateModal(false)
                refetch()
            },
            onError: (error: any) => {
                alert("Error submitting form: " + error.message);
                reset();
                setOpenCreateModal(false)
                refetch()
            },
        })
    };
    if (isLoading) return <div>Loading treasures...</div>;
    if (error) return <div>Error loading treasures.</div>;
  return (
        <TableContainer component={Paper} className={"p-20"}>
            <Button
                variant="contained"
                color="primary"
                size={"small"}
                style={{ marginBottom: 16 }}
                sx={{ textTransform: 'none', marginBottom: 2 }}
                onClick={() => setOpenCreateModal(true)}
            >
                Create Treasure Map
            </Button>
            <Modal open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
                <Paper sx={{ p: 3, maxWidth: 600, margin: "auto", mt: 5 }}>
                    <Typography variant="h6" gutterBottom>
                        Create Treasure Map
                    </Typography>
                    <Box component="form" display="flex" flexDirection="column" gap={2} onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="rows"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    label="Rows"
                                    type="number"
                                    {...field}
                                    error={!!formState.errors.rows}
                                    helperText={formState.errors.rows?.message}
                                />
                            )}
                        />
                        <Controller
                            name="columns"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    label="Columns"
                                    type="number"
                                    {...field}
                                    error={!!formState.errors.columns}
                                    helperText={formState.errors.columns?.message}
                                />
                            )}
                        />
                        <Controller
                            name="chestTypes"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    label="Chest Types"
                                    type="number"
                                    {...field}
                                    error={!!formState.errors.chestTypes}
                                    helperText={formState.errors.chestTypes?.message}
                                />
                            )}
                        />
                        <Controller
                            name="matrix"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    label="Matrix (JSON)"
                                    multiline
                                    minRows={5}
                                    {...field}
                                    error={!!formState.errors.matrix}
                                    helperText={formState.errors.matrix?.message || 'Example: [[1,2,3],[2,1,3],[3,2,1]]'}
                                />
                            )}
                        />
                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                    </Box>
                </Paper>
            </Modal>
            <Table border={2}>
                <TableHead>
                    
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Rows</TableCell>
                        <TableCell>Columns</TableCell>
                        <TableCell>Chest Types</TableCell>
                        <TableCell align="right">Min Fuel</TableCell>
                        <TableCell >Created At</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {treasures?.data?.items?.map((treasure) => (
                        <TableRow key={treasure.id}>
                            <TableCell>{treasure.id}</TableCell>
                            <TableCell>{treasure.rows}</TableCell>
                            <TableCell>{treasure.columns}</TableCell>
                            <TableCell>{treasure.chestTypes}</TableCell>
                            
                            <TableCell align="right">{treasure.minFuel}</TableCell>
                            <TableCell >{formatDateTimeVi(treasure.createdAt)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    
                </TableFooter>
            </Table>
            <TablePagination
                component="div"
                count={treasures?.data?.totalCount ?? 0}
                page={pagination.page - 1}
                onPageChange={(_, newPage) =>
                    setPagination((prev) => ({
                        ...prev,
                        page: newPage + 1,
                    }))
                }
                rowsPerPage={pagination.pageSize}
                onRowsPerPageChange={(e) =>
                    setPagination((prev) => ({
                        ...prev,
                        pageSize: parseInt(e.target.value, 10),
                        page: 1,
                    }))
                }
                rowsPerPageOptions={[5, 10, 25, 50]}
            />
        </TableContainer>
  );
};

export default TreasureList;