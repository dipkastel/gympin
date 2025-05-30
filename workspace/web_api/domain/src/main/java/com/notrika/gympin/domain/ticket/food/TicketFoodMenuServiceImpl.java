package com.notrika.gympin.domain.ticket.food;

import com.notrika.gympin.common.ticket.ticketFood.dto.TicketFoodMenuDto;
import com.notrika.gympin.common.ticket.ticketFood.param.TicketFoodMenuParam;
import com.notrika.gympin.common.ticket.ticketFood.query.TicketFoodMenuQuery;
import com.notrika.gympin.common.ticket.ticketFood.servie.TicketFoodMenuService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.TicketFoodConvertor;
import com.notrika.gympin.persistence.dao.repository.place.PlaceCateringRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.food.TicketFoodItemRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.food.TicketFoodMenuRepository;
import com.notrika.gympin.persistence.entity.ticket.food.TicketFoodItemEntity;
import com.notrika.gympin.persistence.entity.ticket.food.TicketFoodMenuEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TicketFoodMenuServiceImpl extends AbstractBaseService<TicketFoodMenuParam, TicketFoodMenuDto, TicketFoodMenuQuery, TicketFoodMenuEntity> implements TicketFoodMenuService {

    @Autowired
    private TicketFoodMenuRepository ticketFoodMenuRepository;

    @Autowired
    private TicketFoodItemRepository ticketFoodItemRepository;

    @Autowired
    private PlaceCateringRepository placeCateringRepository;

    @Override
    public TicketFoodMenuDto add(@NonNull TicketFoodMenuParam param) {
        TicketFoodItemEntity item = ticketFoodItemRepository.getById(param.getFood().getId());
        TicketFoodMenuEntity foodMenu = TicketFoodMenuEntity.builder()
                .foodItem(item)
                .date(param.getDate())
                .foodItemStatus(param.getFoodItemStatus())
                .minOrderCount(param.getMinOrderCount())
                .maxOrderCount(param.getMaxOrderCount())
                .category(param.getCategory())
                .build();
        TicketFoodMenuEntity entity = this.add(foodMenu);
        return TicketFoodConvertor.toDto(entity);
    }

    @Override
    public TicketFoodMenuDto update(@NonNull TicketFoodMenuParam param) {
        TicketFoodMenuEntity foodMenu = getEntityById(param.getId());
        foodMenu.setFoodItemStatus(param.getFoodItemStatus());
        foodMenu.setCategory(param.getCategory());
        return TicketFoodConvertor.toDto(ticketFoodMenuRepository.update(foodMenu));
    }

    @Override
    public TicketFoodMenuDto delete(@NonNull TicketFoodMenuParam param) {
        TicketFoodMenuEntity entity = getEntityById(param.getId());
        entity = this.delete(entity);
        return TicketFoodConvertor.toDto(entity);
    }

    @Override
    public TicketFoodMenuDto getById(long id) {
        return TicketFoodConvertor.toDto(this.getEntityById(id));
    }

    @Override
    public TicketFoodMenuEntity add(TicketFoodMenuEntity entity) {
        return ticketFoodMenuRepository.add(entity);
    }

    @Override
    public TicketFoodMenuEntity update(TicketFoodMenuEntity entity) {
        return ticketFoodMenuRepository.update(entity);
    }

    @Override
    public TicketFoodMenuEntity delete(TicketFoodMenuEntity entity) {
        return ticketFoodMenuRepository.deleteById2(entity);
    }

    @Override
    public TicketFoodMenuEntity getEntityById(long id) {
        return ticketFoodMenuRepository.getById(id);
    }

    @Override
    public List<TicketFoodMenuEntity> getAll(Pageable pageable) {
        return ticketFoodMenuRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<TicketFoodMenuEntity> findAll(Specification<TicketFoodMenuEntity> specification, Pageable pageable) {
        return ticketFoodMenuRepository.findAll(specification, pageable);
    }

    @Override
    public List<TicketFoodMenuDto> convertToDtos(List<TicketFoodMenuEntity> entities) {
        return entities.stream().filter(o -> !o.isDeleted()).map(TicketFoodConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<TicketFoodMenuDto> convertToDtos(Page<TicketFoodMenuEntity> entities) {
        return entities.map(TicketFoodConvertor::toDto);
    }


    @Override
    public List<Date> getFoodMenuDates(Long cateringId) {
        List<Date> activeDates = ticketFoodMenuRepository.getActiveDatesByCateringId(cateringId);
        return activeDates;
    }
}
