package com.notrika.gympin.domain.place;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.place.qrMessage.dto.PlaceQrMessageDto;
import com.notrika.gympin.common.place.qrMessage.param.PlaceQrMessageParam;
import com.notrika.gympin.common.place.qrMessage.service.PlaceQrMessageService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.PlaceQrMessageConvertor;
import com.notrika.gympin.persistence.dao.repository.place.PlaceQrMessageRepository;
import com.notrika.gympin.persistence.dao.repository.place.PlaceRepository;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.qrMessage.PlaceQrMessageEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlaceQrMessageServiceImpl extends AbstractBaseService<PlaceQrMessageParam, PlaceQrMessageDto, BaseQuery<?>, PlaceQrMessageEntity> implements PlaceQrMessageService {

    @Autowired
    private PlaceQrMessageRepository placeQrMessageRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @Override
    public PlaceQrMessageDto add(PlaceQrMessageParam placeQrMessageParam) {
        PlaceEntity place = placeRepository.findById(placeQrMessageParam.getPlace().getId()).get();
        PlaceQrMessageEntity initPlaceAbout = PlaceQrMessageEntity.builder()
                .place(place)
                .text(placeQrMessageParam.getText())
                .replaceText(placeQrMessageParam.getReplaceText())
                .build();
        return PlaceQrMessageConvertor.ToDto(add(initPlaceAbout));
    }

    @Override
    public PlaceQrMessageEntity add(PlaceQrMessageEntity entity) {
        return placeQrMessageRepository.add(entity);
    }

    @Override
    public PlaceQrMessageDto update(@NonNull PlaceQrMessageParam param) {
        PlaceQrMessageEntity init = getEntityById(param.getId());
        init.setText(param.getText());
        init.setReplaceText(param.getReplaceText());
        return PlaceQrMessageConvertor.ToDto(placeQrMessageRepository.update(init));
    }

    @Override
    public PlaceQrMessageDto delete(@NonNull PlaceQrMessageParam Param) {
        PlaceQrMessageEntity init = getEntityById(Param.getId());
        return  PlaceQrMessageConvertor.ToDto(placeQrMessageRepository.deleteById2(init));
    }

    @Override
    public PlaceQrMessageDto getById(long id) {
        return PlaceQrMessageConvertor.ToDto(placeQrMessageRepository.getById(id));
    }


    @Override
    public PlaceQrMessageEntity update(PlaceQrMessageEntity entity) {
        PlaceQrMessageEntity init = getEntityById(entity.getId());
        init.setText(entity.getText());
        init.setReplaceText(entity.getReplaceText());
        return placeQrMessageRepository.update(init);
    }

    @Override
    public PlaceQrMessageEntity delete(PlaceQrMessageEntity entity) {
        PlaceQrMessageEntity init = getEntityById(entity.getId());
        return placeQrMessageRepository.deleteById2(init);
    }

    @Override
    public PlaceQrMessageEntity getEntityById(long id) {
        return placeQrMessageRepository.getById(id);
    }

    @Override
    public List<PlaceQrMessageEntity> getAll(Pageable pageable) {
        return placeQrMessageRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<PlaceQrMessageEntity> findAll(Specification<PlaceQrMessageEntity> specification, Pageable pageable) {
        return null;
    }

    @Override
    public List<PlaceQrMessageDto> convertToDtos(List<PlaceQrMessageEntity> entities) {
        return entities.stream().map(PlaceQrMessageConvertor::ToDto).collect(Collectors.toList());
    }

    @Override
    public Page<PlaceQrMessageDto> convertToDtos(Page<PlaceQrMessageEntity> entities) {
        return null;
    }

    public PlaceQrMessageDto convertToDtos(PlaceQrMessageEntity entities) {
        return null;
    }

    @Override
    public List<PlaceQrMessageDto> getByPlaceId(Long placeId) {
        return PlaceQrMessageConvertor.ToDto(placeQrMessageRepository.findAllByPlaceIdAndDeletedFalse(placeId));
    }
}
