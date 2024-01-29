package com.notrika.gympin.domain.purchased.purchasedSubscribe;

import com.notrika.gympin.common.purchased.purchasedSubscribe.enums.SubscribeEntryStatus;
import com.notrika.gympin.common.purchased.purchasedSubscribe.dto.PurchasedSubscribeDto;
import com.notrika.gympin.common.purchased.purchasedSubscribe.dto.PurchasedSubscribeScannedDto;
import com.notrika.gympin.common.purchased.purchasedSubscribe.enums.SubscribePurchasedStatus;
import com.notrika.gympin.common.purchased.purchasedSubscribe.param.EntryMessageParam;
import com.notrika.gympin.common.purchased.purchasedSubscribe.param.IncreaseExpireParam;
import com.notrika.gympin.common.purchased.purchasedSubscribe.param.PurchasedSubscribeParam;
import com.notrika.gympin.common.purchased.purchased.param.UserPlacePurchasedParam;
import com.notrika.gympin.common.purchased.purchasedSubscribe.query.PurchasedSubscribeQuery;
import com.notrika.gympin.common.purchased.purchasedSubscribe.service.PurchasedSubscribeService;
import com.notrika.gympin.common.settings.context.GympinContext;
import com.notrika.gympin.common.settings.context.GympinContextHolder;
import com.notrika.gympin.common.settings.sms.service.SmsService;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util.GeneralUtil;
import com.notrika.gympin.common.util.exception.general.NotFoundException;
import com.notrika.gympin.common.util.exception.purchased.*;
import com.notrika.gympin.common.util.exception.user.UnknownUserException;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.corporate.CorporateServiceImpl;
import com.notrika.gympin.domain.finance.peyments.CalculatePaymentsServiceImpl;
import com.notrika.gympin.domain.util.convertor.PurchasedSubscribeConvertor;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelCreditRepository;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelRepository;
import com.notrika.gympin.persistence.dao.repository.place.PlaceRepository;
import com.notrika.gympin.persistence.dao.repository.purchased.subscribe.PurchasedSubscribeEntryMessageRepository;
import com.notrika.gympin.persistence.dao.repository.purchased.subscribe.PurchasedSubscribeEntryRepository;
import com.notrika.gympin.persistence.dao.repository.purchased.subscribe.PurchasedSubscribeRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.subscribe.TicketSubscribeRepository;
import com.notrika.gympin.persistence.dao.repository.user.UserRepository;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeEntryEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedSubscribe.PurchasedSubscribeMessageEntity;
import com.notrika.gympin.persistence.entity.ticket.subscribe.TicketSubscribeEntity;
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
import java.util.stream.Collectors;

import static com.notrika.gympin.common.purchased.purchasedSubscribe.enums.SubscribePurchasedStatus.*;

