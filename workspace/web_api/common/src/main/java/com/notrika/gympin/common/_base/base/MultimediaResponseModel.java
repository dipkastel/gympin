package com.notrika.gympin.common._base.base;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.Setter;
import org.springframework.core.io.InputStreamResource;

import java.io.InputStream;
import java.util.Date;

@Getter
@Setter
@JsonSerialize
public class MultimediaResponseModel extends InputStreamResource {
    public static final int SUCCESS = 0;
    public static final int ERROR = -1;
    @JsonProperty("Success")
    private boolean Success;
    @JsonProperty("MessageType")
    private int MessageType;
    @JsonProperty("Message")
    private String Message = "";
    @JsonProperty("ResultDate")
    private Date ResultDate = new Date();
    @JsonProperty("LinkParams")
    private String LinkParams;
    @JsonProperty("Error")
    private com.notrika.gympin.common.exception.Error Error;
    @JsonProperty("Data")
    private InputStreamResource data;

    private InputStream inputStream;
    private boolean readed = false;
    private InputStream stream;

    public MultimediaResponseModel(InputStream inputStream) {
        super(inputStream);
        this.inputStream = inputStream;
        this.data = this;
        this.Success = true;
        this.MessageType = SUCCESS;
    }

    public MultimediaResponseModel(InputStream inputStream, String description) {
        super(inputStream, description);
        this.inputStream = inputStream;
        this.data = this;
        this.Success = true;
        this.MessageType = SUCCESS;
    }

    public MultimediaResponseModel(/*@Nullable*/ InputStream inputStream, String description, String _LinkParams) {
        super(inputStream, description);
        this.inputStream = inputStream;
        this.data = this;
        this.Success = true;
        this.MessageType = SUCCESS;
        this.LinkParams = _LinkParams;
    }
    //    @Override
    //    public InputStream getInputStream() throws IOException, IllegalStateException {
    //        SerializationUtils.clone(this.inputStream);
    //        this.stream=Object this.inputStream.clone();
    //        return this.stream;
    //    }

    //    public MultimediaResponseModel(Error _data) {
    //        super(null);
    //        this.Success = false;
    //        this.MessageType = ERROR;
    //        this.Message = _data.getErrorMessage();
    //        this.Error = _data;
    //    }
}
