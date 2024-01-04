package com.notrika.gympin.common.multimedia.param;

import com.notrika.gympin.common.multimedia.enums.MediaType;
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
public class MultimediaRetrieveParam extends MultimediaStoreParam {

    private String fileName;

    private String fileUrl;

    private Integer height;

    private Integer width;

    private boolean ratio;

    private MediaType mediaType;

}
