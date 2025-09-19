import React, {useState} from 'react';
import {useGetTreasureHook} from "./treasure.hook.ts";
import {formatDateTimeVi, type Pagination} from "./extensions.ts";
import {Table, TableBody, TablePagination, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter} from "@mui/material";

const TreasureList: React.FC = () => {
    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        pageSize: 10,
    })
  const { data: treasures, isLoading, error } = useGetTreasureHook(pagination);

  if (isLoading) return <div>Loading treasures...</div>;
  if (error) return <div>Error loading treasures.</div>;

  return (
        <TableContainer component={Paper} className={"p-20"}>
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