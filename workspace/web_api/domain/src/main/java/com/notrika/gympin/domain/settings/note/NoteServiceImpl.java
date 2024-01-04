package com.notrika.gympin.domain.settings.note;

import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.finance.invoice.param.InvoiceParam;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.purchased.purchasedSubscribe.param.PurchasedSubscribeParam;
import com.notrika.gympin.common.settings.note.dto.NoteDto;
import com.notrika.gympin.common.settings.note.param.NoteParam;
import com.notrika.gympin.common.settings.note.service.NoteService;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.corporate.CorporateServiceImpl;
import com.notrika.gympin.domain.finance.Invoice.InvoiceServiceImpl;
import com.notrika.gympin.domain.util.convertor.NoteConvertor;
import com.notrika.gympin.persistence.dao.repository.place.PlaceRepository;
import com.notrika.gympin.persistence.dao.repository.purchased.subscribe.PurchasedSubscribeRepository;
import com.notrika.gympin.persistence.dao.repository.settings.ManageNoteRepository;
import com.notrika.gympin.persistence.dao.repository.user.UserRepository;
import com.notrika.gympin.persistence.entity.management.note.ManageNoteEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NoteServiceImpl extends AbstractBaseService<NoteParam, NoteDto, BaseQuery<?>, ManageNoteEntity> implements NoteService {

    @Autowired
    private ManageNoteRepository manageNoteRepository;
    @Autowired
    private PlaceRepository placeRepository;
    @Autowired
    private CorporateServiceImpl corporateService;
    @Autowired
    private InvoiceServiceImpl invoiceService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PurchasedSubscribeRepository purchasedSubscribeRepository;

    @Override
    public NoteDto add(@NonNull NoteParam noteParam) {
        ManageNoteEntity entity = new ManageNoteEntity();
        if (noteParam.getPlace() != null)
            entity.setPlace(placeRepository.getById(noteParam.getPlace().getId()));
        if (noteParam.getCorporate() != null)
            entity.setCorporate(corporateService.getEntityById(noteParam.getCorporate().getId()));
        if (noteParam.getUser() != null)
            entity.setUser(userRepository.getById(noteParam.getUser().getId()));
        if (noteParam.getSubscribe() != null)
            entity.setSubscribe(purchasedSubscribeRepository.getById(noteParam.getSubscribe().getId()));
        if (noteParam.getInvoice() != null)
            entity.setInvoice(invoiceService.getEntityById(noteParam.getInvoice().getId()));
        entity.setText(noteParam.getText());
        entity.setType(noteParam.getType());
        entity.setIsToDo(noteParam.getIsToDo());
        return NoteConvertor.toDto(manageNoteRepository.add(entity));
    }

    @Override
    public NoteDto update(@NonNull NoteParam noteParam) {
        ManageNoteEntity entity = manageNoteRepository.getById(noteParam.getId());
        entity.setIsToDo(noteParam.getIsToDo());
        return NoteConvertor.toDto(manageNoteRepository.update(entity));
    }

    @Override
    public NoteDto delete(@NonNull NoteParam noteParam) {
        ManageNoteEntity note = manageNoteRepository.getById(noteParam.getId());
        return NoteConvertor.toDto(manageNoteRepository.deleteById2(note));
    }

    @Override
    public NoteDto getById(long id) {
        return NoteConvertor.toDto(manageNoteRepository.getById(id));
    }

    @Override
    public ManageNoteEntity add(ManageNoteEntity entity) {
        return manageNoteRepository.add(entity);
    }

    @Override
    public ManageNoteEntity update(ManageNoteEntity entity) {
        return manageNoteRepository.update(entity);
    }

    @Override
    public ManageNoteEntity delete(ManageNoteEntity entity) {
        return manageNoteRepository.deleteById2(entity);
    }

    @Override
    public ManageNoteEntity getEntityById(long id) {
        return manageNoteRepository.getById(id);
    }

    @Override
    public List<ManageNoteEntity> getAll(Pageable pageable) {
        return manageNoteRepository.findAllUndeleted(pageable);
    }

    @Override
    public Page<ManageNoteEntity> findAll(Specification<ManageNoteEntity> specification, Pageable pageable) {
        return manageNoteRepository.findAll(specification, pageable);
    }

    @Override
    public List<NoteDto> convertToDtos(List<ManageNoteEntity> entities) {
        return entities.stream().map(NoteConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<NoteDto> convertToDtos(Page<ManageNoteEntity> entities) {
        return entities.map(NoteConvertor::toDto);
    }

    @Override
    public List<NoteDto> getByPlace(PlaceParam placeParam) {
        return convertToDtos(manageNoteRepository.findAllByPlaceIdAndDeletedIsFalse(placeParam.getId()));
    }

    @Override
    public List<NoteDto> getByCorporate(CorporateParam corporateParam) {
        return convertToDtos(manageNoteRepository.findAllByCorporateIdAndDeletedIsFalse(corporateParam.getId()));
    }

    @Override
    public List<NoteDto> getByInvoice(InvoiceParam corporateParam) {
        return convertToDtos(manageNoteRepository.findAllByInvoiceIdAndDeletedIsFalse(corporateParam.getId()));
    }

    @Override
    public List<NoteDto> getByUser(UserParam userParam) {
        return convertToDtos(manageNoteRepository.findAllByUserIdAndDeletedIsFalse(userParam.getId()));
    }

    @Override
    public List<NoteDto> getBySubscribe(PurchasedSubscribeParam purchasedSubscribeParam) {
        return convertToDtos(manageNoteRepository.findAllBySubscribeIdAndDeletedIsFalse(purchasedSubscribeParam.getId()));
    }
}
