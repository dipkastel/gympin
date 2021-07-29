package com.notrika.gympin.dao;

import com.notrika.gympin.common.util.StringsFa;
import lombok.Data;
//import lombok.Data;

import java.util.Arrays;

@Data
public class Error {

    String errorMessage;
    String stackTrace;
    int Code;


    public Error(ErrorType errorType){
        this.Code = errorType.getValue();
        this.errorMessage = StringsFa.getMessage(errorType.getValue());
    }
    public Error(ErrorType errorType,Exception e){
        this.Code = errorType.getValue();
        this.errorMessage = StringsFa.getMessage(errorType.getValue());
        //if (AppConfig.IsDebugModel)
         //   this.stackTrace = Arrays.toString(e.getStackTrace());

    }



    public enum ErrorType {
        REGISTER_USER_EXIST(1005),Exception(999);
        private final int value;
        private ErrorType(int value) {
            this.value = value;
        }
        public int getValue() {
            return value;
        }

    }
}
