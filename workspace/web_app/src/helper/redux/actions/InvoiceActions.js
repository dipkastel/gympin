
export const invoiceActionTypes = {
    SetInvoices: "[invoice] invoice lists",
    SetUserBasket: "[invoice] user basket"
};

export const invoiceActions = {
    SetInvoices: (invoices) => ({ type: invoiceActionTypes.SetInvoices, payload: { invoices } }),
    SetUserBasket: (invoices) => ({ type: invoiceActionTypes.SetUserBasket, payload: { invoices } }),
};
