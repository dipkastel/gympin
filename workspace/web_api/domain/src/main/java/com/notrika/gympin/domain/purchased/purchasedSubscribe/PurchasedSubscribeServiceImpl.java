package com.notrika.gympin.domain.purchased.purchasedSubscribe;

import com.notrika.gympin.common.finance.serial.enums.ProcessTypeEnum;
import com.notrika.gympin.common.place.personnel.enums.PlacePersonnelAccessEnum;
import com.notrika.gympin.common.place.personnel.enums.PlacePersonnelRoleEnum;
import com.notrika.gympin.common.purchased.purchased.enums.PurchasedType;
import com.notrika.gympin.common.purchased.purchased.param.UserPlacePurchasedParam;
import com.notrika.gympin.common.purchased.purchasedSubscribe.dto.PurchasedSubscribeDto;
import com.notrika.gympin.common.purchased.purchasedSubscribe.dto.PurchasedSubscribeScannedDto;
import com.notrika.gympin.common.purchased.purchasedSubscribe.enums.SubscribeEntryStatus;
import com.notrika.gympin.common.purchased.purchasedSubscribe.enums.SubscribePurchasedStatus;
import com.notrika.gympin.common.purchased.purchasedSubscribe.param.EntryMessageParam;
import com.notrika.gympin.common.purchased.purchasedSubscribe.param.IncreaseExpireParam;
import com.notrika.gympin.common.purchased.purchasedSubscribe.param.PurchasedSubscribeParam;
import com.notrika.gympin.common.purchased.purchasedSubscribe.query.PurchasedSubscribeQuery;
import com.notrika.gympin.common.purchased.purchasedSubscribe.service.PurchasedSubscribeService;
import com.notrika.gympin.common.settings.base.service.SettingsService;
import com.notrika.gympin.common.settings.context.GympinContext;
import com.notrika.gympin.common.settings.context.GympinContextHolder;
import com.notrika.gympin.common.settings.service.service.ServiceService;
import com.notrika.gympin.common.settings.sms.service.SmsInService;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util.exception.general.FunctionNotAvalable;
import com.notrika.gympin.common.util.exception.general.NotFoundException;
import com.notrika.gympin.common.util.exception.general.UserNotAllowedException;
import com.notrika.gympin.common.util.exception.purchased.*;
import com.notrika.gympin.common.util.exception.user.UnknownUserException;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.corporate.CorporateServiceImpl;
import com.notrika.gympin.domain.finance.peyments.CalculatePaymentsServiceImpl;
import com.notrika.gympin.domain.util.convertor.PurchasedSubscribeConvertor;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelCreditRepository;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelRepository;
import com.notrika.gympin.persistence.dao.repository.finance.FinanceSerialRepository;
import com.notrika.gympin.persistence.dao.repository.place.PlaceRepository;
import com.notrika.gympin.persistence.dao.repository.purchased.subscribe.PurchasedSubscribeEntryMessageRepository;
import com.notrika.gympin.persistence.dao.repository.purchased.subscribe.PurchasedSubscribeEntryRepository;
import com.notrika.gympin.persistence.dao.repository.purchased.subscribe.PurchasedSubscribeRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.subscribe.TicketSubscribeRepository;
import com.notrika.gympin.persistence.dao.repository.user.UserRepository;
import com.notrika.gympin.persistence.entity.finance.FinanceSerialEntity;
import com.notrika.gympin.persistence.entity.place.personnel.PlacePersonnelEntity;
import com.notrika.gympin.persistence.entity.purchased.PurchasedBaseEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntryEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeMessageEntity;
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

import static com.notrika.gympin.common.purchased.purchasedSubscribe.enums.SubscribePurchasedStatus.*;