@Service
public class PurchasedSubscribeServiceImpl extends AbstractBaseService<PurchasedSubscribeParam, PurchasedSubscribeDto, PurchasedSubscribeQuery, PurchasedSubscribeEntity> implements PurchasedSubscribeService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    TicketSubscribeRepository ticketSubscribeRepository;
    @Autowired
    PurchasedSubscribeRepository purchasedSubscribeRepository;
    @Autowired
    PurchasedSubscribeEntryMessageRepository purchasedSubscribeEntryMessageRepository;
    @Autowired
    PurchasedSubscribeEntryRepository purchasedSubscribeEntryRepository;
    @Autowired
    PlaceRepository placeRepository;
    @Autowired
    CorporatePersonnelRepository corporatePersonnelRepository;
    @Autowired
    CorporateServiceImpl corporateService;
    @Autowired
    CorporatePersonnelCreditRepository corporatePersonnelCreditRepository;
    @Autowired
    SmsService smsService;
    @Autowired
    CalculatePaymentsServiceImpl calculatePaymetsService;

    @Autowired
    PurchasedSubscribeServiceHelper purchasedSubscribeHelper;

    @Override
    @Transactional
    @Deprecated
    public PurchasedSubscribeDto add(@NonNull PurchasedSubscribeParam purchasedSubscribeParam) {
        //TODO this cannot be exist
        TicketSubscribeEntity ticketSubscribe = ticketSubscribeRepository.getById(purchasedSubscribeParam.getTicketSubscribe().getId());
        UserEntity user = userRepository.getById(purchasedSubscribeParam.getUser().getId());
        PurchasedSubscribeEntity entity = new PurchasedSubscribeEntity();

        GympinContext context = GympinContextHolder.getContext();
        if (context == null)
            throw new UnknownUserException();
        UserEntity userRequester = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);

        if (!GeneralUtil.isGenderCompatible(ticketSubscribe.getGender(), user.getGender()))
            throw new GenderIsNotCompatible();
        entity.setStatus(READY_TO_ACTIVE);
        entity.setTicketSubscribe(ticketSubscribe);
        entity.setCustomer(user);
        entity.setName(ticketSubscribe.getName());
        entity.setSellPrice(ticketSubscribe.getPrice());
        entity.setPlacePrice(ticketSubscribe.getPlacePrice());
        entity.setDiscount(ticketSubscribe.getDiscount());
        entity.setDescription(ticketSubscribe.getDescription());
        entity.setEntryTotalCount(ticketSubscribe.getEntryTotalCount());
        Date currentDate = new Date();
        Calendar c = Calendar.getInstance();
        c.setTime(currentDate);
        c.add(Calendar.DATE, ticketSubscribe.getExpireDuration());
        entity.setTicketSubscribeExpireDate(c.getTime());
        entity.setExpireDate(c.getTime());

        if (ticketSubscribe.getSubscribeCapacity() != null) {
            var subscribeCount = ticketSubscribe.getSubscribeCapacity() - 1;
            if (subscribeCount < 1) {
                ticketSubscribe.setEnable(false);
            }
            ticketSubscribe.setSubscribeCapacity(subscribeCount);
            ticketSubscribeRepository.update(ticketSubscribe);
        }
        return PurchasedSubscribeConvertor.toDto(purchasedSubscribeRepository.add(entity));
    }

    @Override
    public PurchasedSubscribeDto update(@NonNull PurchasedSubscribeParam purchasedSubscribeParam) {
        return null;
    }


    @Override
    public PurchasedSubscribeDto delete(@NonNull PurchasedSubscribeParam purchasedSubscribeParam) {
        PurchasedSubscribeEntity entity = purchasedSubscribeRepository.getById(purchasedSubscribeParam.getId());
        if (entity.getTicketSubscribe().getSubscribeCapacity() != null) {
            entity.getTicketSubscribe().setSubscribeCapacity(entity.getTicketSubscribe().getSubscribeCapacity() + 1);
            ticketSubscribeRepository.update(entity.getTicketSubscribe());
        }
        return PurchasedSubscribeConvertor.toDto(purchasedSubscribeRepository.deleteById2(entity));
    }

    @Override
    public PurchasedSubscribeDto getById(long id) {
        return PurchasedSubscribeConvertor.toDto(purchasedSubscribeRepository.getById(id));
    }

    @Override
    public PurchasedSubscribeEntity add(PurchasedSubscribeEntity entity) {
        return purchasedSubscribeRepository.add(entity);
    }

    @Override
    public PurchasedSubscribeEntity update(PurchasedSubscribeEntity entity) {
        return purchasedSubscribeRepository.update(entity);
    }

    @Override
    public PurchasedSubscribeEntity delete(PurchasedSubscribeEntity entity) {
        return purchasedSubscribeRepository.deleteById2(entity);
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
        return entities.stream().map(purchasedSubscribeHelper::checkForExpire).map(PurchasedSubscribeConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<PurchasedSubscribeDto> convertToDtos(Page<PurchasedSubscribeEntity> entities) {
        return entities.map(purchasedSubscribeHelper::checkForExpire).map(PurchasedSubscribeConvertor::toDto);
    }


    @Override
    @Transactional
    @Deprecated
    public PurchasedSubscribeScannedDto scannedSubscribe(PurchasedSubscribeParam param) throws Exception {
        //TODO this cannot be exist
//        PurchasedSubscribeEntity subscribeEntity = getEntityById(param.getId());
//        PurchasedSubscribeScannedDto purchasedSubscribeScannedDto = PurchasedSubscribeConvertor.toScannedDto(subscribeEntity);
//        GympinContext context = GympinContextHolder.getContext();
//        if (context == null)
//            throw new UnknownUserException();
//        UserEntity userEntity = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);
//
////        if (subscribeEntity.getStatus() == SubscribePurchasedStatus.PAYMENT_WAIT) {
////            throw new NotPayedException();
////        } else
//        if (subscribeEntity.getStatus() == SubscribePurchasedStatus.READY_TO_ACTIVE) {
//            if (!userEntity.getPlacePersonnel().stream().map(p -> p.getPlace().getId()).anyMatch(p -> p.equals(subscribeEntity.getTicketSubscribe().getPlace().getId())))
//                throw new OwnedByOtherPlaceException();
//            //check for user registerd in place before
//            List<PurchasedSubscribeEntity> userPlaceSubscribes = purchasedSubscribeRepository.getUserPlaceSubscribe(subscribeEntity.getCustomer().getId(), subscribeEntity.getTicketSubscribe().getPlace().getId());
//            if (userPlaceSubscribes.stream().anyMatch(p -> (p.getStatus() == SubscribePurchasedStatus.ACTIVE) || (p.getStatus() == SubscribePurchasedStatus.COMPLETE) || (p.getStatus() == EXPIRE))) {
//                //user Has subscribe From this place Before
//                purchasedSubscribeScannedDto.setUserPlaceStatus(PurchasedSubscribeUserPlaceStatus.REGISTER_BEFORE);
//            } else {
//                //new user for Place
//                purchasedSubscribeScannedDto.setUserPlaceStatus(PurchasedSubscribeUserPlaceStatus.NEW_USER);
//            }
//            //activate user
//            subscribeEntity.setStatus(SubscribePurchasedStatus.ACTIVE);
//            purchasedSubscribeRepository.update(subscribeEntity);
//        } else if (subscribeEntity.getStatus() == EXPIRE) {
//            throw new PurchasedExpiredException();
//        } else if (subscribeEntity.getStatus() == SubscribePurchasedStatus.COMPLETE) {
//            throw new UsageLimitException();
//        } else if (subscribeEntity.getStatus() == SubscribePurchasedStatus.CANCEL) {
//            throw new PurchasedCanceledException();
//        } else if (subscribeEntity.getStatus() == SubscribePurchasedStatus.PROCESSING) {
//            throw new IsInProcessException();
//        } else if (subscribeEntity.getStatus() == SubscribePurchasedStatus.ACTIVE) {
//            //requeset check
//            if (subscribeEntity.getEntryList().stream().anyMatch(t -> t.getSubscribeEntryStatus() == SubscribeEntryStatus.REQUESTED)) {
//                throw new UserRequestEnterException();
//            }
//            //canuserScan this subscribe?
//            if (!userEntity.getPlacePersonnel().stream().map(p -> p.getPlace().getId()).anyMatch(p -> p.equals(subscribeEntity.getTicketSubscribe().getPlace().getId())))
//                throw new OwnedByOtherPlaceException();
//            //user Enter
//            //avoid duplicate enery
//            if (subscribeEntity.getEntryList().size() > 0) {
//                var lastEnter = subscribeEntity.getEntryList().get(subscribeEntity.getEntryList().size() - 1);
//                if (lastEnter.getExitDate() == null) {
//                    throw new EntryAlreadyExistException();
//                }
//            } else {
//                //calculate pay to place
//                calculatePaymetsService.PayToPlace(subscribeEntity);
//            }
//            if (subscribeEntity.getEntryTotalCount() <= subscribeEntity.getEntryList().stream().filter(en -> en.getSubscribeEntryStatus() == SubscribeEntryStatus.ACCEPTED).count()) {
//                throw new UsageLimitException();
//            }
//            PurchasedSubscribeEntryEntity psubscribeEntryEntity = PurchasedSubscribeEntryEntity.builder()
//                    .subscribeEntryStatus(SubscribeEntryStatus.ACCEPTED)
//                    .purchasedSubscribe(subscribeEntity)
//                    .enterDate(new Date())
//                    .acceptedBy(userEntity)
//                    .build();
//            purchasedSubscribeEntryRepository.add(psubscribeEntryEntity);
//            purchasedSubscribeScannedDto.setSubscribeEntry(PurchasedSubscribeEntryDto.builder().id(psubscribeEntryEntity.getId()).enterDate(psubscribeEntryEntity.getEnterDate()).build());
//        }
//        return purchasedSubscribeScannedDto;
        return null;
    }


    //ticket
    @Override
    public List<PurchasedSubscribeDto> getUserEnteredSubscribe(Long placeId) {
        List<PurchasedSubscribeEntity> subscribeEntities = purchasedSubscribeRepository.findSubscribesHasOpenEnterByPlaceId(placeId).stream().map(purchasedSubscribeHelper::checkForExpire).filter(t -> purchasedSubscribeHelper.checkForAccess(t, placeId)).collect(Collectors.toList());
        return subscribeEntities.stream().map(PurchasedSubscribeConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public List<PurchasedSubscribeDto> getUserSubscribesByPlace(UserPlacePurchasedParam param) {
        List<PurchasedSubscribeEntity> subscribeEntities = purchasedSubscribeRepository.getUserPlaceSubscribe(param.getUserId(), param.getPlaceId()).stream().map(purchasedSubscribeHelper::checkForExpire).filter(f -> READY_TO_ACTIVE != f.getStatus()).collect(Collectors.toList());
        return convertToDtos(subscribeEntities);
    }

    @Override
    public List<PurchasedSubscribeDto> getActiveSubscribesOfPlace(Long placeId) {
        List<PurchasedSubscribeEntity> subscribeEntities = purchasedSubscribeRepository.getActiveSubscribeOfPlace(placeId).stream().map(purchasedSubscribeHelper::checkForExpire).filter(t -> purchasedSubscribeHelper.checkForAccess(t, placeId)).collect(Collectors.toList());
        return convertToDtos(subscribeEntities);
    }

    @Override
    public List<PurchasedSubscribeDto> getByUser(UserParam userParam) {
        return convertToDtos(purchasedSubscribeRepository.findAllByCustomerIdAndDeletedFalse(userParam.getId()));
    }

    //ticketAction
    @Override
    public Boolean increaseExpireDate(IncreaseExpireParam param) {
        PurchasedSubscribeEntity subscribeEntity = purchasedSubscribeRepository.getById(param.getSubscribeId());
        if (param.getIncreaseDayCount() > 0) {
            Calendar c = Calendar.getInstance();
            c.setTime(subscribeEntity.getExpireDate());
            c.add(Calendar.DATE, param.getIncreaseDayCount());
            subscribeEntity.setExpireDate(c.getTime());
        }
        if (param.getChangeDate() != null) {
            subscribeEntity.setExpireDate(param.getChangeDate());
        }
        purchasedSubscribeRepository.update(subscribeEntity);
        return true;
    }

    @Override
    public PurchasedSubscribeDto updateStatus(PurchasedSubscribeParam param) {
        PurchasedSubscribeEntity subscribeEntity = getEntityById(param.getId());
        subscribeEntity.setStatus(param.getStatus());
        purchasedSubscribeRepository.update(subscribeEntity);
        return PurchasedSubscribeConvertor.toDto(subscribeEntity);
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

            //peyToPlace
            calculatePaymetsService.PayToPlace(subscribeEntity);


            //enterUser
            subscribeEntity.setStatus(SubscribePurchasedStatus.ACTIVE);
            purchasedSubscribeRepository.update(subscribeEntity);
            purchasedSubscribeHelper.enterUser(subscribeEntity, userEntity);

        } else if (subscribeEntity.getStatus() == SubscribePurchasedStatus.ACTIVE) {
            //requeset check
            if (subscribeEntity.getEntryList().stream().anyMatch(t -> t.getSubscribeEntryStatus() == SubscribeEntryStatus.REQUESTED)) {
                throw new UserRequestEnterException();
            }
            //avoid duplicate enery
            if (subscribeEntity.getEntryList().get(subscribeEntity.getEntryList().size() - 1).getExitDate() == null) {
                throw new EntryAlreadyExistException();
            }
            //subscribe limit
            if (subscribeEntity.getEntryTotalCount() <= subscribeEntity.getEntryList().stream().filter(en -> en.getSubscribeEntryStatus() == SubscribeEntryStatus.ACCEPTED).count()) {
                throw new UsageLimitException();
            }
            //enter User
            purchasedSubscribeHelper.enterUser(subscribeEntity, userEntity);
        }
        return PurchasedSubscribeConvertor.toDto(subscribeEntity);

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
        PurchasedSubscribeEntryEntity entry = subscribeEntity.getEntryList().stream().filter(e->e.getSubscribeEntryStatus()==SubscribeEntryStatus.REQUESTED).findFirst().get();
        if(entry==null)
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
        var unEnterdSubscribe = userSubscribes.stream().anyMatch(ps -> ps.getEntryList().stream().anyMatch(e -> e.getSubscribeEntryStatus() == SubscribeEntryStatus.REQUESTED));
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
        if (psubscribeEntity.getEntryTotalCount() <= psubscribeEntity.getEntryList().stream().filter(en -> en.getSubscribeEntryStatus() == SubscribeEntryStatus.ACCEPTED).count()) {
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
