package com.notrika.gympin.common.user.user.query;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.user.user.enums.RoleEnum;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import lombok.*;
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
public class UserQuery extends BaseQuery<UserQuery> {


    @JsonProperty("Username")
    private String like_username;

    @JsonProperty("PhoneNumber")
    private String like_phoneNumber;

    @JsonProperty("FullName")
    private String like_fullName;

    @JsonProperty("Email")
    private String like_email;

    @JsonProperty("Role")
    private RoleEnum is_userRolesærole;

    @JsonProperty("Sport")
    private Long is_sportæid;

}