@Service
public class PurchasedSubscribeServiceImpl extends AbstractBaseService<PurchasedSubscribeParam, PurchasedSubscribeDto, PurchasedSubscribeQuery, PurchasedSubscribeEntity> implements PurchasedSubscribeService {

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
    TicketSubscribeRepository ticketSubscribeRepository;
    @Autowired
    CalculatePaymentsServiceImpl calculatePaymetsService;
    @Autowired
    PurchasedSubscribeServiceHelper purchasedSubscribeHelper;
    @Autowired
    CorporatePersonnelRepository corporatePersonnelRepository;
    @Autowired
    PurchasedSubscribeRepository purchasedSubscribeRepository;
    @Autowired
    PurchasedSubscribeEntryRepository purchasedSubscribeEntryRepository;
    @Autowired
    CorporatePersonnelCreditRepository corporatePersonnelCreditRepository;
    @Autowired
    PurchasedSubscribeEntryMessageRepository purchasedSubscribeEntryMessageRepository;

    @Override
    @Transactional
    @Deprecated
    public PurchasedSubscribeDto add(@NonNull PurchasedSubscribeParam purchasedSubscribeParam) {
        throw new FunctionNotAvalable();
//        TicketSubscribeEntity ticketSubscribe = ticketSubscribeRepository.getById(purchasedSubscribeParam.getTicketSubscribe().getId());
//        UserEntity user = userRepository.getById(purchasedSubscribeParam.getUser().getId());
//        PurchasedSubscribeEntity entity = new PurchasedSubscribeEntity();
//
//        GympinContext context = GympinContextHolder.getContext();
//        if (context == null)
//            throw new UnknownUserException();
//        UserEntity userRequester = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);
//
//        if (!GeneralUtil.isGenderCompatible(ticketSubscribe.getGender(), user.getGender()))
//            throw new GenderIsNotCompatible();
//        entity.setStatus(READY_TO_ACTIVE);
//        entity.setTicketSubscribe(ticketSubscribe);
//        entity.setCustomer(user);
//        entity.setName(ticketSubscribe.getName());
//        entity.setSellPrice(ticketSubscribe.getPrice());
//        entity.setPlacePrice(ticketSubscribe.getPlacePrice());
//        entity.setDiscount(ticketSubscribe.getDiscount());
//        entity.setDescription(ticketSubscribe.getDescription());
//        entity.setEntryTotalCount(ticketSubscribe.getEntryTotalCount());
//        entity.setSubscribeStatus(ticketSubscribe.getSubscribeStatus());
//        entity.setTiming(ticketSubscribe.getTiming());
//        Date currentDate = new Date();
//        Calendar c = Calendar.getInstance();
//        c.setTime(currentDate);
//        c.add(Calendar.DATE, ticketSubscribe.getExpireDuration());
//        entity.setTicketSubscribeExpireDate(c.getTime());
//        entity.setExpireDate(c.getTime());
//
//        if (ticketSubscribe.getSubscribeCapacity() != null) {
//            var subscribeCount = ticketSubscribe.getSubscribeCapacity() - 1;
//            if (subscribeCount < 1) {
//                ticketSubscribe.setEnable(false);
//            }
//            ticketSubscribe.setSubscribeCapacity(subscribeCount);
//            ticketSubscribeRepository.update(ticketSubscribe);
//        }
//        return PurchasedSubscribeConvertor.toDto(purchasedSubscribeRepository.add(entity));
    }

    @Override
    public PurchasedSubscribeDto update(@NonNull PurchasedSubscribeParam purchasedSubscribeParam) {
        throw new FunctionNotAvalable();
    }


    @Override
    public PurchasedSubscribeDto delete(@NonNull PurchasedSubscribeParam purchasedSubscribeParam) {
        throw new FunctionNotAvalable();
//        PurchasedSubscribeEntity entity = purchasedSubscribeRepository.getById(purchasedSubscribeParam.getId());
//        if (entity.getTicketSubscribe().getSubscribeCapacity() != null) {
//            entity.getTicketSubscribe().setSubscribeCapacity(entity.getTicketSubscribe().getSubscribeCapacity() + 1);
//            ticketSubscribeRepository.update(entity.getTicketSubscribe());
//        }
//        return PurchasedSubscribeConvertor.toDto(purchasedSubscribeRepository.deleteById2(entity));
    }

