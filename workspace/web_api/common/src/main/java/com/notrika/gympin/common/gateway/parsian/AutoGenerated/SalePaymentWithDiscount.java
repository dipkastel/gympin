//
// This file was generated by the Eclipse Implementation of JAXB, v2.3.7 
// See https://eclipse-ee4j.github.io/jaxb-ri 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2023.07.10 at 09:35:52 PM GMT+03:30 
//


package com.notrika.gympin.common.gateway.parsian.AutoGenerated;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
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
 *         &lt;element name="requestData" type="{https://pec.Shaparak.ir/NewIPGServices/Sale/SaleService}ClientSaleDiscountRequestData" minOccurs="0"/&gt;
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
@XmlRootElement(name = "SalePaymentWithDiscount")
public class SalePaymentWithDiscount {

    protected ClientSaleDiscountRequestData requestData;

    /**
     * Gets the value of the requestData property.
     * 
     * @return
     *     possible object is
     *     {@link ClientSaleDiscountRequestData }
     *     
     */
    public ClientSaleDiscountRequestData getRequestData() {
        return requestData;
    }

    /**
     * Sets the value of the requestData property.
     * 
     * @param value
     *     allowed object is
     *     {@link ClientSaleDiscountRequestData }
     *     
     */
    public void setRequestData(ClientSaleDiscountRequestData value) {
        this.requestData = value;
    }

}
