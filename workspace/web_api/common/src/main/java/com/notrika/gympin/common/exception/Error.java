package com.notrika.gympin.common.exception;

import com.notrika.gympin.common.util.ErrorMessageHelper;
import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.util.Arrays;

@Data
@SuperBuilder
public class Error {

    String errorMessage;
    String stackTrace;
    int Code;


    public Error(ErrorType errorType) {
        this.Code = errorType.getValue();
        this.errorMessage = ErrorMessageHelper.getMessage(errorType.toString(), ErrorMessageHelper.Language.fa);
    }

    public Error(ErrorType errorType, Exception e) {
        this.Code = errorType.getValue();
        this.errorMessage = ErrorMessageHelper.getMessage(errorType.toString(), ErrorMessageHelper.Language.fa);
        //if (AppConfig.IsDebugModel)
        this.stackTrace = Arrays.toString(e.getStackTrace());

    }


    public enum ErrorType {
        REGISTER_USER_EXIST(1005),
        EXCEPTION(999),
        CLIENT_AUTH_NOT_SETUP(12046),
        USER_NOT_FOUND(1001),
        ACTIVATION_CODE_EXPIRED(2001),
        ACTIVATION_CODE_MANY_REQUEST(2002),
        OUT_SERVICE_EXCEPTION(3001);
        private final int value;

        ErrorType(int value) {
            this.value = value;
        }

        public int getValue() {
            return value;
        }

    }
}
