package com.notrika.gympin.common.user.enums;

public enum UserRole {
    SUPER_ADMIN(7), ADMIN(6), MARKET(5), CONTENT(4), MANAGER(3), COACH(2), ATHLETE(1), USER(0);

    private int level;

    UserRole(int level) {
        this.level = level;
    }

    public int getLevel() {
        return level;
    }
}


