package com.notrika.gympin.common.util.exception;

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
        try{
        this.Code = e.getErrorType().value;
        }catch (Exception ex){
            this.Code = -100;
        }
        if(e instanceof BadRequestRunTimeMessage){
            this.errorMessage =e.getErrorMessage();
        }else {
            this.errorMessage = ErrorMessageHelper.getMessage(e.getErrorType().toString(), ErrorMessageHelper.Language.fa);
        }
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
        INVITE_CODE_NOT_VALID(1007),
        //user
        USER_RATE_OUT_OF_BOUND(1101),
        UNKNOWN_USER(1102),
        LOW_DEPOSIT_EXCEPTION(1103),
        USER_HAS_OPEN_SETTLEMENT_REQUEST(1104),
        //purchased
        PURCHASED_NOT_FOUND(1301),
        PURCHASED_EXPIRED(1302),
        NOT_PAYED(1303),
        PURCHASED_CANCELED(1304),
        IS_IN_PROCESS(1305),
        USAGE_LIMIT(1306),
        ENTRY_ALREADY_EXIST(1307),
        IS_NOT_ACTIVE(1308),
        USER_REQUEST_ENTER(1309),
        OWNED_BY_OTHER_PLACE(1310),
        GENDER_IS_NOT_COMPATIBLE(1310),
        IS_ALREADY_PAYED(1311),
        PRICE_CONFLICT(1312),
        PRICE_TOTAL_CONFLICT(1313),
        PAY_BY_OTHERS(1314),
        FIRST_ENTRY_REQUEST_EXCEPTION(1315),
        QR_CODE_NOT_EXIST(1316),
        //multimedia
        MULTIMEDIA_NOT_FOUND_EXCEPTION(1401),
        INVALID_FILE_NAME(1402),
        FILE_DIMENSIONS_CANNOT_BE_ZIRO(1403),
        UNSUPPORTED_IMAGE_TYPE(1404),
        MEDIA_TYPE_NOT_FOUND(1405),
        IMAGE_READ_ERROR(1406),
        IMAGE_SAVE_ERROR(1407),
        //transactions
        REQUEST_OVER_CREDIT_LIMIT(1501),
        REQUEST_UNDER_LIMIT(1502),
        UNKNOWN_TRANSACTION_TYPE(1503),
        UNKNOWN_PAYMENT_TYPE(1504),
        UNKNOWN_PAYMENT_BUYER(1505),
        UNSUPPORTED_TRANSACTION_TYPE(1506),
        TRANSACTION_NOT_FOUND(1507),
        TRANSACTION_ALREADY_CHECKED(1508),
        GATEWAY_IS_NOT_AVALABLE(1509),
        //ticket
        UNCOMFORTABLE_VALUE_EXEPTION(1601),
        TICKET_CAPACITY_CANNOT_BE_NULL_OR_ZIRO(1602),
        TICKET_NAME_CANNOT_BE_NULL(1603),
        TICKET_EXPIRE_DATE_CANNOT_BE_NULL(1604),
        TICKET_EXPIRE_DURATION_CANNOT_BE_NULL(1605),
        TICKET_EXPIRE_TYPE_CANNOT_BE_NULL(1606),
        TICKET_DISCOUNT_CANNOT_BE_NULL(1607),
        TICKET_ENTRY_COUNT_CANNOT_BE_NULL_OR_ZIRO(1608),
        TICKET_GENDER_CANNOT_BE_NULL(1609),
        TICKET_PRICE_CANNOT_BE_NULL(1610),
        TICKET_SPORTS_CANNOT_BE_NULL(1611),
        TICKET_HALLS_CANNOT_BE_NULL(1612),
        TICKET_HAS_NOT_OWNER(1613),
        //place
        PLACE_NAME_CAN_NOT_BE_NULL(1701),
        PLACE_OWNERS_CAN_NOT_BE_EMPTY(1702),
        PLACE_LOCATION_MUST_SELECT_ON_MAP(1703),
        PLACE_LOCATION_CAN_NOT_BENULL(1704),
        PLACE_ADRESS_CAN_NOT_BE_NULL(1705),
        PLACE_COMMISSION_IS_NOT_CORRECT(1706),
        PLACE_HALL_MUST_BE_ADDED(1707),
        PLACE_TICKET_SUBSCRIBE_CAN_NOT_BE_EMPTY(1708),
        PLACE_IMAGES_IS_EMPTY(1709),
        PLACE_OPTIONS_IS_EMPTY(1710),
        PLACE_IS_DELETED(1711),
        //corporate
        LOW_CREDIT_EXCEPTION(1801),
        //general
        BAD_REQUEST_RUN_TIME_MESSAGE(4000),
        EXCEPTION(4001),
        OUT_SERVICE_EXCEPTION(4002),
        INPUT_NOT_VALID(4003),
        COULD_NOT_CREATE_DIRECTORY(4004),
        DUPLICATE_ENTRY_ADD_EXEPTION(4005),
        NOT_FOUND_EXEPTION(4006),
        SEND_SMS_EXCEPTION(4007),
        USER_NOT_ALLOWED(4008)

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