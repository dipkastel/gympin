package com.notrika.gympin.domain.gympin.homePage;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.gympin.homePage.dto.HomePageDeadendDto;
import com.notrika.gympin.common.gympin.homePage.dto.HomePageDestinationDto;
import com.notrika.gympin.common.gympin.homePage.dto.HomePageItemDto;
import com.notrika.gympin.common.gympin.homePage.dto.HomePageTypeDto;
import com.notrika.gympin.common.gympin.homePage.param.HomePageDestinationParam;
import com.notrika.gympin.common.gympin.homePage.param.HomePageItemParam;
import com.notrika.gympin.common.gympin.homePage.param.HomePageTypeParam;
import com.notrika.gympin.common.gympin.homePage.query.HomePageQuery;
import com.notrika.gympin.common.gympin.homePage.service.HomePageService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.HomePageConvertor;
import com.notrika.gympin.persistence.dao.repository.HomePageDestinationRepository;
import com.notrika.gympin.persistence.dao.repository.HomePageRepository;
import com.notrika.gympin.persistence.dao.repository.HomePageTypesRepository;
import com.notrika.gympin.persistence.dao.repository.MultimediaRepository;
import com.notrika.gympin.persistence.entity.homePage.HomePageDestionationEntity;
import com.notrika.gympin.persistence.entity.homePage.HomePageItemEntity;
import com.notrika.gympin.persistence.entity.homePage.HomePageTypeEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class HomePageServiceImpl extends AbstractBaseService<HomePageItemParam, HomePageDeadendDto, HomePageQuery, HomePageItemEntity> implements HomePageService {

    @Autowired
    private HomePageRepository homeRepository;
    @Autowired
    private HomePageTypesRepository homePageTypesRepository;
    @Autowired
    private HomePageDestinationRepository homePageDestinationRepository;
    @Autowired
    private MultimediaRepository multimediaRepository;

    @Override
    public HomePageDeadendDto add(HomePageItemParam homePageParam) {
        log.info("MainPageLayoutChildItemDto add is going to execute with param {}", homePageParam);
        return HomePageConvertor.toDeadendDto(add(HomePageConvertor.toTypeEntity(homePageParam)));
    }

    @Override
    public HomePageItemEntity add(HomePageItemEntity entity) {
        log.info("MainPageLayoutChildItemEntity add is going to execute with param {}", entity);
        return homeRepository.add(entity);
    }

    @Override
    public HomePageDeadendDto update(HomePageItemParam homePageParam) {
        log.info("MainPageLayoutChildItemDto update is going to execute with param {}", homePageParam);
        HomePageItemEntity itemEntity = getEntityById(homePageParam.getId());

        if (homePageParam.getImageId() != null)
            itemEntity.setMultimedia(multimediaRepository.getById(homePageParam.getImageId()));
        if (homePageParam.getParent() != null)
            itemEntity.setParent(homeRepository.getById(homePageParam.getParent().getId()));

        itemEntity.setTitle(homePageParam.getTitle());
        itemEntity.setDescription(homePageParam.getDescription());
        itemEntity.setDestination(homePageParam.getDestination());
        itemEntity.setData(homePageParam.getData());
        itemEntity.setPriority(homePageParam.getPriority());
        return HomePageConvertor.toDeadendDto(update(itemEntity));
    }

    @Override
    public HomePageItemEntity update(HomePageItemEntity entity) {
        log.info("MainPageLayoutChildItemEntity update is going to execute with param {}", entity);
        return homeRepository.update(entity);
    }

    @Override
    public HomePageDeadendDto delete(HomePageItemParam homePageParam) {
        log.info("MainPageLayoutChildItemDto delete is going to execute with param {}", homePageParam);
        HomePageItemEntity entity = getEntityById(homePageParam.getId());
        return HomePageConvertor.toDeadendDto(homeRepository.deleteById2(entity));
    }

    @Override
    public HomePageItemEntity delete(HomePageItemEntity entity) {
        log.info("MainPageLayoutChildItemEntity delete is going to execute with param {}", entity);
        return homeRepository.deleteById2(entity);
    }

    @Override
    public HomePageDeadendDto getById(long id) {
        log.info("MainPageLayoutChildItemDto getById is going to execute with param {}", id);
        return HomePageConvertor.toDeadendDto(getEntityById(id));
    }

    @Override
    public HomePageItemEntity getEntityById(long id) {
        log.info("MainPageLayoutChildItemEntity getEntityById is going to execute with param {}", id);
        return homeRepository.getById(id);
    }

    @Override
    public List<HomePageItemEntity> getAll(Pageable pageable) {
        log.info("List<MainPageLayoutChildItemEntity> getAll is going to execute with param {}", pageable);
        return homeRepository.findAllUndeleted(pageable).stream().filter(p -> p.getParent() == null).collect(Collectors.toList());
    }

    @Override
    public Page<HomePageItemEntity> findAll(Specification<HomePageItemEntity> specification, Pageable pageable) {
        return homeRepository.findAll(specification,pageable);
    }

    @Override
    public List<HomePageDeadendDto> convertToDtos(List<HomePageItemEntity> entities) {
        log.info("List<MainPageLayoutChildItemDto> convertToDtos is going to execute with param {}", entities);
        return entities.stream().map(HomePageConvertor::toDeadendDto).collect(Collectors.toList());
    }

    @Override
    public Page<HomePageDeadendDto> convertToDtos(Page<HomePageItemEntity> entities) {
        return null;
    }

    @Override
    public HomePageItemDto getByHomeList(Long id) {
        return HomePageConvertor.toTypeDto(homeRepository.getById(id));
    }

    @Override
    public List<HomePageTypeDto> getAllTypes(Pageable pageable) {
        return HomePageConvertor.toTypeDto(homePageTypesRepository.findAllUndeleted(pageable));
    }

    @Override
    public HomePageTypeDto addType(HomePageTypeParam param) {
        return HomePageConvertor.toTypeDto(homePageTypesRepository.add(HomePageConvertor.toTypeEntity(param)));
    }

    @Override
    public HomePageTypeDto deleteType(HomePageTypeParam param) {
        HomePageTypeEntity entity = homePageTypesRepository.getById(param.getId());
        return HomePageConvertor.toTypeDto(homePageTypesRepository.deleteById2(entity));
    }

    @Override
    public List<HomePageDestinationDto> getAllDestinations(Pageable pageable) {
        return HomePageConvertor.toDestinationDto(homePageDestinationRepository.findAllUndeleted(pageable));
    }

    @Override
    public HomePageDestinationDto addDestination(HomePageDestinationParam param) {
        return HomePageConvertor.toDestinationDto(homePageDestinationRepository.add(HomePageConvertor.toDestinationEntity(param)));
    }

    @Override
    public HomePageDestinationDto deleteDestination(HomePageDestinationParam param) {
        HomePageDestionationEntity entity = homePageDestinationRepository.getById(param.getId());
        return HomePageConvertor.toDestinationDto(homePageDestinationRepository.deleteById2(entity));
    }
}
