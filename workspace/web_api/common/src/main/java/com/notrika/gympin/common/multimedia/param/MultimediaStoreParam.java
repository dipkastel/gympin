package com.notrika.gympin.common.multimedia.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseParam;
import com.notrika.gympin.common.multimedia.enums.MediaType;
import com.notrika.gympin.common.user.param.UserParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.web.multipart.MultipartFile;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class MultimediaStoreParam extends BaseParam<MultimediaStoreParam> {

    @JsonProperty("file")
    private MultipartFile multipartFile;

    //category
    @JsonProperty("Category")
    private MultimediaCategoryParam categoryParam;

    @JsonProperty("MediaType")
    private MediaType mediaType;

    @JsonProperty("Title")
    private String title;

    @JsonProperty("Description")
    private String description;

}
