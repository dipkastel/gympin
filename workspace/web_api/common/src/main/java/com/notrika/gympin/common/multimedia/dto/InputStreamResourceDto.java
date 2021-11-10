package com.notrika.gympin.common.multimedia.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.core.io.InputStreamResource;

import java.io.InputStream;

@JsonSerialize
public class InputStreamResourceDto extends InputStreamResource {
    public InputStreamResourceDto(InputStream inputStream) {
        super(inputStream);
    }

    public InputStreamResourceDto(InputStream inputStream, String description) {
        super(inputStream, description);
    }
}
