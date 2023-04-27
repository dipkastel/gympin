import React, {useContext, useEffect, useState} from 'react';
import {connect, useSelector} from "react-redux";
import {UserCredit_getByUser} from "../../../network/api/userCredit.api";
import {useNavigate, useParams} from "react-router-dom";
import _TicketDetail from "../_TicketDetail";
import {ticket_checkout, ticket_getById} from "../../../network/api/tickets.api";
import _invoiceHowToPay, {CalculatePay} from "./_invoiceHowToPay";
import _invoiceAgrements from "./_invoiceAgrements";
import {Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {sagaActions} from "../../../helper/redux/actions/SagaActions";
import {toPriceWithComma} from "../../../helper/utils";

const Invoice = (props) => {

    const navigate = useNavigate()
    const {ticketId} = useParams();
    const error = useContext(ErrorContext);
    const currentUser = useSelector(state => state.auth.user);
    const [userCredit, setUserCredit] = useState(null)
    const [creditSortToPay, setCreditSortToPay] = useState([])
    const [creditSortToPayTemp, setCreditSortToPayTemp] = useState([])
    const [openModalConfirm, setOpenModalConfirm] = useState(false)
    const [allAgrementChecked, setAllAgrementChecked] = useState(false)

    const [ticket, setTicket] = useState(null)

    function getTicket() {
        ticket_getById({id: ticketId}).then(result => {
            setTicket(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    useEffect(() => {
        getTicket();
    }, [currentUser]);

    useEffect(() => {
        getUserCredit();
    }, [ticket]);

    useEffect(() => {
        if(!userCredit) return;
        setCreditSortToPayTemp(userCredit.CreditDetails.map((c, num) => {
            return {priority: num, credit: c,payment:0}
        }))
    }, [userCredit]);

    useEffect(() => {
        if(!userCredit) return;
        setCreditSortToPay(creditSortToPayTemp.map((c, num) => {
            return {priority: c.priority, credit: c.credit,payment:CalculatePay(ticket,creditSortToPayTemp,c)}
        }))
    }, [creditSortToPayTemp]);


    function getUserCredit() {
        if (currentUser) {
            UserCredit_getByUser({Id: currentUser.Id}).then(result => {
                setUserCredit(result.data.Data);
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }
    }

    function getCorporateNameFromPersonnelId(personnelId) {
        if(!personnelId) return 'کیف پول';
        if (!userCredit) return  '';
        var credit =  userCredit.CreditDetails.filter(c=>c.PersonnelId==personnelId)[0];
        return credit.Corporate.Name;
    }

    function openModalConfirmToPay() {
        if(!allAgrementChecked){
            error.showError({
                clickable: false,
                message: 'همه قوانین و مقررات باید خوانده و پذیرفته شود',
            });
            return;
        }
        if (ticket.Price>userCredit.TotalCredit){
            error.showError({
                clickable: false,
                message: 'متاسفانه هزینه بلیط پوشش داده نشده',
            });
            return;
        }
        setOpenModalConfirm(true)
    }

    function renderModalConfirm() {
        function onConfirm(){
            if(!allAgrementChecked){
                error.showError({
                    clickable: false,
                    message: 'همه قوانین و مقررات باید خوانده و پذیرفته شود',
                });
                return;
            }
            if (ticket.Price>userCredit.TotalCredit){
                error.showError({
                    clickable: false,
                    message: 'متاسفانه هزینه بلیط پوشش داده نشده',
                });
                return;
            }
            ticket_checkout(getData()).then(result=>{
                props.RequestUser(currentUser)
                navigate("/tickets", {replace: false});
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }

        function getData(){
            if(!ticket) return {Checkout:[]};
            var data = {
                Ticket:{Id:ticket.Id},
                Price:ticket.Price,
                Checkout:[]
            }
            creditSortToPay.map(item=>{

                data.Checkout.push({
                    CreditType:item.credit.CreditType,
                    personnelId:item.credit.PersonnelId,
                    Priority:item.priority,
                    Amount:item.payment,
                })
            })
            return data;
        }

        return (<Dialog
            className={"w-100"}
            open={openModalConfirm} onClose={() => setOpenModalConfirm(false)}>
            <DialogTitle>{"آیا از خرید بلیط اطمینان دارید"}</DialogTitle>
            <DialogContent className={"w-100"}>
                {getData().Checkout.map((checkoutItem,nu)=>(
                    <div key={nu}>
                        {!(!checkoutItem.Amount)&&<Typography variant={"subtitle1"} component={'p'} color={"info"}>{` پرداخت از ${getCorporateNameFromPersonnelId(checkoutItem.personnelId)} ، ${toPriceWithComma(checkoutItem.Amount)} تومان `}</Typography>}
                    </div>

                ))}
            </DialogContent>
            <DialogActions>
                <Button sx={{m: 1}} variant={"contained"} color={"success"}
                        onClick={() => onConfirm()}>تایید خرید</Button>
                <Button sx={{m: 1}} variant={"contained"} color={"error"} onClick={() => setOpenModalConfirm(false)}> لغو </Button>
            </DialogActions>
        </Dialog>);
    }

    return (
        <div>
            {ticket && <_TicketDetail ticket={ticket}/>}
            {creditSortToPay && <_invoiceHowToPay credits={userCredit} ticket={ticket} creditSortToPay={creditSortToPay}
                                             setCreditSortToPay={setCreditSortToPay}/>}
            {ticket && <_invoiceAgrements plan={ticket.Plan} setAllAgrementChecked={setAllAgrementChecked}/>}
            {ticket && userCredit &&
            <Card elevation={3} sx={{margin: 1}}>
                <Button fullWidth variant={"contained"} color={"primary"} onClick={() => openModalConfirmToPay()}>خرید
                    بلیط</Button>
            </Card>
            }
            {renderModalConfirm()}
        </div>
    );
};

export default connect(null, sagaActions)(Invoice);
