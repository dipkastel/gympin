import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Notice from "../../../partials/content/Notice";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import "leaflet/dist/leaflet.css";
import { user_getAll } from "../../../api/user.api";

const headCells = [
  {
    Id: "Id",
    disablePadding: false,
    label: "Id",
  },
  {
    Id: "Username",
    disablePadding: false,
    label: "نام کاربری",
  },
  {
    Id: "PhoneNumber",
    disablePadding: false,
    label: "تلفن",
  },
  {
    Id: "UserGroup",
    disablePadding: false,
    label: "گروه",
  },
  {
    Id: "UserStatus",
    disablePadding: false,
    label: "وضعیت",
  },
];

function UserManagementHead(props) {
  const { order, orderBy } = props;

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.Id}
            align="right"
            padding="normal"
            sortDirection={orderBy === headCell.Id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const UserManagement = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [itemCount, setItemCount] = useState(5);
  const [userList, setUserList] = useState([]);
  const [searchString, setSearchString] = useState("");
  const history = useHistory();

  useEffect(() => {
    user_getAll(page, rowsPerPage)
      .then((data) => {
        console.log(data.data.Data);
        setUserList(data.data.Data);
        setItemCount(33);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [page, rowsPerPage, searchString]);

  const handleClick = (event, id) => {
    history.push({
      pathname: "/usersDetails",
      state: id,
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onSearchChange = (event) => {
    setSearchString(event.target.value);
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - itemCount) : 0;

  return (
    <>
      <Notice icon="flaticon-warning kt-font-primary">مدیریت کاربران</Notice>

      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <Toolbar>
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              کاربران
            </Typography>
            <input
              type={"Text"}
              title="search"
              aria-label={"search"}
              value={searchString}
              onChange={onSearchChange}
            />
            <Tooltip title="Filter list">
              <IconButton>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <UserManagementHead rowCount={itemCount} />
              <TableBody>
                {userList.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.Id)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.Id.toString()}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="normal"
                        align="right"
                      >
                        {row.Id}
                      </TableCell>
                      <TableCell align="right">{row.Username}</TableCell>
                      <TableCell align="right">{row.PhoneNumber}</TableCell>
                      <TableCell align="right">{row.UserGroup}</TableCell>
                      <TableCell align="right">{row.UserStatus}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            sx={{ direction: "ltr" }}
            count={itemCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
};

export default UserManagement;
