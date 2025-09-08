package com.notrika.gympin.persistence.entity.management.service;

import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserEnterRequestDto {

    private UserEntity user;
    private Long count;
    private Long personnelId;

    public UserEnterRequestDto(UserEntity user, Long count, Long personnelId) {
        this.user = user;
        this.count = count;
        this.personnelId = personnelId;
    }
}
