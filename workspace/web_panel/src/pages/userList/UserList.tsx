import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function UserList() {
  const [data, setData] = useState(userRows);

  const handleDelete = (id:number) => {
    setData(data.filter((item) => item.id !== id));
  };
  
  const columns = [
    { field: "id", headerName: "ID", width: 100 ,
      renderCell: (params:any) => {
        return (
            <div>
              {params.row.id}
            </div>
        );
      } },
    {
      field: "user",
      headerName: "User",
      width: 150,
      renderCell: (params:any) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 ,
    renderCell: (params:any) => {
    return (
        <div>
          {params.row.email}
        </div>
    );
  }},
    {
      field: "status",
      headerName: "Status",
      width: 120,
    renderCell: (params:any) => {
    return (
        <div>
          {params.row.status}
        </div>
    );
  }
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 190,
      renderCell: (params:any) => {
        return (
            <div>
              {params.row.transaction}
            </div>
        );
      }

    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params:any) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={12}
        checkboxSelection
      />
    </div>
  );
}
