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
 * <p>Java class for ClientConfirmResponseDataAddData complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ClientConfirmResponseDataAddData"&gt;
 *   &lt;complexContent&gt;
 *     &lt;extension base="{https://pec.Shaparak.ir/NewIPGServices/Confirm/ConfirmService}ClientConfirmResponseData"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="AddData" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/extension&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ClientConfirmResponseDataAddData", namespace = "https://pec.Shaparak.ir/NewIPGServices/Confirm/ConfirmService", propOrder = {
    "addData"
})
public class ClientConfirmResponseDataAddData
    extends ClientConfirmResponseData
{

    @XmlElement(name = "AddData")
    protected String addData;

    /**
     * Gets the value of the addData property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAddData() {
        return addData;
    }

    /**
     * Sets the value of the addData property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAddData(String value) {
        this.addData = value;
    }

}
