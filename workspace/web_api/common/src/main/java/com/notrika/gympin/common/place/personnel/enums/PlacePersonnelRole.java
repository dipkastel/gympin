package com.notrika.gympin.common.place.personnel.enums;

public enum
PlacePersonnelRole {
    PLACE_PERSONNEL("پرسنل مرکز"),
    PLACE_OWNER("مدیر مرکز"),
    Place_COACH("مربی");

    private String name;

    PlacePersonnelRole(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}


