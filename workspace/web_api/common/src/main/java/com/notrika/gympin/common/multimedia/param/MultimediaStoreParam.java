package com.notrika.gympin.common.multimedia.param;

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
    private List<MultipartFile> multipartFile;
    private String partName;
    private UserParam user;
    private MediaType mediaType;

}
