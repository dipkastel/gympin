package com.notrika.gympin.common.place.place.query;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.place.place.enums.PlaceStatusEnum;
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
public class PlaceQuery extends BaseQuery<PlaceQuery> {

    @JsonProperty("Name")
    private String like_name;

    @JsonProperty("Status")
    private PlaceStatusEnum is_status;

    @JsonProperty("deleted")
    private Boolean is_deleted = false;

}
