package com.notrika.gympin.domain.purchased.purchasedAppointment;

import com.notrika.gympin.common.place.parts.personnel.enums.PlacePersonnelAccessEnum;
import com.notrika.gympin.common.place.parts.personnel.enums.PlacePersonnelRoleEnum;
import com.notrika.gympin.common.purchased.purchased.enums.PurchasedType;
import com.notrika.gympin.common.purchased.purchased.param.UserPlacePurchasedParam;
import com.notrika.gympin.common.purchased.purchasedAppointment.dto.PurchasedAppointmentDto;
import com.notrika.gympin.common.purchased.purchasedAppointment.param.PurchasedAppointmentParam;
import com.notrika.gympin.common.purchased.purchasedAppointment.query.PurchasedAppointmentQuery;
import com.notrika.gympin.common.purchased.purchasedAppointment.service.PurchasedAppointmentService;
import com.notrika.gympin.common.purchased.purchasedSubscribe.dto.PurchasedSubscribeDto;
import com.notrika.gympin.common.settings.base.service.SettingsService;
import com.notrika.gympin.common.settings.context.GympinContext;
import com.notrika.gympin.common.settings.context.GympinContextHolder;
import com.notrika.gympin.common.settings.sms.service.SmsInService;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util.exception.general.FunctionNotAvalable;
import com.notrika.gympin.common.util.exception.general.UserNotAllowedException;
import com.notrika.gympin.common.util.exception.purchased.*;
import com.notrika.gympin.common.util.exception.user.UnknownUserException;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.corporate.CorporateServiceImpl;
import com.notrika.gympin.domain.finance.peyments.CalculatePaymentsServiceImpl;
import com.notrika.gympin.domain.util.convertor.PurchasedAppointmentConvertor;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelCreditRepository;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceSerialRepository;
import com.notrika.gympin.persistence.dao.repository.place.PlaceRepository;
import com.notrika.gympin.persistence.dao.repository.purchased.appointment.PurchasedAppointmentRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.appointment.TicketAppointmentRepository;
import com.notrika.gympin.persistence.dao.repository.user.UserRepository;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelEntity;
import com.notrika.gympin.persistence.entity.purchased.PurchasedBaseEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedAppointment.PurchasedAppointmentEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.notrika.gympin.common.purchased.purchasedAppointment.enums.AppointmentPurchasedStatus.*;

@Service
public class PurchasedAppointmentServiceImpl extends AbstractBaseService<PurchasedAppointmentParam, PurchasedAppointmentDto, PurchasedAppointmentQuery, PurchasedAppointmentEntity> implements PurchasedAppointmentService {

    @Autowired
    SmsInService smsService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PlaceRepository placeRepository;
    @Autowired
    SettingsService settingsService;
    @Autowired
    CorporateServiceImpl corporateService;
    @Autowired
    FinanceSerialRepository financeSerialRepository;
    @Autowired
    TicketAppointmentRepository ticketAppointmentRepository;
    @Autowired
    CalculatePaymentsServiceImpl calculatePaymetsService;
    @Autowired
    PurchasedAppointmentServiceHelper purchasedAppointmentHelper;
    @Autowired
    CorporatePersonnelRepository corporatePersonnelRepository;
    @Autowired
    PurchasedAppointmentRepository purchasedAppointmentRepository;
    @Autowired
    CorporatePersonnelCreditRepository corporatePersonnelCreditRepository;

    @Override
    @Transactional
    @Deprecated
    public PurchasedAppointmentDto add(@NonNull PurchasedAppointmentParam purchasedAppointmentParam) {
        throw new FunctionNotAvalable();
    }

    @Override
    public PurchasedAppointmentDto update(@NonNull PurchasedAppointmentParam purchasedAppointmentParam) {
        throw new FunctionNotAvalable();
    }


    @Override
    public PurchasedAppointmentDto delete(@NonNull PurchasedAppointmentParam purchasedAppointmentParam) {
        throw new FunctionNotAvalable();
    }

