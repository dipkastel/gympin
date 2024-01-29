package com.notrika.gympin.common.user.user.enums;

public enum
RoleEnum {

    //corporate
    CORPORATE_MANAGER(10,"مدیر سازمان"),
    USER(9,"کاربر"),
    //place
    PLACE_PERSONNEL(8,"پرسنل مرکز"),
    PLACE_MANAGER(7,"مدیر مرکز"),
    //coach
    COACH(6,"مربی"),
    //gympin
    SUPER_ADMIN(5,"مدیر ارشد"),
    ADMIN(4,"مدیر سیستم"),
    MANAGER(3,"مدیر داخلی"),
    MARKET(2,"مارکتینگ"),
    CONTENT(1,"محتوا");

    private int level;
    private String name;

    RoleEnum(int level, String name) {
        this.level = level;
        this.name = name;
    }

    public int getLevel() {
        return level;
    }
    public String getName() {
        return name;
    }
}


