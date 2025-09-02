package com.notrika.gympin.domain.settings.link;

import com.notrika.gympin.common.settings.links.dto.LinkDto;
import com.notrika.gympin.common.settings.links.param.LinkParam;
import com.notrika.gympin.common.settings.links.query.LinkQuery;
import com.notrika.gympin.common.settings.links.service.LinkService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.LinkConvertor;
import com.notrika.gympin.persistence.dao.repository.settings.ManageLinkRepository;
import com.notrika.gympin.persistence.entity.management.links.ManageLinkEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LinkServiceImpl extends AbstractBaseService<LinkParam, LinkDto, LinkQuery, ManageLinkEntity> implements LinkService {


    @Autowired
    ManageLinkRepository manageLinkRepository;

    @Override
    public LinkDto add(@NonNull LinkParam linkParam) {
        ManageLinkEntity entity = ManageLinkEntity.builder()
                .name(linkParam.getName())
                .code(linkParam.getCode())
                .url(linkParam.getUrl())
                .value1(linkParam.getValue1())
                .value2(linkParam.getValue2())
                .value3(linkParam.getValue3())
                .isActive(linkParam.getIsActive())
                .description(linkParam.getDescription())
                .build();
        return LinkConvertor.toDto(manageLinkRepository.add(entity));
    }

    @Override
    public LinkDto update(@NonNull LinkParam linkParam) {
        ManageLinkEntity entity = manageLinkRepository.getById(linkParam.getId());
        entity.setName(linkParam.getName());
        entity.setCode(linkParam.getCode());
        entity.setUrl(linkParam.getUrl());
        entity.setValue1(linkParam.getValue1());
        entity.setValue2(linkParam.getValue2());
        entity.setValue3(linkParam.getValue3());
        entity.setIsActive(linkParam.getIsActive());
        entity.setDescription(linkParam.getDescription());
        return LinkConvertor.toDto(manageLinkRepository.update(entity));
    }

    @Override
    public LinkDto delete(@NonNull LinkParam linkParam) {
        ManageLinkEntity entity = manageLinkRepository.getById(linkParam.getId());
        return LinkConvertor.toDto(manageLinkRepository.deleteById2(entity));
    }

    @Override
    public LinkDto getById(long id) {
        return LinkConvertor.toDto(manageLinkRepository.getById(id));
    }

    @Override
    public ManageLinkEntity add(ManageLinkEntity entity) {
        return manageLinkRepository.add(entity);
    }

    @Override
    public ManageLinkEntity update(ManageLinkEntity entity) {
        return manageLinkRepository.update(entity);
    }

    @Override
    public ManageLinkEntity delete(ManageLinkEntity entity) {
        return manageLinkRepository.deleteById2(entity);
    }

    @Override
    public ManageLinkEntity getEntityById(long id) {
        return manageLinkRepository.getById(id);
    }

    @Override
    public List<ManageLinkEntity> getAll(Pageable pageable) {
        return manageLinkRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<ManageLinkEntity> findAll(Specification<ManageLinkEntity> specification, Pageable pageable) {
        return manageLinkRepository.findAll(specification, pageable);
    }

    @Override
    public List<LinkDto> convertToDtos(List<ManageLinkEntity> entities) {
        return entities.stream().filter(o -> !o.isDeleted()).map(LinkConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<LinkDto> convertToDtos(Page<ManageLinkEntity> entities) {
        return entities.map(LinkConvertor::toDto);
    }

    @Override
    public LinkDto getByCode(String code) {
        return LinkConvertor.toDto(manageLinkRepository.getByCodeAndDeletedIsFalse(code));
    }
}
