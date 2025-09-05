package com.notrika.gympin.common.multimedia.query;

import com.fasterxml.jackson.annotation.JsonProperty;
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
public class MultimediaQuery extends BaseQuery<MultimediaQuery> {

    @JsonProperty("FileName")
    private String like_fileName;

    @JsonProperty("MediaType")
    private String like_mediaType;

    @JsonProperty("DocumentFormat")
    private String like_documentFormat;

    @JsonProperty("Title")
    private String like_title;

    @JsonProperty("Description")
    private String like_description;

    @JsonProperty("CategoryId")
    private Long is_categoryæid;

    @JsonProperty("PlaceId")
    private Long is_placesæid;

}
