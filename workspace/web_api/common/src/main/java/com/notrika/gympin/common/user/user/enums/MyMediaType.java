package com.notrika.gympin.common.user.user.enums;

import org.springframework.http.MediaType;
import org.springframework.util.MimeType;

import java.nio.charset.Charset;
import java.util.Map;

public class MyMediaType extends MediaType {


    public static final String VIDEO_MP4_VALUE = "video/mp4";

    public static final String AUDIO_MP3_VALUE = "audio/mp3";

    public MyMediaType(String type) {
        super(type);
    }

    public MyMediaType(String type, String subtype) {
        super(type, subtype);
    }

    public MyMediaType(String type, String subtype, Charset charset) {
        super(type, subtype, charset);
    }

    public MyMediaType(String type, String subtype, double qualityValue) {
        super(type, subtype, qualityValue);
    }

    public MyMediaType(MediaType other, Charset charset) {
        super(other, charset);
    }

    public MyMediaType(MediaType other, Map<String, String> parameters) {
        super(other, parameters);
    }

    public MyMediaType(String type, String subtype, Map<String, String> parameters) {
        super(type, subtype, parameters);
    }

    public MyMediaType(MimeType mimeType) {
        super(mimeType);
    }
}