    @Override
    public PurchasedAppointmentDto getById(long id) {
        return PurchasedAppointmentConvertor.toDto(getEntityById(id),settingsService);
    }

    @Override
    public PurchasedAppointmentEntity add(PurchasedAppointmentEntity entity) {
        throw new FunctionNotAvalable();
    }

    @Override
    public PurchasedAppointmentEntity update(PurchasedAppointmentEntity entity) {
        throw new FunctionNotAvalable();
//        return purchasedAppointmentRepository.update(entity);
    }

    @Override
    public PurchasedAppointmentEntity delete(PurchasedAppointmentEntity entity) {
        throw new FunctionNotAvalable();
//        return purchasedAppointmentRepository.deleteById2(entity);
    }

    @Override
    public PurchasedAppointmentEntity getEntityById(long id) {
        return purchasedAppointmentHelper.checkForExpire(purchasedAppointmentRepository.getById(id));
    }

    @Override
    public List<PurchasedAppointmentEntity> getAll(Pageable pageable) {
        return purchasedAppointmentRepository.findAllUndeleted(pageable).stream().map(purchasedAppointmentHelper::checkForExpire).map(purchasedAppointmentHelper::checkForExpire).collect(Collectors.toList());
    }

    @Override
    public Page<PurchasedAppointmentEntity> findAll(Specification<PurchasedAppointmentEntity> specification, Pageable pageable) {
        return purchasedAppointmentRepository.findAll(specification, pageable).map(purchasedAppointmentHelper::checkForExpire);
    }

    @Override
    public List<PurchasedAppointmentDto> convertToDtos(List<PurchasedAppointmentEntity> entities) {
        return entities.stream().filter(o->!o.isDeleted()).map(purchasedAppointmentHelper::checkForExpire).map(p->PurchasedAppointmentConvertor.toDto(p, settingsService)).collect(Collectors.toList());
    }

    @Override
    public Page<PurchasedAppointmentDto> convertToDtos(Page<PurchasedAppointmentEntity> entities) {
        return entities.map(purchasedAppointmentHelper::checkForExpire).map(p->PurchasedAppointmentConvertor.toDto(p, settingsService));
    }

    @Override
    public List<PurchasedAppointmentDto> getUserAppointmentByPlace(UserPlacePurchasedParam param) {
        List<PurchasedAppointmentEntity> appointmentEntities = purchasedAppointmentRepository.getUserPlaceAppointment(param.getUserId(), param.getPlaceId()).stream().filter(o->!o.isDeleted()).map(purchasedAppointmentHelper::checkForExpire).filter(f -> READY_TO_ACTIVE != f.getStatus()).collect(Collectors.toList());
        return convertToDtos(appointmentEntities);
    }


    @Override
    public List<PurchasedAppointmentDto> getActiveAppointmentOfPlace(Long placeId) {
        List<PurchasedAppointmentEntity> appointmentEntities = purchasedAppointmentRepository.getActiveAppointmentOfPlace(placeId).stream().filter(o->!o.isDeleted()).map(purchasedAppointmentHelper::checkForExpire).filter(t -> purchasedAppointmentHelper.checkForAccess(t, placeId)).collect(Collectors.toList());
        return convertToDtos(appointmentEntities);
    }


    @Override
    public List<PurchasedAppointmentDto> getPlaceAppointments(Long placeId) {
        List<PurchasedAppointmentEntity> appointmentEntities = purchasedAppointmentRepository.findAllByPlaceIdAndDeletedFalse(placeId).stream().map(purchasedAppointmentHelper::checkForExpire).filter(t -> purchasedAppointmentHelper.checkForAccess(t, placeId)).collect(Collectors.toList());
        List<PurchasedAppointmentDto> result = convertToDtos(appointmentEntities);
        result = result.stream().filter(o->!o.isDeleted()).map(s -> {
            if (s.getStatus() == READY_TO_ACTIVE)
                return PurchasedAppointmentDto.builder().status(s.getStatus()).build();
            return s;
        }).collect(Collectors.toList());
        return result;
    }

