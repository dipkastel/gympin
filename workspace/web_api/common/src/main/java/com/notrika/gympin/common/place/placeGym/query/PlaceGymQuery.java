package com.notrika.gympin.common.place.placeGym.query;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.place.placeBase.enums.PlaceStatusEnum;
import com.notrika.gympin.common.user.user.enums.Gender;
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
public class PlaceGymQuery extends BaseQuery<PlaceGymQuery> {

    @JsonProperty("Name")
    private String like_name;

    @JsonProperty("SearchStr")
    private String like_searchStr;

    @JsonProperty("Status")
    private PlaceStatusEnum is_status;

    @JsonProperty("Sports")
    private Long is_placeSportæsportæid;

    @JsonProperty("Option")
    private Long is_optionsOfPlacesæplaceOptionæid;

    @JsonProperty("LocationId")
    private Long is_locationæid;

    @JsonProperty("ParentLocationId")
    private Long is_locationæparentæid;

    @JsonProperty("ParentParentLocationId")
    private Long is_locationæparentæparentæid;

    @JsonProperty("Gender")
    private Gender is_buyablesægender;

    @JsonProperty("HasContract")
    private Boolean is_hasContract;

    @JsonProperty("MAXlatitude")
    private Double max_latitude;

    @JsonProperty("MINlatitude")
    private Double min_latitude;

    @JsonProperty("MAXlongitude")
    private Double max_longitude;

    @JsonProperty("MINlongitude")
    private Double min_longitude;

}
