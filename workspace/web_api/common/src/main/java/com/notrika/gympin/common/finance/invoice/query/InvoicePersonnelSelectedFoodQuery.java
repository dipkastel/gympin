package com.notrika.gympin.common.finance.invoice.query;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.finance.invoice.enums.InvoiceStatus;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.sql.Date;


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
public class InvoicePersonnelSelectedFoodQuery extends BaseQuery<InvoicePersonnelSelectedFoodQuery> {


    @JsonProperty("PersonnelId")
    private Long is_personnelæid;

    @JsonProperty("CorporateId")
    private Long is_corporateæid;

    @JsonProperty("Ordered")
    private Boolean is_ordered;

    @JsonProperty("Date")
    private Date is_date;
}
