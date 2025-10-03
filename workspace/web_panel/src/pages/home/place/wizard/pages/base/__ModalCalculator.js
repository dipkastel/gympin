import React, {useContext, useEffect, useState} from 'react';
import {optionOfPlace_add, optionOfPlace_delete, optionOfPlace_getByPlaceId} from "../../../../../../network/api/optionOfPlace.api";
import {Modal} from "react-bootstrap";
import {Button, Chip, Divider} from "@mui/material";
import {Rating} from "@mui/lab";
import StarIcon from "@mui/icons-material/Star";
import {placeOption_getAll} from "../../../../../../network/api/placeOptions.api";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";

const __ModalCalculator = ({inPlace,setInPlace,openModalCalculator,setOpenModalCalculator,setCommision}) => {

    const error = useContext(ErrorContext);

    const [allOptions,setAllOptions] = useState([]);
    const [placeOptions,setPlaceOptions] = useState([]);
    const [appearance,setAppearance] = useState(0);
    const [cleanliness,setCleanliness] = useState(0);
    const [qality,setQuality] = useState(0);
    const [traffic,setTraffic] = useState(0);
    const [Prices,setPrices] = useState(0);

    useEffect(() => {
        getOptionOfPlace();
        getAllOptions();
    }, []);
    function getAllOptions(){
        placeOption_getAll({size:100}).then(data => {
            setAllOptions(data.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function getOptionOfPlace(){
        optionOfPlace_getByPlaceId({Id:inPlace.Id}).then(data=>{
            setPlaceOptions(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function addOptionToPlace(e,option){
        e.preventDefault()
        optionOfPlace_add({Place:{Id:inPlace.Id},PlaceOption:{Id:option.Id}})
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

    function DeleteItem(e,itemToDelete) {
        e.preventDefault()
        optionOfPlace_delete({id:itemToDelete.Id})
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

    function CalculateCommisionFee(e) {
        e.preventDefault();
        var commision = 40;
        commision = commision-(placeOptions.length*1.5);
        commision = commision-appearance*0.5;
        commision = commision-cleanliness*0.3;
        commision = commision-qality*0.4;
        commision = commision+traffic*0.4;
        commision = commision-Prices*0.5;
        setOpenModalCalculator(false);
        setCommision(Math.round(commision));

    }

    return (<>
        <Modal show={openModalCalculator} onHide={() => setOpenModalCalculator(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{"محاسبه درصد"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={"row"}>
                    {placeOptions.map(option=>(
                        <Chip label={option.PlaceOption.Name} key={"placeOption"+option.PlaceOption.Id} sx={{m:1}} color={"success"} onClick={(e)=>DeleteItem(e,option)} />
                    ))}
                    {allOptions.filter(op=>!placeOptions.map(po=>po.PlaceOption.Id).includes(op.Id)).map(option=>(
                        <Chip label={option.Name} key={"option"+option.Id} sx={{m:1}} onClick={(e)=>{addOptionToPlace(e,option)}} />
                    ))}
                </div>
                <Divider variant="inset" sx={{marginX: 0,marginY:2}} component="p"/>
                <div className={"row ml-1"}>
                    وضعیت ظاهری مرکز :
                    <Rating
                        name="hover-feedback"
                        size={"large"}
                        value={appearance}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setAppearance(newValue);
                        }}
                        // onChangeActive={(event, newHover) => {
                        //     setHover(newHover);
                        // }}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                </div>
                <Divider variant="inset" sx={{marginX: 0,marginY:2}} component="p"/>
                <div className={"row ml-1"}>
                    وضعیت شلوغی مرکز :
                    <Rating
                        name="hover-feedback"
                        size={"large"}
                        value={traffic}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setTraffic(newValue);
                        }}
                        // onChangeActive={(event, newHover) => {
                        //     setHover(newHover);
                        // }}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                </div>
                <Divider variant="inset" sx={{marginX: 0,marginY:2}} component="p"/>
                <div className={"row ml-1"}>
                    وضعیت نظافت مرکز :
                    <Rating
                        name="hover-feedback"
                        size={"large"}
                        value={cleanliness}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setCleanliness(newValue);
                        }}
                        // onChangeActive={(event, newHover) => {
                        //     setHover(newHover);
                        // }}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                </div>
                <Divider variant="inset" sx={{marginX: 0,marginY:2}} component="p"/>
                <div className={"row ml-1"}>
                    کیفیت امکانات مرکز :
                    <Rating
                        name="hover-feedback"
                        size={"large"}
                        value={qality}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setQuality(newValue);
                        }}
                        // onChangeActive={(event, newHover) => {
                        //     setHover(newHover);
                        // }}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                </div>

                <Divider variant="inset" sx={{marginX: 0,marginY:2}} component="p"/>
                <div className={"row ml-1"}>
                    ارزش قیمت به خدمات :
                    <Rating
                        name="hover-feedback"
                        size={"large"}
                        value={Prices}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setPrices(newValue);
                        }}
                        // onChangeActive={(event, newHover) => {
                        //     setHover(newHover);
                        // }}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button
                    className={"button_edit"}
                    onClick={() => setOpenModalCalculator(false)}
                >
                    لغو
                </Button>
                <Button
                    className={"button_danger"}
                    onClick={(e)=>CalculateCommisionFee(e)}
                >
                    محاسبه
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
};

export default __ModalCalculator;
