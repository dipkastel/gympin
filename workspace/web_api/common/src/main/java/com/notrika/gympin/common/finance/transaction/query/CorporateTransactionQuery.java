package com.notrika.gympin.common.finance.transaction.query;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.corporate.corporate.enums.CorporateStatusEnum;
import com.notrika.gympin.common.finance.invoice.enums.InvoiceStatus;
import com.notrika.gympin.common.finance.transaction.enums.TransactionCorporateType;
import com.notrika.gympin.common.finance.transaction.enums.TransactionStatus;
import com.notrika.gympin.common.finance.transaction.enums.TransactionType;
import com.notrika.gympin.common.purchased.purchasedSubscribe.enums.SubscribePurchasedStatus;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.Date;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
    /*
    use this query name below for name of field to specify query type for query engine
    after query name use (_) to separate query name and db Field name
    don't use underline (_) for db field name
    "ismin" : equal or greater than
    "ismax" : equal or less than
    "is"    : equal
    "min"   : greater than
    "max"   : less than
    "slike" : start like
    "elike" : end like
    "like"  : like
    eg :
    private String like_name
    private Long min_id
    private Long max_id
    */
public class CorporateTransactionQuery extends BaseQuery<CorporateTransactionQuery> {


    @JsonProperty("Status")
    private TransactionStatus is_transactionStatus;

    @JsonProperty("Type")
    private TransactionCorporateType is_transactionCorporateType;

    @JsonProperty("CorporatePersonnelId")
    private Long is_corporatePersonnelæid;

    @JsonProperty("CorporatePersonnelUserId")
    private Long is_corporatePersonnelæuseræid;

    @JsonProperty("FinanceCorporateId")
    private Long is_financeCorporateæid;

    @JsonProperty("Serial")
    private String like_serialæserial;

    @JsonProperty("InvoiceStatus")
    private InvoiceStatus is_serialæinvoicesæstatus;

    @JsonProperty("MaxPrice")
    private BigDecimal ismax_amount;

    @JsonProperty("ToDate")
    private Date max_createdDate;

    @JsonProperty("FromDate")
    private Date min_createdDate;


}
