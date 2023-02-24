import React, {useContext, useEffect, useState} from "react";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar,} from "../../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import {Button, TableCell} from "@mui/material";
import {Form, Modal, Table} from "react-bootstrap";
import {sport_getAllSport,} from "../../../../../network/api/sport.api";
import {placeSport_add, placeSport_delete, placeSport_getSportsByPlace} from "../../../../../network/api/placeSport.api";
import Select from "react-select";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";

const PlaceSports = ({place}) => {
    const error = useContext(ErrorContext);
  const [placeSports,setPlaceSports]=useState([])
  const [sports,setSports]=useState([])
  const [openModalAdd,setOpenModalAdd]=useState(false)
  const [itemToDelete,setItemToDelete]=useState(null)

  useEffect(() => {
    getSportPlace()
  }, []);

  function getSportPlace() {
    placeSport_getSportsByPlace({Id:place.Id})
        .then((data) => {
          setPlaceSports(data.data.Data)
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
  }

  useEffect(() => {
    sport_getAllSport()
        .then((data) => {
      setSports(data.data.Data)
    }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
  }, []);

  function renderModalDelete(){
    function deleteSport(){
      placeSport_delete({Id:itemToDelete.Id}).then(data=>{
          error.showError({message: "عملیات موفق",});
        setItemToDelete(null)
        getSportPlace()
      }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }
    return (
        <>
          <Modal show={itemToDelete} onHide={()=>setItemToDelete(null)}>
            <Modal.Header closeButton>
              <Modal.Title>delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>حذف {itemToDelete && itemToDelete.sport.Name}</Modal.Body>
            <Modal.Footer>
              <Button
                  className={"button_edit"}
                  onClick={()=>setItemToDelete(null)}
              >
                خیر
              </Button>
              <Button
                  className={"button_danger"}
                  onClick={(e) => deleteSport()}
              >
                حذف
              </Button>
            </Modal.Footer>
          </Modal>
        </>
    );
  };
  function renderModalAdd(){
    var selectedId = 0;
    function getSportsOptions(){
      return sports.map(o=>{return {label:o.Name,value:o.Id}})
    }
    function addPlace(){
      placeSport_add({place:{Id:place.Id},sport:{Id:selectedId}})
          .then(data=>{
              error.showError({message: "عملیات موفق",});
            selectedId=0;
            setOpenModalAdd(false)
            getSportPlace()
      }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }
    return (
        <>
          <Modal show={openModalAdd} onHide={()=>setOpenModalAdd(false)}>
            <Modal.Header closeButton>
              <Modal.Title>{"افزودن ورزش به مرکز ورزشی " +place.Name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <Form.Group controlId="formAddSport">
                <Form.Label>ورزش مورد نظر را انتخاب کنید</Form.Label>
                <Select
                    className={"dropdown"}
                    inputId="react-select-single"
                    name="formState"
                    options={getSportsOptions()}
                    onChange={(e)=>{selectedId = e.value}}
                />
              </Form.Group>

            </Modal.Body>
            <Modal.Footer>
              <Button
                  className={"button_edit"}
                  onClick={()=>setOpenModalAdd(false)}
              >
                خیر
              </Button>
              <Button
                  className={"button_danger"}
                  onClick={(e) => addPlace()}
              >
                اضافه
              </Button>
            </Modal.Footer>
          </Modal>
        </>
    );
  }
  return (

      <>
        <Portlet>
          <PortletHeader
              title="ورزش ها"
              toolbar={
                <PortletHeaderToolbar>
                  <button
                      type="button"
                      className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                      onClick={(e) =>setOpenModalAdd(true)}
                  >
                    <AddIcon />
                  </button>
                </PortletHeaderToolbar>
              }
          />

          <PortletBody>

            <Table className={"table"}>
              <TableHead>
                <TableRow>
                  <TableCell align="right">Id</TableCell>
                  <TableCell align="right">name</TableCell>
                  <TableCell align="left">action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {placeSports.map(row => (
                    <TableRow key={row.Id}>
                      <TableCell align="right" component="th" scope="row" >{row.Id}</TableCell>
                      <TableCell align="right">{row.sport.Name}</TableCell>
                      <TableCell align="left"><Button variant={"contained"} size={"small"} color={"error"} onClick={(e)=>setItemToDelete(row)}>حذف</Button> </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </PortletBody>
        </Portlet>
        {renderModalAdd()}
        {renderModalDelete()}
      </>
  );
};

export default PlaceSports;
