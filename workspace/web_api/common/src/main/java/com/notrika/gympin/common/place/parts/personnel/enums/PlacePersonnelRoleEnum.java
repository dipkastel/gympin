package com.notrika.gympin.common.place.parts.personnel.enums;

public enum
PlacePersonnelRoleEnum {
    PLACE_PERSONNEL("پرسنل"),
    PLACE_OWNER("مدیر"),
    PLACE_COACH("مربی"),
    PLACE_COUNSELOR("مشاور");

    private String name;

    PlacePersonnelRoleEnum(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}


