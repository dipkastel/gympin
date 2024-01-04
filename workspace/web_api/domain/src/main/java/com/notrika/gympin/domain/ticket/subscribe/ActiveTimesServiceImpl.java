package com.notrika.gympin.domain.ticket.subscribe;

import com.notrika.gympin.common.ticket.ticketSubscribe.service.ActiveTimesService;
import com.notrika.gympin.common.ticket.ticketSubscribe.param.ActiveTimesParam;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.ticket.ticketSubscribe.dto.ActiveTimesDto;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.HallConvertor;
import com.notrika.gympin.persistence.dao.repository.place.hall.HallRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.subscribe.TicketSubscribeHallActiveTimesRepository;
import com.notrika.gympin.persistence.entity.place.hall.HallEntity;
import com.notrika.gympin.persistence.entity.ticket.subscribe.TicketSubscribeHallActiveTime;
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
public class ActiveTimesServiceImpl extends AbstractBaseService<ActiveTimesParam, ActiveTimesDto, BaseQuery<?>, TicketSubscribeHallActiveTime> implements ActiveTimesService {

    @Autowired
    TicketSubscribeHallActiveTimesRepository ticketSubscribeHallActiveTimesRepository;
    @Autowired
    HallRepository hallRepository;

    @Override
    public ActiveTimesDto add(@NonNull ActiveTimesParam activeTimesParam) {
        HallEntity hall = hallRepository.getById(activeTimesParam.getHall().getId());
        TicketSubscribeHallActiveTime ticketSubscribeHallActiveTime = TicketSubscribeHallActiveTime.builder()
                .hall(hall)
                .dayOfWeek(activeTimesParam.getDayOfWeek())
                .openingTime(activeTimesParam.getOpeningTime())
                .closingTime(activeTimesParam.getClosingTime())
                .build();
        return HallConvertor.convertToActionDto(ticketSubscribeHallActiveTimesRepository.add(ticketSubscribeHallActiveTime));
    }

    @Override
    public TicketSubscribeHallActiveTime add(TicketSubscribeHallActiveTime entity) {
        return ticketSubscribeHallActiveTimesRepository.add(entity);
    }


    @Override
    public ActiveTimesDto update(@NonNull ActiveTimesParam activeTimesParam) {
        TicketSubscribeHallActiveTime ticketSubscribeHallActiveTime = ticketSubscribeHallActiveTimesRepository.getById(activeTimesParam.getId());
        ticketSubscribeHallActiveTime.setOpeningTime(activeTimesParam.getOpeningTime());
        ticketSubscribeHallActiveTime.setClosingTime(activeTimesParam.getClosingTime());
        ticketSubscribeHallActiveTime.setDayOfWeek(activeTimesParam.getDayOfWeek());
        return HallConvertor.convertToActionDto(ticketSubscribeHallActiveTimesRepository.update(ticketSubscribeHallActiveTime));
    }

    @Override
    public TicketSubscribeHallActiveTime update(TicketSubscribeHallActiveTime entity) {
        TicketSubscribeHallActiveTime ticketSubscribeHallActiveTime = ticketSubscribeHallActiveTimesRepository.getById(entity.getId());
        ticketSubscribeHallActiveTime.setOpeningTime(entity.getOpeningTime());
        ticketSubscribeHallActiveTime.setClosingTime(entity.getClosingTime());
        ticketSubscribeHallActiveTime.setDayOfWeek(entity.getDayOfWeek());
        return ticketSubscribeHallActiveTimesRepository.update(ticketSubscribeHallActiveTime);
    }


    @Override
    public ActiveTimesDto delete(@NonNull ActiveTimesParam activeTimesParam) {
        TicketSubscribeHallActiveTime entity = ticketSubscribeHallActiveTimesRepository.getById(activeTimesParam.getId());
        return HallConvertor.convertToActionDto(ticketSubscribeHallActiveTimesRepository.deleteById2(entity));
    }
    @Override
    public TicketSubscribeHallActiveTime delete(TicketSubscribeHallActiveTime entity) {
        return ticketSubscribeHallActiveTimesRepository.deleteById2(entity);
    }

    @Override
    public ActiveTimesDto getById(long id) {
        return HallConvertor.convertToActionDto(ticketSubscribeHallActiveTimesRepository.getById(id));
    }

    @Override
    public TicketSubscribeHallActiveTime getEntityById(long id) {
        return ticketSubscribeHallActiveTimesRepository.getById(id);
    }

    @Override
    public List<TicketSubscribeHallActiveTime> getAll(Pageable pagingParam) {
        return ticketSubscribeHallActiveTimesRepository.findAllUndeleted(pagingParam);
    }

    @Override
    public Page<TicketSubscribeHallActiveTime> findAll(Specification<TicketSubscribeHallActiveTime> specification, Pageable pageable) {
        return null;
    }

    @Override
    public List<ActiveTimesDto> convertToDtos(List<TicketSubscribeHallActiveTime> entities) {
        return entities.stream().map(HallConvertor::convertToActionDto).collect(Collectors.toList());
    }

    @Override
    public Page<ActiveTimesDto> convertToDtos(Page<TicketSubscribeHallActiveTime> entities) {
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
        List<TicketSubscribeHallActiveTime> list = new ArrayList<>();
        for (ActiveTimesParam p : params) {
            TicketSubscribeHallActiveTime ticketSubscribeHallActiveTime = TicketSubscribeHallActiveTime.builder()
                    .hall(hall)
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
        return ticketSubscribeHallActiveTimesRepository.findAllByDeletedFalseAndTicketSubscribes_Id(ticketSubscribeId).stream().map(HallConvertor::convertToActionDto).collect(Collectors.toList());
    }
}
