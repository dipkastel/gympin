//
// This file was generated by the Eclipse Implementation of JAXB, v2.3.7 
// See https://eclipse-ee4j.github.io/jaxb-ri 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2023.07.10 at 11:00:25 AM GMT+03:30 
//


package com.notrika.gympin.common.gateway.parsian.AutoGenerated;

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
 *         &lt;element name="SalePaymentWithDiscountResult" type="{https://pec.Shaparak.ir/NewIPGServices/Sale/SaleService}ClientSaleResponseData" minOccurs="0"/&gt;
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
    "salePaymentWithDiscountResult"
})
@XmlRootElement(name = "SalePaymentWithDiscountResponse")
public class SalePaymentWithDiscountResponse {

    @XmlElement(name = "SalePaymentWithDiscountResult")
    protected ClientSaleResponseData salePaymentWithDiscountResult;

    /**
     * Gets the value of the salePaymentWithDiscountResult property.
     * 
     * @return
     *     possible object is
     *     {@link ClientSaleResponseData }
     *     
     */
    public ClientSaleResponseData getSalePaymentWithDiscountResult() {
        return salePaymentWithDiscountResult;
    }

    /**
     * Sets the value of the salePaymentWithDiscountResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link ClientSaleResponseData }
     *     
     */
    public void setSalePaymentWithDiscountResult(ClientSaleResponseData value) {
        this.salePaymentWithDiscountResult = value;
    }

}
