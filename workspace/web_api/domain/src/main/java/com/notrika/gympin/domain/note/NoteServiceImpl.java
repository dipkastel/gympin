package com.notrika.gympin.domain.note;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.note.dto.NoteDto;
import com.notrika.gympin.common.note.param.NoteParam;
import com.notrika.gympin.common.note.service.NoteService;
import com.notrika.gympin.common.place.option.dto.OptionOfPlaceDto;
import com.notrika.gympin.common.place.option.param.OptionOfPlaceParam;
import com.notrika.gympin.common.place.option.service.OptionOfPlaceService;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.ticket.param.TicketParam;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.NoteConvertor;
import com.notrika.gympin.domain.util.convertor.OptionConvertor;
import com.notrika.gympin.persistence.dao.repository.*;
import com.notrika.gympin.persistence.entity.note.NoteEntity;
import com.notrika.gympin.persistence.entity.place.PlaceEntity;
import com.notrika.gympin.persistence.entity.place.option.OptionOfPlaceEntity;
import com.notrika.gympin.persistence.entity.place.option.PlaceOptionEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NoteServiceImpl extends AbstractBaseService<NoteParam, NoteDto, BaseQuery<?>, NoteEntity> implements NoteService {

    @Autowired
    private NoteRepository noteRepository;
    @Autowired
    private PlaceRepository placeRepository;
    @Autowired
    private CorporateRepository corporateRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TicketRepository ticketRepository;

    @Override
    public NoteDto add(@NonNull NoteParam noteParam) {
        NoteEntity entity = new NoteEntity();
        if(noteParam.getPlace()!=null)
            entity.setPlace(placeRepository.getById(noteParam.getPlace().getId()));
        if(noteParam.getCorporate()!=null)
            entity.setCorporate(corporateRepository.getById(noteParam.getCorporate().getId()));
        if (noteParam.getUser()!=null)
            entity.setUser(userRepository.getById(noteParam.getUser().getId()));
        if (noteParam.getTicket()!=null)
            entity.setTicket(ticketRepository.getById(noteParam.getTicket().getId()));
        entity.setText(noteParam.getText());
        entity.setType(noteParam.getType());
        entity.setIsToDo(noteParam.getIsToDo());
        return NoteConvertor.toDto(noteRepository.add(entity));
    }

    @Override
    public NoteDto update(@NonNull NoteParam noteParam) {
        NoteEntity entity = noteRepository.getById(noteParam.getId());
        entity.setIsToDo(noteParam.getIsToDo());
        return NoteConvertor.toDto(noteRepository.update(entity));
    }

    @Override
    public NoteDto delete(@NonNull NoteParam noteParam) {
        NoteEntity note = noteRepository.getById(noteParam.getId());
        return NoteConvertor.toDto(noteRepository.deleteById2(note));
    }

    @Override
    public NoteDto getById(long id) {
        return NoteConvertor.toDto(noteRepository.getById(id));
    }

    @Override
    public NoteEntity add(NoteEntity entity) {
        return noteRepository.add(entity);
    }

    @Override
    public NoteEntity update(NoteEntity entity) {
        return noteRepository.update(entity);
    }

    @Override
    public NoteEntity delete(NoteEntity entity) {
        return noteRepository.deleteById2(entity);
    }

    @Override
    public NoteEntity getEntityById(long id) {
        return noteRepository.getById(id);
    }

    @Override
    public List<NoteEntity> getAll(Pageable pageable) {
        return noteRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<NoteEntity> findAll(Specification<NoteEntity> specification, Pageable pageable) {
        return noteRepository.findAll(specification,pageable);
    }

    @Override
    public List<NoteDto> convertToDtos(List<NoteEntity> entities) {
        return entities.stream().map(NoteConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<NoteDto> convertToDtos(Page<NoteEntity> entities) {
        return entities.map(NoteConvertor::toDto);
    }

    @Override
    public List<NoteDto> getByPlace(PlaceParam placeParam) {
        return convertToDtos(noteRepository.findAllByPlaceIdAndDeletedIsFalse(placeParam.getId()));
    }

    @Override
    public List<NoteDto> getByCorporate(CorporateParam corporateParam) {
        return convertToDtos(noteRepository.findAllByCorporateIdAndDeletedIsFalse(corporateParam.getId()));
    }

    @Override
    public List<NoteDto> getByUser(UserParam userParam) {
        return convertToDtos(noteRepository.findAllByUserIdAndDeletedIsFalse(userParam.getId()));
    }
    @Override
    public List<NoteDto> getByTicket(TicketParam ticketParam) {
        return convertToDtos(noteRepository.findAllByTicketIdAndDeletedIsFalse(ticketParam.getId()));
    }
}
