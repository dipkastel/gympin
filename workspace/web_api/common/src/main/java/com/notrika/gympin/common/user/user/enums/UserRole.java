package com.notrika.gympin.common.user.user.enums;

public enum
UserRole {
    CORPORATE_MANAGER(11,"مدیر سازمان"),
    PLACE_PERSONNEL(10,"کارمند مرکز"),
    PLACE_MANAGER(9,"مدیر مرکز"),
    COACH(8,"مربی"),
    SUPER_ADMIN(7,"مدیر ارشد"),
    ADMIN(6,"مدیر سیستم"),
    MANAGER(3,"مدیر داخلی"),
    MARKET(5,"مارکتینگ"),
    CONTENT(4,"محتوا"),
    ATHLETE(1,"ورزشکار حرفه ای"),
    USER(0,"کاربر");

    private int level;
    private String name;

    UserRole(int level,String name) {
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


