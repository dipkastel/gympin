package com.notrika.gympin.common._base.base;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.notrika.gympin.common.exception.Error;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@JsonSerialize
public class ResponseModel<T> implements Serializable {

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
    private T data;

    public ResponseModel(/*@Nullable*/ T _data) {
        this.data = _data;
        this.Success = true;
        this.MessageType = SUCCESS;
    }

    public ResponseModel(/*@Nullable*/ T _data, String _LinkParams) {
        this.data = _data;
        this.Success = true;
        this.MessageType = SUCCESS;
        this.LinkParams = _LinkParams;
    }

    public ResponseModel(Error _data) {
        this.Success = false;
        this.MessageType = ERROR;
        this.Message = _data.getErrorMessage();
        this.Error = _data;
    }
}
