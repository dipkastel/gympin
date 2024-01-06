//
// This file was generated by the Eclipse Implementation of JAXB, v2.3.7 
// See https://eclipse-ee4j.github.io/jaxb-ri 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2024.01.04 at 07:55:24 PM GMT+03:30 
//


package com.notrika.gympin.common.finance.gateway.AutoGenerated;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ClientSaleDiscountRequestData complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ClientSaleDiscountRequestData"&gt;
 *   &lt;complexContent&gt;
 *     &lt;extension base="{https://pec.Shaparak.ir/NewIPGServices/Sale/SaleService}ClientSaleRequestData"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="DiscountProduct" type="{https://pec.Shaparak.ir/NewIPGServices/Sale/SaleService}ArrayOfProduct" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/extension&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ClientSaleDiscountRequestData", propOrder = {
    "discountProduct"
})
public class ClientSaleDiscountRequestData
    extends ClientSaleRequestData
{

    @XmlElement(name = "DiscountProduct")
    protected ArrayOfProduct discountProduct;

    /**
     * Gets the value of the discountProduct property.
     * 
     * @return
     *     possible object is
     *     {@link ArrayOfProduct }
     *     
     */
    public ArrayOfProduct getDiscountProduct() {
        return discountProduct;
    }

    /**
     * Sets the value of the discountProduct property.
     * 
     * @param value
     *     allowed object is
     *     {@link ArrayOfProduct }
     *     
     */
    public void setDiscountProduct(ArrayOfProduct value) {
        this.discountProduct = value;
    }

}
