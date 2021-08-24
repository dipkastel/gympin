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

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class MultimediaStoreParam extends BaseParam<MultimediaStoreParam> {

    @JsonProperty("MultipartFile")
    private List<MultipartFile> multipartFile;

    @JsonProperty("PartName")
    private String partName;

    @JsonProperty("User")
    private UserParam userParam;

    @JsonProperty("MediaType")
    private MediaType mediaType;

}
