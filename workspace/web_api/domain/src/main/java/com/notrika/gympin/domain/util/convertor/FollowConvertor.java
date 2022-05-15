package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.relation.dto.FollowDto;
import com.notrika.gympin.persistence.entity.user.relation.FollowEntity;

public final class FollowConvertor {

    public static FollowDto followEntityToDto(FollowEntity entity){
        FollowDto dto=new FollowDto();
        dto.setId(entity.getId());
        dto.setRequesterUser(UserConvertor.userToUserDtoComplete(entity.getRequesterUser()));
        dto.setRequestedUser(UserConvertor.userToUserDtoComplete(entity.getRequestedUser()));
        dto.setStatus(entity.getStatus());
        return dto;
    }

}