    @Override
    public PurchasedSubscribeDto getById(long id) {
        return PurchasedSubscribeConvertor.toDto(getEntityById(id),settingsService);
    }

    @Override
    public PurchasedSubscribeEntity add(PurchasedSubscribeEntity entity) {
        throw new FunctionNotAvalable();
//        return purchasedSubscribeRepository.add(entity);
    }

    @Override
    public PurchasedSubscribeEntity update(PurchasedSubscribeEntity entity) {
        throw new FunctionNotAvalable();
//        return purchasedSubscribeRepository.update(entity);
    }

    @Override
    public PurchasedSubscribeEntity delete(PurchasedSubscribeEntity entity) {
        throw new FunctionNotAvalable();
//        return purchasedSubscribeRepository.deleteById2(entity);
    }

    @Override
    public PurchasedSubscribeEntity getEntityById(long id) {
        return purchasedSubscribeHelper.checkForExpire(purchasedSubscribeRepository.getById(id));
    }

    @Override
    public List<PurchasedSubscribeEntity> getAll(Pageable pageable) {
        return purchasedSubscribeRepository.findAllUndeleted(pageable).stream().map(purchasedSubscribeHelper::checkForExpire).map(purchasedSubscribeHelper::checkForExpire).collect(Collectors.toList());
    }

    @Override
    public Page<PurchasedSubscribeEntity> findAll(Specification<PurchasedSubscribeEntity> specification, Pageable pageable) {
        return purchasedSubscribeRepository.findAll(specification, pageable).map(purchasedSubscribeHelper::checkForExpire);
    }

    @Override
    public List<PurchasedSubscribeDto> convertToDtos(List<PurchasedSubscribeEntity> entities) {
        return entities.stream().filter(o->!o.isDeleted()).map(purchasedSubscribeHelper::checkForExpire).map(p->PurchasedSubscribeConvertor.toDto(p, settingsService)).collect(Collectors.toList());
    }

    @Override
    public Page<PurchasedSubscribeDto> convertToDtos(Page<PurchasedSubscribeEntity> entities) {
        return entities.map(purchasedSubscribeHelper::checkForExpire).map(p->PurchasedSubscribeConvertor.toDto(p, settingsService));
    }


    //ticket
    @Override
    public List<PurchasedSubscribeDto> getUserEnteredSubscribe(Long placeId) {
        List<PurchasedSubscribeEntity> subscribeEntities = purchasedSubscribeRepository.findSubscribesHasOpenEnterByPlaceId(placeId).stream().filter(o->!o.isDeleted()).map(purchasedSubscribeHelper::checkForExpire).filter(t -> purchasedSubscribeHelper.checkForAccess(t, placeId)).collect(Collectors.toList());
        return subscribeEntities.stream().filter(o->!o.isDeleted()).map(p->PurchasedSubscribeConvertor.toDto(p, settingsService)).collect(Collectors.toList());
    }

    @Override
    public List<PurchasedSubscribeDto> getUserSubscribesByPlace(UserPlacePurchasedParam param) {
        List<PurchasedSubscribeEntity> subscribeEntities = purchasedSubscribeRepository.getUserPlaceSubscribe(param.getUserId(), param.getPlaceId()).stream().filter(o->!o.isDeleted()).map(purchasedSubscribeHelper::checkForExpire).filter(f -> READY_TO_ACTIVE != f.getStatus()).collect(Collectors.toList());
        return convertToDtos(subscribeEntities);
    }

