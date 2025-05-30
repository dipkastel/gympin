package com.notrika.gympin.domain.ticket.food;

import com.notrika.gympin.common.ticket.buyable.enums.BuyableType;
import com.notrika.gympin.common.ticket.ticketFood.dto.TicketFoodDto;
import com.notrika.gympin.common.ticket.ticketFood.param.TicketFoodParam;
import com.notrika.gympin.common.ticket.ticketFood.query.TicketFoodQuery;
import com.notrika.gympin.common.ticket.ticketFood.servie.TicketFoodService;
import com.notrika.gympin.common.util.exception.ticket.TicketPriceCannotBeNull;
import com.notrika.gympin.common.util.exception.ticket.UncomfortableValueExeption;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.TicketFoodConvertor;
import com.notrika.gympin.persistence.dao.repository.place.PlaceCateringRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.food.TicketFoodItemRepository;
import com.notrika.gympin.persistence.entity.place.PlaceCateringEntity;
import com.notrika.gympin.persistence.entity.ticket.food.TicketFoodItemEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TicketFoodServiceImpl extends AbstractBaseService<TicketFoodParam, TicketFoodDto, TicketFoodQuery, TicketFoodItemEntity> implements TicketFoodService {

    @Autowired
    private TicketFoodItemRepository ticketFoodItemRepository;
    @Autowired
    private PlaceCateringRepository placeCateringRepository;

    @Override
    public TicketFoodDto add(@NonNull TicketFoodParam param) {
        PlaceCateringEntity place = placeCateringRepository.getById(param.getPlace().getId());
        TicketFoodItemEntity ticketSubscribeEntity = TicketFoodItemEntity.builder()
                .place(place)
                .name(param.getName())
                .price(param.getPlacePrice())
                .valuePrice(param.getValuePrice())
                .placePrice(param.getPlacePrice())
                .discount((short) 0)
                .enable(false)
                .buyableType(BuyableType.FOOD)
                .description(param.getDescription())
                .build();

        ticketSubscribeEntity = this.add(ticketSubscribeEntity);
        return TicketFoodConvertor.toDto(ticketSubscribeEntity);
    }

    @Override
    public TicketFoodDto update(@NonNull TicketFoodParam param) {
        if (param.getValuePrice() == null)
            throw new TicketPriceCannotBeNull();
        if (param.getPlacePrice() == null)
            throw new TicketPriceCannotBeNull();
        if (param.getValuePrice().compareTo(param.getPlacePrice()) < 0)
            throw new UncomfortableValueExeption();
        TicketFoodItemEntity ticketSubscribeEntity = getEntityById(param.getId());
        ticketSubscribeEntity.setName(param.getName());
        ticketSubscribeEntity.setPrice(param.getPlacePrice());
        ticketSubscribeEntity.setValuePrice(param.getValuePrice());
        ticketSubscribeEntity.setPlacePrice(param.getPlacePrice());
        ticketSubscribeEntity.setDiscount((short) 0);
        ticketSubscribeEntity.setBuyableType(BuyableType.SUBSCRIBE);
        ticketSubscribeEntity.setDescription(param.getDescription());
        return TicketFoodConvertor.toDto(ticketFoodItemRepository.update(ticketSubscribeEntity));
    }

    @Override
    public TicketFoodDto delete(@NonNull TicketFoodParam param) {
        TicketFoodItemEntity ticketSubscribeEntity = getEntityById(param.getId());
        ticketSubscribeEntity = this.delete(ticketSubscribeEntity);
        return TicketFoodConvertor.toDto(ticketSubscribeEntity);
    }

    @Override
    public TicketFoodDto getById(long id) {
        return TicketFoodConvertor.toDto(this.getEntityById(id));
    }

    @Override
    public TicketFoodItemEntity add(TicketFoodItemEntity entity) {
        return ticketFoodItemRepository.add(entity);
    }

    @Override
    public TicketFoodItemEntity update(TicketFoodItemEntity entity) {
        return ticketFoodItemRepository.update(entity);
    }

    @Override
    public TicketFoodItemEntity delete(TicketFoodItemEntity entity) {
        return ticketFoodItemRepository.deleteById2(entity);
    }

    @Override
    public TicketFoodItemEntity getEntityById(long id) {
        return ticketFoodItemRepository.getById(id);
    }

    @Override
    public List<TicketFoodItemEntity> getAll(Pageable pageable) {
        return ticketFoodItemRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<TicketFoodItemEntity> findAll(Specification<TicketFoodItemEntity> specification, Pageable pageable) {
        return ticketFoodItemRepository.findAll(specification, pageable);
    }

    @Override
    public List<TicketFoodDto> convertToDtos(List<TicketFoodItemEntity> entities) {
        return entities.stream().filter(o -> !o.isDeleted()).map(TicketFoodConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<TicketFoodDto> convertToDtos(Page<TicketFoodItemEntity> entities) {
        return entities.map(TicketFoodConvertor::toDto);
    }


}
