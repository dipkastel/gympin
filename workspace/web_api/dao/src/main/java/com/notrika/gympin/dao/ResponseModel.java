package com.notrika.gympin.dao;

//import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.Nullable;

import java.util.Date;

public class ResponseModel<T> {

    public static final int SUCCESS = 0;
    public static final int ERROR = -1;

    @JsonProperty("Success")
    public boolean Success;
    @JsonProperty("MessageType")
    public int MessageType ;
    @JsonProperty("Message")
    public String Message = "" ;
    @JsonProperty("ResultDate")
    public Date ResultDate =new Date() ;
    @JsonProperty("LinkParams")
    public String LinkParams ;
    @JsonProperty("Error")
    public Error Error ;
    @JsonProperty("Data")
    private T data;

    public ResponseModel(@Nullable T _data) {
        this.data = _data;
        this.Success = true;
        this.MessageType = SUCCESS;
    }
    public ResponseModel(@Nullable T _data,String _LinkParams) {
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
