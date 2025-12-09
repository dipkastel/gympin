package com.notrika.gympin.common.corporate.corporatePersonnel.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.corporate.corporatePersonnel.enums.CorporatePersonnelRoleEnum;
import com.notrika.gympin.common.user.user.enums.Gender;
import com.notrika.gympin.common.util._base.param.BaseParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class CorporatePersonnelListItem extends BaseParam<CorporatePersonnelListItem> {

    @JsonProperty("Corporate")
    private CorporateParam corporate;

    @JsonProperty("PhoneNumber")
    private String phoneNumber;

    @JsonProperty("FullName")
    private String fullName;

    @JsonProperty("GroupId")
    private Long groupId;

    @JsonProperty("Gender")
    private Gender gender;

    @JsonProperty("NationalCode")
    private String nationalCode;

    @JsonProperty("BirthDay")
    private Date birthDay;

    @JsonProperty("LocationId")
    private Long locationId;

    @JsonProperty("SendSms")
    private Boolean sendSms;

}
