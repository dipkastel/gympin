package com.notrika.gympin.common.multimedia.param;

import com.notrika.gympin.common.util._base.param.BaseParam;
import com.notrika.gympin.common.multimedia.enums.MediaType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.springframework.web.multipart.MultipartFile;

@Data
@SuperBuilder
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class MultimediaStoreParam extends BaseParam<MultimediaStoreParam> {


    private MultipartFile File;

    private Long CategoryId;

    private MediaType MediaType;

    private String Title;

    private String Description;

    private Boolean IsDefault = false;

}
