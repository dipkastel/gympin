package com.notrika.gympin.common.accounting.account.enums;

public enum AccountTopic {

    CASH("11"),PREPAYMENT("14"),OPERATING_INCOME("61"),PISH_DARYAFT("32");

    private String code;

    AccountTopic(String s) {
        this.code=s;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
