import React, {useContext, useEffect, useState} from "react";
import Notice from "../../../partials/content/Notice";
import {Button, TableCell, TextField} from "@mui/material";
import {multimediacategory_add, multimediacategory_getAll} from "../../../../network/api/mediaCategories.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {corporate_add} from "../../../../network/api/corporate.api";
import {Form, Modal} from "react-bootstrap";


const MediaCategoryManagement = () => {
    const error = useContext(ErrorContext);
    const [categories, setCategories] = useState(null);
    const [openModalAdd, setOpenModalAdd] = useState(false)

    useEffect(() => {
        getAllCategories();
    }, []);

    function renderModalAdd() {
        function addCategory(e) {
            e.preventDefault()
            setOpenModalAdd(false);
      multimediacategory_add({
          Name: e.target.name.value,
          ARW:e.target.arw.value,
          ARH:e.target.arh.value,
          MINW:e.target.minw.value,
          MINH:e.target.minh.value,
          MAXW:e.target.maxw.value,
          MAXH:e.target.maxh.value
      })
        .then(result=>{
            error.showError({message: "عملیات موفق",});
            getAllCategories()
        })
          .catch(e => {
            try {
              error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
          });
        }

        return (
            <>
                <Modal show={openModalAdd} onHide={() => setOpenModalAdd(false)}>
                    <Form
                        noValidate
                        autoComplete="off"
                        onSubmit={(e) => addCategory(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن دسته بندی "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form.Group>
                                <TextField
                                    name="name"
                                    type={"text"}
                                    label={"نام دسته بندی"}
                                    placeholder="نام دسته بندی"
                                    variant={"outlined"}
                                    fullWidth
                                />
                            </Form.Group>
                            <Form.Group >
                                <TextField
                                    name="arw"
                                    type={"number"}
                                    placeholder="نسبت عرض"
                                    label={"نسبت عرض"}
                                    variant={"outlined"}
                                    fullWidth
                                />
                            </Form.Group>
                            <Form.Group >
                                <TextField
                                    name="arh"
                                    type={"number"}
                                    placeholder="نسبت طول"
                                    label={"نسبت طول"}
                                    variant={"outlined"}
                                    fullWidth
                                />
                            </Form.Group>
                            <Form.Group >
                                <TextField
                                    name="minw"
                                    type={"number"}
                                    placeholder="حداقل عرض"
                                    label={"حداقل عرض"}
                                    variant={"outlined"}
                                    fullWidth
                                />
                            </Form.Group>
                            <Form.Group >
                                <TextField
                                    name="minh"
                                    type={"number"}
                                    placeholder="حداقل طول"
                                    label={"حداقل طول"}
                                    variant={"outlined"}
                                    fullWidth
                                />
                            </Form.Group>
                            <Form.Group >
                                <TextField
                                    name="maxw"
                                    type={"number"}
                                    placeholder="حداکثر عرض"
                                    label={"حداکثر عرض"}
                                    variant={"outlined"}
                                    fullWidth
                                />
                            </Form.Group>
                            <Form.Group >
                                <TextField
                                    name="maxh"
                                    type={"number"}
                                    placeholder="حداکثر طول"
                                    label={"حداکثر طول"}
                                    variant={"outlined"}
                                    fullWidth
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setOpenModalAdd(false)}
                            >
                                خیر
                            </Button>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                            >
                                اضافه
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }

    function getAllCategories() {
        multimediacategory_getAll()
            .then((data) => {
                setCategories(data.data.Data);
            })
            .catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }

    return (
        <div>
            <Notice icon="flaticon-warning kt-font-primary">
                <p>دسته بندی های مدیا </p>
            </Notice>


            <Portlet>
                <PortletHeader
                    title="دسته بندی ها"
                    toolbar={
                        <PortletHeaderToolbar>
                            <button
                                type="button"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                onClick={(e) => setOpenModalAdd(true)}
                            >
                                <AddIcon/>
                            </button>
                        </PortletHeaderToolbar>
                    }
                />

                <PortletBody>

                    <Table className={"table"}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Id</TableCell>
                                <TableCell align="right">نام</TableCell>
                                <TableCell align="right">نسبت عرض</TableCell>
                                <TableCell align="right">نسبت طول</TableCell>
                                <TableCell align="right">حداقل عرض</TableCell>
                                <TableCell align="right">حداقل طول</TableCell>
                                <TableCell align="right">حداکثر عرض</TableCell>
                                <TableCell align="right">حداکثر طول</TableCell>
                                <TableCell align="left">action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories && categories.map(row => (
                                <TableRow key={row.Id}>
                                    <TableCell align="right" component="th" scope="row">{row.Id}</TableCell>
                                    <TableCell align="right">{row.Name}</TableCell>
                                    <TableCell align="right">{row.ARW || "نامشخص"}</TableCell>
                                    <TableCell align="right">{row.ARH || "نامشخص"}</TableCell>
                                    <TableCell align="right">{row.MINW || "نامشخص"}</TableCell>
                                    <TableCell align="right">{row.MINH || "نامشخص"}</TableCell>
                                    <TableCell align="right">{row.MAXW || "نامشخص"}</TableCell>
                                    <TableCell align="right">{row.MAXH || "نامشخص"}</TableCell>
                                    <TableCell align="left"><Button variant={"contained"} size={"small"}
                                                                    color={"error"} onClick={()=>{error.showError({message: "این قابلیت فعلا در دسترس نیست",})}}>حذف</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </PortletBody>
            </Portlet>
            {renderModalAdd()}
        </div>
    );
};

export default MediaCategoryManagement;


//
// class MediaCategoryManagement extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       addMode: false,
//       categories: [],
//       selectedcatToDelete: null,
//       selectedcatToEdit: null,
//     };
//   }
//
//   componentDidMount() {
//     this.getAllCategories();
//   }
//
//
//   toggleAddMode(e) {
//     e.preventDefault();
//     this.setState(() => ({
//       addMode: !this.state.addMode,
//       selectedcatToEdit: null,
//     }));
//   }
//
//   openAddMode(e) {
//     e.preventDefault();
//     this.setState(() => ({
//       addMode: true,
//     }));
//   }
//   closeAddMode(e) {
//     e.preventDefault();
//     this.setState(() => ({
//       addMode: false,
//     }));
//   }
//   addMediaCat(e) {
//     e.preventDefault();
//     var that = this;
//     if (this.state.selectedcatToEdit) {
//       multimediacategory_update({
//         Id: this.state.selectedcatToEdit.Id,
//         Name: e.target.category_name.value,
//       })
//         .then(function (data) {
//           useContext(ErrorContext).showError({message: "عملیات موفق",});
//           that.getAllCategories();
//           that.toggleAddMode(e);
//         })
//           .catch(e => {
//             try {
//               useContext(ErrorContext).showError({message: e.response.data.Message,});
//             } catch (f) {
//               useContext(ErrorContext).showError({message: "خطا نا مشخص",});
//             }
//           });
//     } else {
//     }
//   }
//
//   prepareEditUser = (e, data) => {
//     this.openAddMode(e);
//     e.preventDefault();
//     this.setState(
//       () => ({
//         selectedcatToEdit: data,
//       }),
//       () => {
//         document.querySelector("#form_catName").value = data.Name;
//       }
//     );
//   };
//
//   openModalDelete = (e, data) => {
//     e.preventDefault();
//     this.setState(() => ({
//       selectedcatToDelete: data,
//     }));
//   };
//
//   closeModalDelete = () => {
//     this.setState(() => ({
//       selectedcatToDelete: null,
//     }));
//   };
//   renderModalDelete = (catToDelete) => {
//     return (
//       <>
//         <Modal show={catToDelete} onHide={this.closeModalDelete}>
//           <Modal.Header closeButton>
//             <Modal.Title>delete</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>حذف {catToDelete && catToDelete.Name}</Modal.Body>
//           <Modal.Footer>
//             <Button
//               variant="primary"
//               className="pr-4"
//               onClick={this.closeModalDelete}
//             >
//               خیر
//             </Button>
//             <Button
//               variant="danger"
//               className="pr-4"
//               onClick={(e) => this.deleteCategory(e, catToDelete)}
//             >
//               حذف
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </>
//     );
//   };
//
//   deleteCategory(e, catToDelete) {
//     e.preventDefault();
//     multimediacategory_delete(catToDelete)
//       .then((data) => {
//         useContext(ErrorContext).showError({message: "عملیات موفق",});
//         this.getAllCategories();
//         this.closeModalDelete();
//       })
//       .catch(e => {
//                     try {
//                       useContext(ErrorContext).showError({message: e.response.data.Message,});
//                     } catch (f) {
//                       useContext(ErrorContext).showError({message: "خطا نا مشخص",});
//                     }
//                 });
//   }
//   render() {
//     return (
//       <>
//         <Notice icon="flaticon-warning kt-font-primary">
//           <p>مدیریت دسته بندی های رسانه</p>
//         </Notice>
//
//         {this.state.addMode && (
//           <Portlet>
//             <PortletHeader title="افزودن دسته بندی رسانه ها" />
//             <PortletBody>
//               <form onSubmit={(e) => this.addMediaCat(e)}>
//                 <Form.Group controlId="form_catName">
//                   <Form.Label>category name</Form.Label>
//                   <Form.Control
//                     name="category_name"
//                     type="text"
//                     placeholder="category name"
//                   />
//                 </Form.Group>
//
//                 <Form.Group>
//                   <button className="btn btn-primary">ثبت</button>
//                 </Form.Group>
//               </form>
//             </PortletBody>
//           </Portlet>
//         )}
//         <Portlet>
//           <PortletHeader
//             title="دسته بندی های رسانه"
//             toolbar={
//               <PortletHeaderToolbar>
//                 <button
//                   type="button"
//                   className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
//                   onClick={(e) => this.toggleAddMode(e)}
//                 >
//                   <AddIcon />
//                 </button>
//               </PortletHeaderToolbar>
//             }
//           />
//
//           <PortletBody>
//             <Table striped bordered hover>
//               <thead>
//                 <tr>
//                   <th>name</th>
//                   <th>actions</th>
//                 </tr>
//               </thead>
//               <tbody>{this.state.categories.map(this.RenderRaw)}</tbody>
//             </Table>
//           </PortletBody>
//         </Portlet>
//
//         {this.renderModalDelete(this.state.selectedcatToDelete)}
//       </>
//     );
//   }
// }
//
// export default MediaCategoryManagement;
