//
// This file was generated by the Eclipse Implementation of JAXB, v2.3.7 
// See https://eclipse-ee4j.github.io/jaxb-ri 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2024.01.29 at 05:36:40 PM GMT+03:30 
//


package com.notrika.gympin.common.finance.gateway.AutoGenerated;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ClientConfirmWithAmountRequestData complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ClientConfirmWithAmountRequestData"&gt;
 *   &lt;complexContent&gt;
 *     &lt;extension base="{https://pec.Shaparak.ir/NewIPGServices/Confirm/ConfirmService}ClientConfirmRequestData"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="OrderId" type="{http://www.w3.org/2001/XMLSchema}long"/&gt;
 *         &lt;element name="Amount" type="{http://www.w3.org/2001/XMLSchema}long"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/extension&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ClientConfirmWithAmountRequestData", namespace = "https://pec.Shaparak.ir/NewIPGServices/Confirm/ConfirmService", propOrder = {
    "orderId",
    "amount"
})
public class ClientConfirmWithAmountRequestData
    extends ClientConfirmRequestData
{

    @XmlElement(name = "OrderId")
    protected long orderId;
    @XmlElement(name = "Amount")
    protected long amount;

    /**
     * Gets the value of the orderId property.
     * 
     */
    public long getOrderId() {
        return orderId;
    }

    /**
     * Sets the value of the orderId property.
     * 
     */
    public void setOrderId(long value) {
        this.orderId = value;
    }

    /**
     * Gets the value of the amount property.
     * 
     */
    public long getAmount() {
        return amount;
    }

    /**
     * Sets the value of the amount property.
     * 
     */
    public void setAmount(long value) {
        this.amount = value;
    }

}
