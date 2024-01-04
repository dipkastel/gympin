package com.notrika.gympin.domain.ticket.buyable;

import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto;
import com.notrika.gympin.common.ticket.buyable.param.TicketBuyableParam;
import com.notrika.gympin.common.ticket.buyable.query.TicketBuyableQuery;
import com.notrika.gympin.common.ticket.buyable.service.TicketBuyableService;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.BuyableConvertor;
import com.notrika.gympin.persistence.dao.repository.place.PlacePersonnelRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.BuyableRepository;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelEntity;
import com.notrika.gympin.persistence.entity.ticket.BuyableEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TicketBuyableServiceImpl extends AbstractBaseService<TicketBuyableParam, TicketBuyableDto, TicketBuyableQuery, BuyableEntity> implements TicketBuyableService {

    @Autowired
    private BuyableRepository buyableRepository;

    @Autowired
    private PlacePersonnelRepository placePersonnelRepository;


    @Override
    public TicketBuyableDto add(@NonNull TicketBuyableParam param) {
        return null;
    }

    @Override
    public TicketBuyableDto update(@NonNull TicketBuyableParam param) {
        return null;
    }

    @Override
    public TicketBuyableDto delete(@NonNull TicketBuyableParam param) {
        return null;
    }

    @Override
    public TicketBuyableDto getById(long id) {
        return BuyableConvertor.ToDto(this.getEntityById(id));
    }

    @Override
    public BuyableEntity add(BuyableEntity entity) {
        return null;
    }

    @Override
    public BuyableEntity update(BuyableEntity entity) {
        return null;
    }

    @Override
    public BuyableEntity delete(BuyableEntity entity) {
        return null;
    }

    @Override
    public BuyableEntity getEntityById(long id) {
        return buyableRepository.getById(id);
    }

    @Override
    public List<BuyableEntity> getAll(Pageable pageable) {
        return buyableRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<BuyableEntity> findAll(Specification<BuyableEntity> specification, Pageable pageable) {
        return buyableRepository.findAll(specification, pageable);
    }

    @Override
    public List<TicketBuyableDto> convertToDtos(List<BuyableEntity> entities) {
        return entities.stream().map(BuyableConvertor::ToDto).collect(Collectors.toList());
    }

    @Override
    public Page<TicketBuyableDto> convertToDtos(Page<BuyableEntity> entities) {
        return entities.map(BuyableConvertor::ToDto);
    }

    @Override
    public TicketBuyableDto setTicketBeneficiary(TicketBuyableParam param) {
        BuyableEntity buyable = buyableRepository.getById(param.getId());
        PlacePersonnelEntity personnel = (param.getBeneficiary().getId()!=0)?placePersonnelRepository.getById(param.getBeneficiary().getId()):null;
        buyable.setBeneficiary(personnel);
        return BuyableConvertor.ToDto(buyableRepository.update(buyable));
    }
}
