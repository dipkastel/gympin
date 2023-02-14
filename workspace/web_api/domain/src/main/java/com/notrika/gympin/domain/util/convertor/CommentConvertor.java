package com.notrika.gympin.domain.util.convertor;

import com.notrika.gympin.common.comment.gate.dto.CommentGateDto;
import com.notrika.gympin.common.comment.gate.param.CommentGateParam;
import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.context.GympinContextHolder;
import com.notrika.gympin.domain.gate.GateServiceImpl;
import com.notrika.gympin.persistence.entity.comment.CommentGateEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;

public final class CommentConvertor {

    public static CommentGateEntity convertToCommentGateEntity(CommentGateParam param){
        CommentGateEntity commentGateEntity=new CommentGateEntity();
        commentGateEntity.setGate(GympinContext.getBean(GateServiceImpl.class).getEntityById(param.getGate().getId()));
        commentGateEntity.setComment(param.getComment());
        commentGateEntity.setUser((UserEntity) GympinContextHolder.getContext().getEntry().get(GympinContext.USER_KEY));
        return commentGateEntity;
    }

    public static CommentGateDto convertToCommentGateDto(CommentGateEntity entity){
        CommentGateDto commentGateDto=new CommentGateDto();
        commentGateDto.setGate(GateConvertor.convertToDto(entity.getGate()));
        commentGateDto.setUser(UserConvertor.toDtoBrief(entity.getUser()));
        commentGateDto.setComment(entity.getComment());
        commentGateDto.setCreatedDate(entity.getCreatedDate());
        commentGateDto.setUpdatedDate(entity.getUpdatedDate());
        return commentGateDto;
    }

}
