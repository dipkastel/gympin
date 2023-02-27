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

    public Error(ExceptionBase e) {
        this.Code = e.getErrorCode();
        this.errorMessage = ErrorMessageHelper.getMessage(e.getErrorType().toString(), ErrorMessageHelper.Language.fa);
        //if (AppConfig.IsDebugModel)
        this.stackTrace = Arrays.toString(e.getStackTrace());

    }


    public enum ErrorType {
        //account
        REGISTER_USER_EXIST(1001),
        CLIENT_AUTH_NOT_SETUP(1002),
        USER_NOT_FOUND(1003),
        ACTIVATION_CODE_EXPIRED(1004),
        ACTIVATION_CODE_MANY_REQUEST(1005),
        ACTIVATION_CODE_NOT_FOUND(1006),
        //user
        USER_RATE_OUT_OF_BOUND(1101),
        UNKNOWN_USER(1102),
        //event
        EVENT_USER_IS_OWNER(1201),
        PARTICIPANTS_COUNT_LIMIT_EXCEPTION(1202),
        EVENT_OR_USER_NOT_EXIST(1203),
        EVENT_NOT_FOUND(1204),
        EVENT_STARTED(1205),
        EVENT_USER_IS_NOT_OWNER(1206),
        ALREADY_PARTICIPANT_OF_EVENT(1207),
        PARTICIPANT_OF_ANOTHER_EVENT(1208),
        SPORT_OF_EVENT_NOT_FOUND(1209),
        //ticket
        TICKET_NOT_FOUND(1301),
        TICKET_EXPIRED(1302),
        TICKET_NOT_PAYED(1303),
        TICKET_CANCELED(1304),
        TICKET_IS_IN_PROCESS(1305),
        TICKET_USAGE_LIMIT(1306),
        ENTRY_ALREADY_EXIST(1307),
        TICKET_IS_NOT_ACTIVE(1308),
        USER_REQUEST_ENTER(1309),
        TICKET_OWNED_BY_OTHER_PLACE(1310),
        TICKET_GENDER_IS_NOT_COMPATIBLE(1310),
        //multimedia
        MULTIMEDIA_NOT_FOUND_EXCEPTION(1401),
        INVALID_FILE_NAME(1402),
        //transactions
        REQUEST_OVER_CREDIT_LIMIT(1501),
        REQUEST_UNDER_LIMIT(1502),
        UNKNOWN_TRANSACTION_TYPE(1503),
        UNKNOWN_PAYMENT_TYPE(1504),
        UNKNOWN_PAYMENT_BUYER(1505),
        UNSUPPORTED_TRANSACTION_TYPE(1506),
        TRANSACTION_NOT_FOUND(1507),
        TRANSACTION_ALREADY_CHECKED(1508),
        //general
        EXCEPTION(4001),
        OUT_SERVICE_EXCEPTION(4002),
        INPUT_NOT_VALID(4003),
        COULD_NOT_CREATE_DIRECTORY(4004),
        DUPLICATE_ENTRY_ADD_EXEPTION(4005)

        ;
        private final int value;

        ErrorType(int value) {
            this.value = value;
        }

        public int getValue() {
            return value;
        }

    }
}
