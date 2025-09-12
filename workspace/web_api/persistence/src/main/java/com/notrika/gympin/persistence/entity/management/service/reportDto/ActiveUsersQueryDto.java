package com.notrika.gympin.persistence.entity.management.service.reportDto;

import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ActiveUsersQueryDto {

    private String userName;
    private UserEntity user;
    private Long personnelId;
    private Long activityCount;

    public ActiveUsersQueryDto(String userName, UserEntity user, Long personnelId, Long activityCount) {
        this.userName = userName;
        this.user = user;
        this.personnelId = personnelId;
        this.activityCount = activityCount;
    }
}