    @Override
    public List<PurchasedSubscribeDto> getActiveSubscribesOfPlace(Long placeId) {
        List<PurchasedSubscribeEntity> subscribeEntities = purchasedSubscribeRepository.getActiveSubscribeOfPlace(placeId).stream().filter(o->!o.isDeleted()).map(purchasedSubscribeHelper::checkForExpire).filter(t -> purchasedSubscribeHelper.checkForAccess(t, placeId)).collect(Collectors.toList());
        return convertToDtos(subscribeEntities);
    }


    @Override
    public List<PurchasedSubscribeDto> getPlaceSubscribes(Long placeId) {
        List<PurchasedSubscribeEntity> subscribeEntities = purchasedSubscribeRepository.findAllByPlaceIdAndDeletedFalse(placeId).stream().map(purchasedSubscribeHelper::checkForExpire).filter(t -> purchasedSubscribeHelper.checkForAccess(t, placeId)).collect(Collectors.toList());
        List<PurchasedSubscribeDto> result = convertToDtos(subscribeEntities);
        result = result.stream().filter(o->!o.isDeleted()).map(s -> {
            if (s.getStatus() == READY_TO_ACTIVE)
                return PurchasedSubscribeDto.builder().status(s.getStatus()).build();
            return s;
        }).collect(Collectors.toList());
        return result;
    }

    @Override
    public List<PurchasedSubscribeDto> getByUser(UserParam userParam) {
        return convertToDtos(purchasedSubscribeRepository.findAllByCustomerIdAndDeletedFalse(userParam.getId()));
    }

