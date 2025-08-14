package com.notrika.gympin.domain.place.rateAndComment;

import com.notrika.gympin.common.place.placeBase.dto.PlaceCommentDto;
import com.notrika.gympin.common.place.placeBase.enums.PlaceCommentStatusEnum;
import com.notrika.gympin.common.place.placeBase.param.PlaceCommentParam;
import com.notrika.gympin.common.place.placeBase.query.PlaceCommentQuery;
import com.notrika.gympin.common.place.placeBase.service.PlaceCommentService;
import com.notrika.gympin.common.util.exception.user.UnknownUserException;
import com.notrika.gympin.common.util.exception.user.UserAlreadyCommentThisPlaceException;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.PlaceRateAndCommentConvertor;
import com.notrika.gympin.persistence.dao.repository.place.PlaceCommentRepository;
import com.notrika.gympin.persistence.dao.repository.place.PlaceRepository;
import com.notrika.gympin.persistence.dao.repository.user.UserRepository;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.rateAndComment.PlaceCommentEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlaceCommentServiceImpl extends AbstractBaseService<PlaceCommentParam, PlaceCommentDto, PlaceCommentQuery, PlaceCommentEntity> implements PlaceCommentService {

    @Autowired
    PlaceCommentRepository placeCommentRepository;

    @Autowired
    PlaceRepository placeRepository;

    @Autowired
    UserRepository userRepository;


    @Override
    public PlaceCommentDto add(@NonNull PlaceCommentParam param) {
        if (param.getUserId() == null)
            throw new UnknownUserException();
        if (param.getPlaceId() == null)
            throw new UnsupportedOperationException();
        PlaceEntity place = placeRepository.getById(param.getPlaceId());
        UserEntity user = userRepository.getById(param.getUserId());
        PlaceCommentEntity lastUserCommentEntity = placeCommentRepository.findByDeletedIsFalseAndUserIdAndPlaceId(param.getUserId(), param.getPlaceId());
        if (!canUserComment(lastUserCommentEntity))
            throw new UserAlreadyCommentThisPlaceException();
        PlaceCommentEntity parent =(param.getParentId()!=null)? placeCommentRepository.getById(param.getParentId()):null;
        PlaceCommentEntity comment = placeCommentRepository.add(PlaceCommentEntity.builder()
                .comment(param.getComment())
                .user(user)
                .place(place)
                .status(PlaceCommentStatusEnum.AWAIT)
                .parent(parent)
                .build());
        return PlaceRateAndCommentConvertor.toDto(comment);
    }

    public static boolean canUserComment(PlaceCommentEntity lastComment) {
        if (lastComment == null) {
            return true;
        }
        if (lastComment.getCreatedDate() == null) {
            return true;
        }
        LocalDateTime now = LocalDateTime.now();
        Duration diff = Duration.between(((Timestamp) lastComment.getCreatedDate()).toLocalDateTime(), now);
        long hours = diff.toHours();

        return hours >= 24;
    }

    @Override
    public PlaceCommentDto update(@NonNull PlaceCommentParam param) {
        PlaceCommentEntity comment = placeCommentRepository.getById(param.getId());
        comment.setStatus(param.getStatus());
        placeCommentRepository.update(comment);
        return PlaceRateAndCommentConvertor.toDto(comment);
    }

    @Override
    public PlaceCommentDto delete(@NonNull PlaceCommentParam param) {
        PlaceCommentEntity comment = placeCommentRepository.getById(param.getId());
        placeCommentRepository.deleteById2(comment);
        return PlaceRateAndCommentConvertor.toDto(comment);
    }

    @Override
    public PlaceCommentDto getById(long id) {
        PlaceCommentEntity comment = placeCommentRepository.getById(id);
        return PlaceRateAndCommentConvertor.toDto(comment);
    }

    @Override
    public PlaceCommentEntity add(PlaceCommentEntity entity) {
        return placeCommentRepository.add(entity);
    }

    @Override
    public PlaceCommentEntity update(PlaceCommentEntity entity) {
        return placeCommentRepository.update(entity);
    }

    @Override
    public PlaceCommentEntity delete(PlaceCommentEntity entity) {
        return placeCommentRepository.deleteById2(entity);
    }

    @Override
    public PlaceCommentEntity getEntityById(long id) {
        return placeCommentRepository.getById(id);
    }

    @Override
    public List<PlaceCommentEntity> getAll(Pageable pageable) {
        return placeCommentRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<PlaceCommentEntity> findAll(Specification<PlaceCommentEntity> specification, Pageable pageable) {
        return placeCommentRepository.findAll(specification, pageable);
    }

    @Override
    public List<PlaceCommentDto> convertToDtos(List<PlaceCommentEntity> entities) {
        return entities.stream().map(PlaceRateAndCommentConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<PlaceCommentDto> convertToDtos(Page<PlaceCommentEntity> entities) {
        return entities.map(PlaceRateAndCommentConvertor::toDto);
    }
}