    @Override
    public Long getPlaceSellsAppointmentsCount(Long placeId) {
        List<PurchasedAppointmentEntity> appointmentEntities = purchasedAppointmentRepository.findAllByPlaceIdAndDeletedFalse(placeId).stream().map(purchasedAppointmentHelper::checkForExpire).filter(t -> purchasedAppointmentHelper.checkForAccess(t, placeId)).collect(Collectors.toList());
        return appointmentEntities.stream().filter(se->se.getStatus()==ACTIVE||se.getStatus()==EXPIRE||se.getStatus()==COMPLETE).count();
    }

    @Override
    public List<PurchasedAppointmentDto> getByUser(UserParam userParam) {
        return convertToDtos(purchasedAppointmentRepository.findAllByCustomerIdAndDeletedFalse(userParam.getId()));
    }

    @Override
    public PurchasedAppointmentDto getByKey(String key) {
        var ticket = purchasedAppointmentRepository.findByKey(key);
        if (!checkUserAccessToTicket(ticket))
            throw new UserNotAllowedException();
        return PurchasedAppointmentConvertor.toDto(purchasedAppointmentHelper.checkForExpire(ticket),settingsService);
    }

    private boolean checkUserAccessToTicket(PurchasedBaseEntity ticket) {
        try {
            GympinContext context = GympinContextHolder.getContext();
            if (context == null)
                throw new UnknownUserException();
            UserEntity userEntity = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);
            if (Objects.equals(userEntity.getId(), ticket.getCustomer().getId()))
                return true;
            PlacePersonnelEntity jointPlacePersonel = userEntity.getPlacePersonnel().stream().filter(pp -> pp.getPlace().getId().equals(ticket.getPlace().getId())&&!pp.isDeleted()).findFirst().orElse(null);
            if (jointPlacePersonel == null)
                throw new UserNotAllowedException();
            if (jointPlacePersonel.getPlacePersonnelRoles().stream().filter(o->!o.isDeleted()).map(r->r.getRole()).collect(Collectors.toList()).contains(PlacePersonnelRoleEnum.PLACE_OWNER))
                return true;
            if (ticket.getPurchasedType() == PurchasedType.APPOINTMENT && jointPlacePersonel.getPlacePersonnelAccess().stream().filter(o->!o.isDeleted()).filter(ppa -> ppa.getSection() == PlacePersonnelAccessEnum.AppointmentDetail).findFirst().get().getAccess())
                return true;
            return false;
        } catch (Exception e) {
            return false;
        }
    }


    @Override
    public PurchasedAppointmentDto updateStatus(PurchasedAppointmentParam param) {
        //TODO check usage for sqx
        PurchasedAppointmentEntity appointmentEntity = getEntityById(param.getId());
        appointmentEntity.setStatus(param.getStatus());
        purchasedAppointmentRepository.update(appointmentEntity);
        return PurchasedAppointmentConvertor.toDto(appointmentEntity,settingsService);
    }

    @Override
    public PurchasedAppointmentDto refundTicket(PurchasedAppointmentParam param) {

        PurchasedAppointmentEntity appointmentEntity = getEntityById(param.getId());
        UserEntity userEntity = appointmentEntity.getCustomer();

        //checks
        if (appointmentEntity.getStatus() == EXPIRE) {
            throw new PurchasedExpiredException();
        } else if (appointmentEntity.getStatus() == CANCEL) {
            throw new PurchasedCanceledException();
        } else if (appointmentEntity.getStatus() == REFUNDED ) {
            throw new PurchasedCanceledException();
        } else if (appointmentEntity.getStatus() == RESERVED ) {
            throw new IsReservedException();
        }

            //refundTicket
            purchasedAppointmentHelper.RefundedAppointment(appointmentEntity);


        return PurchasedAppointmentConvertor.toDto(appointmentEntity,settingsService);
    }



}