    @Override
    public PurchasedSubscribeDto getByKey(String key) {
        var ticket = purchasedSubscribeRepository.findByKey(key);
        if (!checkUserAccessToTicket(ticket))
            throw new UserNotAllowedException();
        return PurchasedSubscribeConvertor.toDto(purchasedSubscribeHelper.checkForExpire(ticket),settingsService);
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
            if (ticket.getPurchasedType() == PurchasedType.SUBSCRIBE && jointPlacePersonel.getPlacePersonnelAccess().stream().filter(o->!o.isDeleted()).filter(ppa -> ppa.getSection() == PlacePersonnelAccessEnum.SubscribeDetail).findFirst().get().getAccess())
                return true;
            return false;
        } catch (Exception e) {
            return false;
        }
    }

    //ticketAction
    @Override
    @Transactional
    public Boolean increaseExpireDate(IncreaseExpireParam param) {
        PurchasedSubscribeEntity subscribeEntity = purchasedSubscribeRepository.getById(param.getSubscribeId());
        if (param.getIncreaseDayCount() > 0) {
            Calendar c = Calendar.getInstance();
            c.setTime(subscribeEntity.getExpireDate());
            c.add(Calendar.DATE, param.getIncreaseDayCount());
            subscribeEntity.setExpireDate(c.getTime());
            subscribeEntity.setStatus(ACTIVE);
        }
        if (param.getChangeDate() != null) {
            subscribeEntity.setExpireDate(param.getChangeDate());
            subscribeEntity.setStatus(ACTIVE);
        }
        purchasedSubscribeRepository.update(subscribeEntity);
        purchasedSubscribeHelper.checkForExpire(subscribeEntity);
        return true;
    }

    @Override
    public PurchasedSubscribeDto updateStatus(PurchasedSubscribeParam param) {
        //TODO check usage for sqx
        PurchasedSubscribeEntity subscribeEntity = getEntityById(param.getId());
        subscribeEntity.setStatus(param.getStatus());
        purchasedSubscribeRepository.update(subscribeEntity);
        return PurchasedSubscribeConvertor.toDto(subscribeEntity,settingsService);
    }

    //messages
    @Override
    @Transactional
    public PurchasedSubscribeScannedDto addEntryMessage(EntryMessageParam param) {
        PurchasedSubscribeEntryEntity psubscribeEntryEntity = purchasedSubscribeEntryRepository.getById(param.getEntryId());
        PurchasedSubscribeMessageEntity messageEntity = PurchasedSubscribeMessageEntity
                .builder()
                .subscribeEntry(psubscribeEntryEntity)
                .message(param.getMessage())
                .build();
        purchasedSubscribeEntryMessageRepository.add(messageEntity);
        PurchasedSubscribeEntity psubscribe = purchasedSubscribeRepository.getById(psubscribeEntryEntity.getPurchasedSubscribe().getId());
        PurchasedSubscribeScannedDto result = PurchasedSubscribeConvertor.toScannedDto(psubscribe);
        result.setSubscribeEntry(PurchasedSubscribeConvertor.toDto(psubscribeEntryEntity));
        return result;
    }

    @Override
    public Boolean deleteEntryMessage(Long messageId) {
        PurchasedSubscribeMessageEntity message = purchasedSubscribeEntryMessageRepository.getById(messageId);
        purchasedSubscribeEntryMessageRepository.deleteById2(message);
        return true;
    }

    //enter

    @Override
    public PurchasedSubscribeDto addEnterToSubscribe(PurchasedSubscribeParam param) {

        PurchasedSubscribeEntity subscribeEntity = getEntityById(param.getId());
        UserEntity userEntity = userRepository.getById(param.getUser().getId());

        //checks
        if (subscribeEntity.getStatus() == EXPIRE) {
            throw new PurchasedExpiredException();
        } else if (subscribeEntity.getStatus() == SubscribePurchasedStatus.COMPLETE) {
            throw new UsageLimitException();
        } else if (subscribeEntity.getStatus() == SubscribePurchasedStatus.CANCEL) {
            throw new PurchasedCanceledException();
        } else if (subscribeEntity.getStatus() == SubscribePurchasedStatus.PROCESSING) {
            throw new IsInProcessException();
        }

        if (subscribeEntity.getStatus() == SubscribePurchasedStatus.READY_TO_ACTIVE) {

            var serial = financeSerialRepository.add(FinanceSerialEntity.builder()
                    .serial(java.util.UUID.randomUUID().toString())
                    .processTypeEnum(ProcessTypeEnum.TRA_USE_TICKET)
                    .build());
            //peyToPlace
            calculatePaymetsService.PayToPlace(subscribeEntity, serial);


            //enterUser
            subscribeEntity.setStatus(SubscribePurchasedStatus.ACTIVE);
            subscribeEntity.getSerials().add(serial);
            purchasedSubscribeRepository.update(subscribeEntity);
            purchasedSubscribeHelper.enterUser(subscribeEntity, userEntity);

        } else if (subscribeEntity.getStatus() == SubscribePurchasedStatus.ACTIVE) {
            //requeset check
            if (subscribeEntity.getEntryList().stream().filter(o->!o.isDeleted()).anyMatch(t -> t.getSubscribeEntryStatus() == SubscribeEntryStatus.REQUESTED)) {
                throw new UserRequestEnterException();
            }
            //avoid duplicate enery
            if (subscribeEntity.getEntryList().get(subscribeEntity.getEntryList().size() - 1).getExitDate() == null) {
                throw new EntryAlreadyExistException();
            }
            //subscribe limit
            if (subscribeEntity.getEntryTotalCount() <= subscribeEntity.getEntryList().stream().filter(o->!o.isDeleted()).filter(en -> en.getSubscribeEntryStatus() == SubscribeEntryStatus.ACCEPTED).count()) {
                throw new UsageLimitException();
            }
            //enter User
            purchasedSubscribeHelper.enterUser(subscribeEntity, userEntity);
        }
        return PurchasedSubscribeConvertor.toDto(subscribeEntity,settingsService);

    }

    @Override
    public List<PurchasedSubscribeDto> getEnterRequestedSubscribe(Long placeId) {
        List<PurchasedSubscribeEntity> subscribeEntities = purchasedSubscribeRepository.findRequestedSubescribeByPlaceId(placeId);
        return convertToDtos(subscribeEntities);
    }

    @Override
    @Transactional
    public Boolean acceptEnterRequested(PurchasedSubscribeParam param) throws Exception {
        PurchasedSubscribeEntity subscribeEntity = getEntityById(param.getId());
        UserEntity userEntity = userRepository.getById(param.getUser().getId());
        PurchasedSubscribeEntryEntity entry = subscribeEntity.getEntryList().stream().filter(o->!o.isDeleted()).filter(e -> e.getSubscribeEntryStatus() == SubscribeEntryStatus.REQUESTED).findFirst().get();
        if (entry == null)
            throw new NotFoundException();

        //check subscribe Limit
        if (subscribeEntity.getEntryTotalCount() <= subscribeEntity.getEntryList().stream().filter(en -> en.getSubscribeEntryStatus() == SubscribeEntryStatus.ACCEPTED).count()) {
            throw new UsageLimitException();
        }

        entry.setSubscribeEntryStatus(SubscribeEntryStatus.ACCEPTED);
        entry.setEnterDate(new Date());
        entry.setAcceptedBy(userEntity);
        purchasedSubscribeEntryRepository.update(entry);
        return true;
    }

    @Override
    @Transactional
    public Boolean enterRequest(PurchasedSubscribeParam param) {
        PurchasedSubscribeEntity psubscribeEntity = getEntityById(param.getId());
        UserEntity userEntity = userRepository.getById(param.getUser().getId());

        if (psubscribeEntity.getStatus() != ACTIVE) {
            throw new IsNotActiveException();
        }

        var userSubscribes = purchasedSubscribeRepository.findAllByCustomerIdAndDeletedFalse(userEntity.getId());
        var unEnterdSubscribe = userSubscribes.stream().anyMatch(ps -> ps.getEntryList().stream().filter(o->!o.isDeleted()).anyMatch(e -> e.getSubscribeEntryStatus() == SubscribeEntryStatus.REQUESTED));
        if (unEnterdSubscribe)
            throw new UserRequestEnterException();
        if (psubscribeEntity.getEntryList().size() > 0) {
            var lastEnter = psubscribeEntity.getEntryList().get(psubscribeEntity.getEntryList().size() - 1);
            if (lastEnter.getExitDate() == null) {
                throw new EntryAlreadyExistException();
            }
        } else {
            throw new FirstEntryRequestException();
        }
        if (psubscribeEntity.getEntryTotalCount() <= psubscribeEntity.getEntryList().stream().filter(o->!o.isDeleted()).filter(en -> en.getSubscribeEntryStatus() == SubscribeEntryStatus.ACCEPTED).count()) {
            throw new UsageLimitException();
        }
        PurchasedSubscribeEntryEntity psubscribeEntryEntity = PurchasedSubscribeEntryEntity.builder().subscribeEntryStatus(SubscribeEntryStatus.REQUESTED).enterDate(new Date()).purchasedSubscribe(psubscribeEntity).build();
        purchasedSubscribeEntryRepository.add(psubscribeEntryEntity);
        return true;
    }


    @Override
    public Boolean exitRequest(Long id) {
        PurchasedSubscribeEntryEntity subscribeEntry = purchasedSubscribeEntryRepository.getById(id);

        GympinContext context = GympinContextHolder.getContext();
        if (context == null)
            throw new UnknownUserException();
        UserEntity userEntity = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);


        if (!subscribeEntry.getPurchasedSubscribe().getCustomer().getId().equals(userEntity.getId()))
            throw new UnknownUserException();


        purchasedSubscribeHelper.exitUserFromPlace(subscribeEntry);


        return true;
    }


    @Override
    public Boolean exitUserOfPlace(Long id) {
        PurchasedSubscribeEntryEntity subscribeEntry = purchasedSubscribeEntryRepository.getById(id);
        purchasedSubscribeHelper.exitUserFromPlace(subscribeEntry);
        return true;
    }


}
