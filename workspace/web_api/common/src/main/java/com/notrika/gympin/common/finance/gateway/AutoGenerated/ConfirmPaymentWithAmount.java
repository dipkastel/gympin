//
// This file was generated by the Eclipse Implementation of JAXB, v2.3.7 
// See https://eclipse-ee4j.github.io/jaxb-ri 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2025.04.03 at 08:43:49 PM IRDT 
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
 *         &lt;element name="requestData" type="{https://pec.Shaparak.ir/NewIPGServices/Confirm/ConfirmService}ClientConfirmWithAmountRequestData" minOccurs="0"/&gt;
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
    "requestData"
})
@XmlRootElement(name = "ConfirmPaymentWithAmount", namespace = "https://pec.Shaparak.ir/NewIPGServices/Confirm/ConfirmService")
public class ConfirmPaymentWithAmount {

    @XmlElement(namespace = "https://pec.Shaparak.ir/NewIPGServices/Confirm/ConfirmService")
    protected ClientConfirmWithAmountRequestData requestData;

    /**
     * Gets the value of the requestData property.
     * 
     * @return
     *     possible object is
     *     {@link ClientConfirmWithAmountRequestData }
     *     
     */
    public ClientConfirmWithAmountRequestData getRequestData() {
        return requestData;
    }

    /**
     * Sets the value of the requestData property.
     * 
     * @param value
     *     allowed object is
     *     {@link ClientConfirmWithAmountRequestData }
     *     
     */
    public void setRequestData(ClientConfirmWithAmountRequestData value) {
        this.requestData = value;
    }

}
