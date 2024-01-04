package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.user.relation.dto.FollowDto;
import com.notrika.gympin.persistence.entity.user.relation.UserFollowEntity;

public final class FollowConvertor {

    public static FollowDto followEntityToDto(UserFollowEntity entity){
        FollowDto dto=new FollowDto();
        dto.setId(entity.getId());
        dto.setRequesterUser(UserConvertor.toDtoComplete(entity.getRequesterUser()));
        dto.setRequestedUser(UserConvertor.toDtoComplete(entity.getRequestedUser()));
        dto.setStatus(entity.getStatus());
        return dto;
    }

}
