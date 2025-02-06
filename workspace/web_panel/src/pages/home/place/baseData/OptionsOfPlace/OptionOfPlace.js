import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Button, Chip, Collapse, Paper, TableCell} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import {placeOption_getAll} from "../../../../../network/api/placeOptions.api";
import {
    optionOfPlace_add,
    optionOfPlace_delete,
    optionOfPlace_getByPlaceId
} from "../../../../../network/api/optionOfPlace.api";
import {Form, Modal} from "react-bootstrap";
import Select from "react-select";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";

const OptionOfPlace = ({place}) => {
    const error = useContext(ErrorContext);
  const [placeOptions,SetPlaceOptions] = useState([])
  const [allOptions,SetAllOptions] = useState([])
  const [openBoxAdd,setOpenBoxAdd] = useState(false)
  const [itemToDelete,setItemToDelete] = useState(null)
  useEffect(() => {
      getOptionOfPlace();
  }, []);

  function getAllOptions(){

      placeOption_getAll({size:100})
          .then(data=>{
              SetAllOptions(data.data.Data);
          }).catch(e => {
          try {
              error.showError({message: e.response.data.Message,});
          } catch (f) {
              error.showError({message: "خطا نا مشخص",});
          }
      });
  }
  function getOptionOfPlace(){
      optionOfPlace_getByPlaceId({Id:place.Id}).then(data=>{
          SetPlaceOptions(data.data.Data);
          getAllOptions();
      }).catch(e => {
          try {
              error.showError({message: e.response.data.Message,});
          } catch (f) {
              error.showError({message: "خطا نا مشخص",});
          }
      });
  }

    function addOption(selectedId) {
        SetAllOptions([]);
        optionOfPlace_add({Place:{Id:place.Id},PlaceOption:{Id:selectedId}})
            .then(data=>{
                error.showError({message: "عملیات موفق",});
                getOptionOfPlace()
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function renderModalDelete() {

        function DeleteItem(e) {
            e.preventDefault()
            optionOfPlace_delete({id:itemToDelete.Id})
                .then(data=>{
                    error.showError({message: "عملیات موفق",});
                    setItemToDelete(null)
                    getOptionOfPlace()
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
                <Modal show={itemToDelete} onHide={() => setItemToDelete(null)}>
                    <form onSubmit={(e)=>DeleteItem(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"حذف امکانات "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemToDelete&&"حذف "+itemToDelete.PlaceOption.Name}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setItemToDelete(null)}
                            >
                                خیر
                            </Button>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                            >
                                حذف
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </>
        );
    }

    return (
        <>
          <Portlet>
            <PortletHeader
                title="امکانات"
                toolbar={
                  <PortletHeaderToolbar>
                    <button
                        type="button"
                        className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                        onClick={(e) =>setOpenBoxAdd(!openBoxAdd)}
                    >
                      <AddIcon />
                    </button>
                  </PortletHeaderToolbar>
                }
            />

            <PortletBody>

                <Collapse in={openBoxAdd} timeout="auto" unmountOnExit>

                    <Paper variant="outlined"  sx={{margin:1}} >
                        {allOptions.filter(op=>!placeOptions.map(po=>po.PlaceOption.Id).includes(op.Id)).map(row => (

                            <Chip key={"p-"+row.Id} onClick={(e)=>addOption(row.Id)} sx={{m:1}} label={row.Name} color={"error"} />
                        ))}
                    </Paper>
                </Collapse>

                <Table className={"table"}>
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Id</TableCell>
                    <TableCell align="right">name</TableCell>
                    <TableCell align="left">action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {placeOptions.map(row => (
                      <TableRow key={row.Id}>
                        <TableCell align="right" component="th" scope="row" >{row.Id}</TableCell>
                        <TableCell align="right">{row.PlaceOption.Name}</TableCell>
                          <TableCell align="left"><Button variant={"contained"} size={"small"} color={"error"} onClick={(e)=>setItemToDelete(row)}>حذف</Button> </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </PortletBody>
          </Portlet>
            {renderModalDelete()}
        </>
    );
};

export default OptionOfPlace;
