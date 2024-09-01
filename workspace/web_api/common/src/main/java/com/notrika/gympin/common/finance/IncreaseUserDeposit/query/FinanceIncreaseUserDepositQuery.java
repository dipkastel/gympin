package com.notrika.gympin.common.finance.IncreaseUserDeposit.query;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.finance.IncreaseUserDeposit.enums.DepositStatus;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

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
public class FinanceIncreaseUserDepositQuery extends BaseQuery<FinanceIncreaseUserDepositQuery> {


    @JsonProperty("UserId")
    private Long is_useræid;

    @JsonProperty("DepositStatus")
    private DepositStatus is_depositStatus;

    @JsonProperty("Serial")
    private String like_serialæserial;

}
