package com.notrika.gympin.common.place.personnel.enums;

public enum
PlacePersonnelRoleEnum {
    PLACE_PERSONNEL("پرسنل"),
    PLACE_OWNER("مدیر"),
    PLACE_COACH("مربی");

    private String name;

    PlacePersonnelRoleEnum(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}


