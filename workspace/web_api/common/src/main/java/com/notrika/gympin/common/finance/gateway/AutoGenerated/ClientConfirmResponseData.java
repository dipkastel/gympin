//
// This file was generated by the Eclipse Implementation of JAXB, v2.3.7 
// See https://eclipse-ee4j.github.io/jaxb-ri 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2025.02.02 at 10:58:46 AM IRST 
//


package com.notrika.gympin.common.finance.gateway.AutoGenerated;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ClientConfirmResponseData complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ClientConfirmResponseData"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="Status" type="{http://www.w3.org/2001/XMLSchema}short"/&gt;
 *         &lt;element name="CardNumberMasked" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="RRN" type="{http://www.w3.org/2001/XMLSchema}long"/&gt;
 *         &lt;element name="Token" type="{http://www.w3.org/2001/XMLSchema}long"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ClientConfirmResponseData", namespace = "https://pec.Shaparak.ir/NewIPGServices/Confirm/ConfirmService", propOrder = {
    "status",
    "cardNumberMasked",
    "rrn",
    "token"
})
@XmlSeeAlso({
    ClientConfirmResponseDataAddData.class
})
public class ClientConfirmResponseData {

    @XmlElement(name = "Status")
    protected short status;
    @XmlElement(name = "CardNumberMasked")
    protected String cardNumberMasked;
    @XmlElement(name = "RRN")
    protected long rrn;
    @XmlElement(name = "Token")
    protected long token;

    /**
     * Gets the value of the status property.
     * 
     */
    public short getStatus() {
        return status;
    }

    /**
     * Sets the value of the status property.
     * 
     */
    public void setStatus(short value) {
        this.status = value;
    }

    /**
     * Gets the value of the cardNumberMasked property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCardNumberMasked() {
        return cardNumberMasked;
    }

    /**
     * Sets the value of the cardNumberMasked property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCardNumberMasked(String value) {
        this.cardNumberMasked = value;
    }

    /**
     * Gets the value of the rrn property.
     * 
     */
    public long getRRN() {
        return rrn;
    }

    /**
     * Sets the value of the rrn property.
     * 
     */
    public void setRRN(long value) {
        this.rrn = value;
    }

    /**
     * Gets the value of the token property.
     * 
     */
    public long getToken() {
        return token;
    }

    /**
     * Sets the value of the token property.
     * 
     */
    public void setToken(long value) {
        this.token = value;
    }

}
