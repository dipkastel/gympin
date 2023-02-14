package com.notrika.gympin.common.user.enums;

public enum
UserRole {
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


