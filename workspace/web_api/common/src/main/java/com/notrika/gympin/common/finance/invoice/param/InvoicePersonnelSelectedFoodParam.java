package com.notrika.gympin.common.finance.invoice.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.param.BaseParam;
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
public class InvoicePersonnelSelectedFoodParam extends BaseParam<InvoicePersonnelSelectedFoodParam> {

    @JsonProperty("PersonnelId")
    private Long personnelId;

    @JsonProperty("FoodMenuId")
    private Long foodMenuId;

    @JsonProperty("Count")
    private Short count;

    @JsonProperty("Ordered")
    private Boolean ordered;

    @JsonProperty("CorporateId")
    private Long corporate;

    @JsonProperty("Price")
    private BigDecimal price;

    @JsonProperty("FullName")
    private String fullName;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("Date")
    private Date date;

}
