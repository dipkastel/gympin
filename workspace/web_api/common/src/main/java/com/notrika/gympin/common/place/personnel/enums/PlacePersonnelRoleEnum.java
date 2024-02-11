package com.notrika.gympin.common.place.personnel.enums;

public enum
PlacePersonnelRoleEnum {
    PLACE_PERSONNEL("پرسنل مرکز"),
    PLACE_OWNER("مدیر مرکز"),
    PLACE_COACH("مربی");

    private String name;

    PlacePersonnelRoleEnum(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}


