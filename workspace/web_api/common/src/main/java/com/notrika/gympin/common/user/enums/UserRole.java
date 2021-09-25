package com.notrika.gympin.common.user.enums;

public enum UserRole {
    CONTENT(4), MARKET(5), ADMIN(6), SUPERADMIN(7),USER(0), MANAGER(3), ATHLETE(1), COACH(2);

    private int level;

    UserRole(int level) {
        this.level=level;
    }

    public int getLevel() {
        return level;
    }
}


