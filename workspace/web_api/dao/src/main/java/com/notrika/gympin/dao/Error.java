package com.notrika.gympin.dao;

import com.notrika.gympin.common.util.ErrorMessageHelper;
import lombok.Data;

//import lombok.Data;

@Data
public class Error {

    String errorMessage;
    String stackTrace;
    int Code;


    public Error(ErrorType errorType){
        this.Code = errorType.getValue();
        this.errorMessage = ErrorMessageHelper.getMessage(errorType.toString(),ErrorMessageHelper.Language.fa);
    }
    public Error(ErrorType errorType,Exception e){
        this.Code = errorType.getValue();
        this.errorMessage = ErrorMessageHelper.getMessage(errorType.toString(),ErrorMessageHelper.Language.fa);
        //if (AppConfig.IsDebugModel)
         //   this.stackTrace = Arrays.toString(e.getStackTrace());

    }



    public enum ErrorType {
        REGISTER_USER_EXIST(1005),Exception(999), Client_Auth_Not_Setup (12046) ;
        private final int value;
        private ErrorType(int value) {
            this.value = value;
        }
        public int getValue() {
            return value;
        }

    }
}
