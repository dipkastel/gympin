//
// This file was generated by the Eclipse Implementation of JAXB, v2.3.7 
// See https://eclipse-ee4j.github.io/jaxb-ri 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2023.07.10 at 08:47:35 PM GMT+03:30 
//


package com.notrika.gympin.common.gateway.parsian.AutoGenerated;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ClientPaymentRequestDataBase complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ClientPaymentRequestDataBase"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="LoginAccount" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="Amount" type="{http://www.w3.org/2001/XMLSchema}long"/&gt;
 *         &lt;element name="OrderId" type="{http://www.w3.org/2001/XMLSchema}long"/&gt;
 *         &lt;element name="CallBackUrl" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="AdditionalData" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="Originator" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ClientPaymentRequestDataBase", propOrder = {
    "loginAccount",
    "amount",
    "orderId",
    "callBackUrl",
    "additionalData",
    "originator"
})
@XmlSeeAlso({
    ClientSaleRequestData.class
})
public class ClientPaymentRequestDataBase {

    @XmlElement(name = "LoginAccount")
    protected String loginAccount;
    @XmlElement(name = "Amount")
    protected long amount;
    @XmlElement(name = "OrderId")
    protected long orderId;
    @XmlElement(name = "CallBackUrl")
    protected String callBackUrl;
    @XmlElement(name = "AdditionalData")
    protected String additionalData;
    @XmlElement(name = "Originator")
    protected String originator;

    /**
     * Gets the value of the loginAccount property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLoginAccount() {
        return loginAccount;
    }

    /**
     * Sets the value of the loginAccount property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLoginAccount(String value) {
        this.loginAccount = value;
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
     * Gets the value of the callBackUrl property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCallBackUrl() {
        return callBackUrl;
    }

    /**
     * Sets the value of the callBackUrl property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCallBackUrl(String value) {
        this.callBackUrl = value;
    }

    /**
     * Gets the value of the additionalData property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAdditionalData() {
        return additionalData;
    }

    /**
     * Sets the value of the additionalData property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAdditionalData(String value) {
        this.additionalData = value;
    }

    /**
     * Gets the value of the originator property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOriginator() {
        return originator;
    }

    /**
     * Sets the value of the originator property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOriginator(String value) {
        this.originator = value;
    }

}
