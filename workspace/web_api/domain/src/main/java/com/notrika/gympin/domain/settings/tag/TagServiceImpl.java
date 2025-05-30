package com.notrika.gympin.domain.settings.tag;

import com.notrika.gympin.common.settings.tag.dto.TagDto;
import com.notrika.gympin.common.settings.tag.enums.TagTypes;
import com.notrika.gympin.common.settings.tag.param.TagParam;
import com.notrika.gympin.common.settings.tag.query.TagQuery;
import com.notrika.gympin.common.settings.tag.service.TagService;
import com.notrika.gympin.common.util.exception.general.DuplicateEntryAddExeption;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.TagConvertor;
import com.notrika.gympin.persistence.dao.repository.place.PlaceGymRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageTagsRepository;
import com.notrika.gympin.persistence.entity.management.tags.ManageTagsEntity;
import com.notrika.gympin.persistence.entity.place.PlaceGymEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TagServiceImpl extends AbstractBaseService<TagParam, TagDto, TagQuery, ManageTagsEntity> implements TagService {

    @Autowired
    private ManageTagsRepository manageTagsRepository;

    @Autowired
    private PlaceGymRepository placeGymRepository;

    @Override
    public TagDto add(@NonNull TagParam tagParam) {
        ManageTagsEntity entity = new ManageTagsEntity();
        entity.setName(tagParam.getName());
        entity.setPriority(tagParam.getPriority());
        entity.setTagTypes(tagParam.getTagType()!=null?tagParam.getTagType(): TagTypes.NONE);
        return TagConvertor.toDto(manageTagsRepository.add(entity));
    }

    @Override
    public List<TagDto> addToPlace(@NonNull TagParam tagParam) {
        PlaceGymEntity place = placeGymRepository.getById(tagParam.getPlace().getId());
        ManageTagsEntity entity = getEntityById(tagParam.getId());
        List<ManageTagsEntity> placeTags = place.getTags();
        if(placeTags.stream().filter(o->!o.isDeleted()).anyMatch(p->p.getId().equals(entity.getId())))
            throw new DuplicateEntryAddExeption();
        placeTags.add(entity);
        place.setTags(placeTags);
        placeGymRepository.update(place);
        return convertToDtos(placeTags);
    }
    @Override
    public List<TagDto> removeFromPlace(@NonNull TagParam tagParam) {
        PlaceGymEntity place = placeGymRepository.getById(tagParam.getPlace().getId());
        ManageTagsEntity entity = getEntityById(tagParam.getId());
        List<ManageTagsEntity> placeTags = place.getTags();
        placeTags.remove(entity);
        place.setTags(placeTags);
        placeGymRepository.update(place);
        return convertToDtos(placeTags);
    }

    @Override
    public List<TagDto> getPlaceTags(Long placeId) {
        PlaceGymEntity place = placeGymRepository.getById(placeId);
        return convertToDtos(place.getTags());
    }

    @Override
    public TagDto update(@NonNull TagParam tagParam) {
        ManageTagsEntity entity = manageTagsRepository.getById(tagParam.getId());
        if(tagParam.getName()!=null)
            entity.setName(tagParam.getName());
        if(tagParam.getPriority()!=null)
            entity.setPriority(tagParam.getPriority());
        if(tagParam.getTagType()!=null)
            entity.setTagTypes(tagParam.getTagType());
        return TagConvertor.toDto(manageTagsRepository.update(entity));
    }

    @Override
    public TagDto delete(@NonNull TagParam tagParam) {
        ManageTagsEntity tag = manageTagsRepository.getById(tagParam.getId());
        return TagConvertor.toDto(manageTagsRepository.deleteById2(tag));
    }

    @Override
    public TagDto getById(long id) {
        return TagConvertor.toDto(manageTagsRepository.getById(id));
    }

    @Override
    public ManageTagsEntity add(ManageTagsEntity entity) {
        return manageTagsRepository.add(entity);
    }

    @Override
    public ManageTagsEntity update(ManageTagsEntity entity) {
        return manageTagsRepository.update(entity);
    }

    @Override
    public ManageTagsEntity delete(ManageTagsEntity entity) {
        return manageTagsRepository.deleteById2(entity);
    }

    @Override
    public ManageTagsEntity getEntityById(long id) {
        return manageTagsRepository.getById(id);
    }

    @Override
    public List<ManageTagsEntity> getAll(Pageable pageable) {
        return manageTagsRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<ManageTagsEntity> findAll(Specification<ManageTagsEntity> specification, Pageable pageable) {
        return manageTagsRepository.findAll(specification, pageable);
    }

    @Override
    public List<TagDto> convertToDtos(List<ManageTagsEntity> entities) {
        return entities.stream().filter(o->!o.isDeleted()).map(TagConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<TagDto> convertToDtos(Page<ManageTagsEntity> entities) {
        return entities.map(TagConvertor::toDto);
    }


}
