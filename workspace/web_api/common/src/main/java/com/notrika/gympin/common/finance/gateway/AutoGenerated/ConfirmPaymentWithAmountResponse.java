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
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="ConfirmPaymentWithAmountResult" type="{https://pec.Shaparak.ir/NewIPGServices/Confirm/ConfirmService}ClientConfirmResponseData" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "confirmPaymentWithAmountResult"
})
@XmlRootElement(name = "ConfirmPaymentWithAmountResponse", namespace = "https://pec.Shaparak.ir/NewIPGServices/Confirm/ConfirmService")
public class ConfirmPaymentWithAmountResponse {

    @XmlElement(name = "ConfirmPaymentWithAmountResult", namespace = "https://pec.Shaparak.ir/NewIPGServices/Confirm/ConfirmService")
    protected ClientConfirmResponseData confirmPaymentWithAmountResult;

    /**
     * Gets the value of the confirmPaymentWithAmountResult property.
     * 
     * @return
     *     possible object is
     *     {@link ClientConfirmResponseData }
     *     
     */
    public ClientConfirmResponseData getConfirmPaymentWithAmountResult() {
        return confirmPaymentWithAmountResult;
    }

    /**
     * Sets the value of the confirmPaymentWithAmountResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link ClientConfirmResponseData }
     *     
     */
    public void setConfirmPaymentWithAmountResult(ClientConfirmResponseData value) {
        this.confirmPaymentWithAmountResult = value;
    }

}
