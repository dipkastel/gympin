package com.notrika.gympin.domain.ticket.common;

import com.notrika.gympin.common.ticket.common.service.ActiveTimesService;
import com.notrika.gympin.common.ticket.common.param.ActiveTimesParam;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.ticket.common.dto.ActiveTimesDto;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.HallConvertor;
import com.notrika.gympin.persistence.dao.repository.place.hall.HallRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.common.TicketHallActiveTimesRepository;
import com.notrika.gympin.persistence.entity.place.hall.HallEntity;
import com.notrika.gympin.persistence.entity.ticket.common.TicketHallActiveTimeEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActiveTimesServiceImpl extends AbstractBaseService<ActiveTimesParam, ActiveTimesDto, BaseQuery<?>, TicketHallActiveTimeEntity> implements ActiveTimesService {

    @Autowired
    TicketHallActiveTimesRepository ticketSubscribeHallActiveTimesRepository;
    @Autowired
    HallRepository hallRepository;

    @Override
    public ActiveTimesDto add(@NonNull ActiveTimesParam activeTimesParam) {
        HallEntity hall = hallRepository.getById(activeTimesParam.getHall().getId());
        TicketHallActiveTimeEntity ticketSubscribeHallActiveTime = TicketHallActiveTimeEntity.builder()
                .hall(hall)
                .name(activeTimesParam.getName())
                .dayOfWeek(activeTimesParam.getDayOfWeek())
                .openingTime(activeTimesParam.getOpeningTime())
                .closingTime(activeTimesParam.getClosingTime())
                .build();
        return HallConvertor.convertToActionDto(ticketSubscribeHallActiveTimesRepository.add(ticketSubscribeHallActiveTime));
    }

    @Override
    public TicketHallActiveTimeEntity add(TicketHallActiveTimeEntity entity) {
        return ticketSubscribeHallActiveTimesRepository.add(entity);
    }


    @Override
    public ActiveTimesDto update(@NonNull ActiveTimesParam activeTimesParam) {
        TicketHallActiveTimeEntity ticketSubscribeHallActiveTime = ticketSubscribeHallActiveTimesRepository.getById(activeTimesParam.getId());
        ticketSubscribeHallActiveTime.setOpeningTime(activeTimesParam.getOpeningTime());
        ticketSubscribeHallActiveTime.setClosingTime(activeTimesParam.getClosingTime());
        ticketSubscribeHallActiveTime.setDayOfWeek(activeTimesParam.getDayOfWeek());
        ticketSubscribeHallActiveTime.setName(activeTimesParam.getName());
        return HallConvertor.convertToActionDto(ticketSubscribeHallActiveTimesRepository.update(ticketSubscribeHallActiveTime));
    }

    @Override
    public TicketHallActiveTimeEntity update(TicketHallActiveTimeEntity entity) {
        return ticketSubscribeHallActiveTimesRepository.update(entity);
    }


    @Override
    public ActiveTimesDto delete(@NonNull ActiveTimesParam activeTimesParam) {
        TicketHallActiveTimeEntity entity = ticketSubscribeHallActiveTimesRepository.getById(activeTimesParam.getId());
        return HallConvertor.convertToActionDto(ticketSubscribeHallActiveTimesRepository.deleteById2(entity));
    }
    @Override
    public TicketHallActiveTimeEntity delete(TicketHallActiveTimeEntity entity) {
        return ticketSubscribeHallActiveTimesRepository.deleteById2(entity);
    }

    @Override
    public ActiveTimesDto getById(long id) {
        return HallConvertor.convertToActionDto(ticketSubscribeHallActiveTimesRepository.getById(id));
    }

    @Override
    public TicketHallActiveTimeEntity getEntityById(long id) {
        return ticketSubscribeHallActiveTimesRepository.getById(id);
    }

    @Override
    public List<TicketHallActiveTimeEntity> getAll(Pageable pagingParam) {
        return ticketSubscribeHallActiveTimesRepository.findAllUndeleted(pagingParam);
    }

    @Override
    public Page<TicketHallActiveTimeEntity> findAll(Specification<TicketHallActiveTimeEntity> specification, Pageable pageable) {
        return null;
    }

    @Override
    public List<ActiveTimesDto> convertToDtos(List<TicketHallActiveTimeEntity> entities) {
        return entities.stream().filter(o->!o.isDeleted()).map(HallConvertor::convertToActionDto).collect(Collectors.toList());
    }

    @Override
    public Page<ActiveTimesDto> convertToDtos(Page<TicketHallActiveTimeEntity> entities) {
        return null;
    }

    @Override
    public List<ActiveTimesDto> getByHallId(Long id) {
        return convertToDtos(ticketSubscribeHallActiveTimesRepository.findAllByHallIdAndDeletedFalse(id));
    }

    @Override
    public List<ActiveTimesDto> getByPlaceId(Long id) {
        return convertToDtos(ticketSubscribeHallActiveTimesRepository.findAllByHallPlaceIdAndHallDeletedFalseAndDeletedFalse(id));
    }

    @Override
    public List<ActiveTimesDto> addAll(List<ActiveTimesParam> params) {
        HallEntity hall = hallRepository.getById(params.get(0).getHall().getId());
        List<TicketHallActiveTimeEntity> list = new ArrayList<>();
        for (ActiveTimesParam p : params) {
            TicketHallActiveTimeEntity ticketSubscribeHallActiveTime = TicketHallActiveTimeEntity.builder()
                    .hall(hall)
                    .name(p.getName())
                    .dayOfWeek(p.getDayOfWeek())
                    .openingTime(p.getOpeningTime())
                    .closingTime(p.getClosingTime())
                    .build();
            list.add(ticketSubscribeHallActiveTime);
        }
        return convertToDtos(ticketSubscribeHallActiveTimesRepository.addAll(list));
    }

    @Override
    public List<ActiveTimesDto> activeTimesByTicketSubscribe(Long ticketSubscribeId) {
        return ticketSubscribeHallActiveTimesRepository.findAllByDeletedFalseAndTicketSubscribes_Id(ticketSubscribeId).stream().filter(o->!o.isDeleted()).map(HallConvertor::convertToActionDto).collect(Collectors.toList());
    }
}
