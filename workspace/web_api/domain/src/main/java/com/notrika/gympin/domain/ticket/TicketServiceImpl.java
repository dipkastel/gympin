package com.notrika.gympin.domain.ticket;

import com.notrika.gympin.common.athlete.gate.enums.TicketEntryStatus;
import com.notrika.gympin.common.context.GympinContext;
import com.notrika.gympin.common.context.GympinContextHolder;
import com.notrika.gympin.common.exception.ticket.*;
import com.notrika.gympin.common.exception.user.UnknownUserException;
import com.notrika.gympin.common.ticket.dto.TicketDto;
import com.notrika.gympin.common.ticket.dto.TicketEntryDto;
import com.notrika.gympin.common.ticket.dto.TicketScannedDto;
import com.notrika.gympin.common.ticket.enums.ScanResult;
import com.notrika.gympin.common.ticket.enums.TicketStatus;
import com.notrika.gympin.common.ticket.enums.TicketUserPlaceStatus;
import com.notrika.gympin.common.ticket.param.*;
import com.notrika.gympin.common.ticket.query.TicketQuery;
import com.notrika.gympin.common.ticket.service.TicketService;
import com.notrika.gympin.common.transaction.enums.TransactionStatus;
import com.notrika.gympin.common.transaction.enums.TransactionType;
import com.notrika.gympin.common.transaction.param.TransactionParam;
import com.notrika.gympin.common.transaction.param.TransactionPlaceSettelingParam;
import com.notrika.gympin.common.user.enums.PlanExpireType;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.common.util.GeneralUtil;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.util.convertor.TicketConvertor;
import com.notrika.gympin.persistence.dao.repository.*;
import com.notrika.gympin.persistence.entity.corporate.CorporateEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelCreditEntity;
import com.notrika.gympin.persistence.entity.corporate.CorporatePersonnelEntity;
import com.notrika.gympin.persistence.entity.plan.PlanEntity;
import com.notrika.gympin.persistence.entity.ticket.TicketEntity;
import com.notrika.gympin.persistence.entity.ticket.TicketEntryEntity;
import com.notrika.gympin.persistence.entity.ticket.TicketEntryMessageEntity;
import com.notrika.gympin.persistence.entity.transaction.TransactionEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.NonNull;
import org.slf4j.helpers.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.notrika.gympin.common.ticket.enums.TicketStatus.*;

@Service
public class TicketServiceImpl extends AbstractBaseService<TicketParam, TicketDto, TicketQuery, TicketEntity> implements TicketService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    PlanRepository planRepository;
    @Autowired
    TicketRepository ticketRepository;
    @Autowired
    TicketEntryMessageRepository ticketEntryMessageRepository;
    @Autowired
    TicketEntryRepository ticketEntryRepository;
    @Autowired
    TransactionRepository transactionRepository;
    @Autowired
    PlaceRepository placeRepository;
    @Autowired
    CorporatePersonnelRepository corporatePersonnelRepository;
    @Autowired
    CorporateRepository corporateRepository;
    @Autowired
    CorporatePersonnelCreditRepository corporatePersonnelCreditRepository;

    @Override
    @Transactional
    public TicketDto add(@NonNull TicketParam ticketParam) {

        PlanEntity plan = planRepository.getById(ticketParam.getPlan().getId());
        UserEntity user = userRepository.getById(ticketParam.getUser().getId());
        TicketEntity entity = new TicketEntity();

        GympinContext context = GympinContextHolder.getContext();
        if (context == null)
            throw new UnknownUserException();
        UserEntity userRequester = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);

        if (GeneralUtil.isGenderCompatible(plan.getGender() , user.getGender()))
            throw new TicketGenderIsNotCompatible();
        entity.setStatus(TicketStatus.PAYMENT_WAIT);
        entity.setPlan(plan);
        entity.setUser(user);
        entity.setPlanName(plan.getName());
        entity.setPrice(plan.getPrice());
        entity.setDescription(plan.getDescription());
        entity.setEntryTotalCount(plan.getEntryTotalCount());
        if (plan.getPlanExpireType() == PlanExpireType.Duration) {
            Date currentDate = new Date();
            Calendar c = Calendar.getInstance();
            c.setTime(currentDate);
            c.add(Calendar.DATE, plan.getExpireDuration());
            entity.setPlanExpireDate(c.getTime());
            entity.setExpireDate(c.getTime());
        } else {
            entity.setPlanExpireDate(plan.getExpireDate());
            entity.setExpireDate(plan.getExpireDate());
        }
        return TicketConvertor.toDto(ticketRepository.add(entity));
    }

    @Override
    public TicketDto update(@NonNull TicketParam ticketParam) {
        TicketEntity entity = ticketRepository.getById(ticketParam.getId());
        entity.setExpireDate(ticketParam.getExpireDate());
        return TicketConvertor.toDto(ticketRepository.update(entity));
    }

    @Override
    @Transactional
    public TicketScannedDto scannedTicket(TicketParam param) throws Exception {
        TicketEntity ticketEntity = getEntityById(param.getId());
        TicketScannedDto ticketScannedDto = TicketConvertor.toScannedDto(ticketEntity);
        GympinContext context = GympinContextHolder.getContext();
        if (context == null)
            throw new UnknownUserException();
        UserEntity userEntity = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);

        if (ticketEntity.getStatus() == TicketStatus.PAYMENT_WAIT) {
            throw new TicketNotPayedException();
        } else if (ticketEntity.getStatus() == TicketStatus.READY_TO_ACTIVE) {
            //check for user registerd in place before
            List<TicketEntity> userPlaceTickets = ticketRepository.getUserPlaceTicket(ticketEntity.getUser().getId(), ticketEntity.getPlan().getPlace().getId());
            if (userPlaceTickets.stream().anyMatch(p -> (p.getStatus() == TicketStatus.ACTIVE) || (p.getStatus() == TicketStatus.COMPLETE) || (p.getStatus() == EXPIRE))) {
                //user Has ticket From this place Before
                ticketScannedDto.setUserPlaceStatus(TicketUserPlaceStatus.REGISTER_BEFORE);
            } else {
                //new user for Place
                ticketScannedDto.setUserPlaceStatus(TicketUserPlaceStatus.NEW_USER);
            }
            //activate user
            ticketEntity.setStatus(TicketStatus.ACTIVE);
            ticketRepository.update(ticketEntity);
            ticketScannedDto.setScanResult(ScanResult.REGISTERED);
        } else if (ticketEntity.getStatus() == EXPIRE) {
            throw new TicketExpiredException();
        } else if (ticketEntity.getStatus() == TicketStatus.COMPLETE) {
            throw new TicketUsageLimitException();
        } else if (ticketEntity.getStatus() == TicketStatus.CANCEL) {
            throw new TicketCanceledException();
        } else if (ticketEntity.getStatus() == TicketStatus.PROCESSING) {
            throw new TicketIsInProcessException();
        } else if (ticketEntity.getStatus() == TicketStatus.ACTIVE) {
            //requeset check
            if (ticketEntity.getEntryList().stream().anyMatch(t -> t.getTicketEntryStatus() == TicketEntryStatus.REQUESTED)) {
                throw new UserRequestEnterException();
            }
            //canuserScan this ticket?
            if (!userEntity.getPlacePersonnel().stream().map(p -> p.getPlace().getId()).anyMatch(p -> p.equals(ticketEntity.getPlan().getPlace().getId())))
                throw new TicketOwnedByOtherPlaceException();
            //user Enter
            ticketScannedDto.setScanResult(ScanResult.ACCEPTED);
            //avoid duplicate enery
            if (ticketEntity.getEntryList().size() > 0) {
                var lastEnter = ticketEntity.getEntryList().get(ticketEntity.getEntryList().size() - 1);
                if (lastEnter.getExitDate() == null) {
                    throw new EntryAlreadyExistException();
                }
            } else {
                //calculate pay to place
                PayToPlace(ticketEntity);
            }
            if (ticketEntity.getEntryTotalCount() <= ticketEntity.getEntryList().stream().filter(en -> en.getTicketEntryStatus() == TicketEntryStatus.ACCEPTED).count()) {
                throw new TicketUsageLimitException();
            }
            TicketEntryEntity ticketEntryEntity = TicketEntryEntity.builder().ticketEntryStatus(TicketEntryStatus.ACCEPTED).ticket(ticketEntity).enterDate(new Date()).acceptedBy(userEntity).build();
            ticketEntryRepository.add(ticketEntryEntity);
            ticketScannedDto.setTicketEntry(TicketEntryDto.builder().id(ticketEntryEntity.getId()).enterDate(ticketEntryEntity.getEnterDate()).build());
        }
        return ticketScannedDto;
    }

    @Override
    @Transactional
    public TicketScannedDto acceptEnterRequest(Long ticketId) throws Exception {
        TicketEntity ticketEntity = getEntityById(ticketId);
        TicketScannedDto ticketScannedDto = TicketConvertor.toScannedDto(ticketEntity);
        GympinContext context = GympinContextHolder.getContext();
        if (context == null)
            throw new UnknownUserException();
        UserEntity userEntity = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);

        ticketScannedDto.setScanResult(ScanResult.ACCEPTED);

        if (ticketEntity.getEntryList().size() > 0) {
            var lastEnter = ticketEntity.getEntryList().get(ticketEntity.getEntryList().size() - 1);
            //chek user has open enter
            if (lastEnter.getExitDate() == null && lastEnter.getTicketEntryStatus() != TicketEntryStatus.REQUESTED) {
                throw new EntryAlreadyExistException();
            }
        } else {
            //calculate pay to place for first enter
            PayToPlace(ticketEntity);
        }

        //check ticket Limit
        if (ticketEntity.getEntryTotalCount() <= ticketEntity.getEntryList().stream().filter(en -> en.getTicketEntryStatus() == TicketEntryStatus.ACCEPTED).count()) {
            throw new TicketUsageLimitException();
        }

        TicketEntryEntity ticketEntryEntity = ticketEntity.getEntryList().stream().filter(te -> te.getTicketEntryStatus() == TicketEntryStatus.REQUESTED).findFirst().get();
        ticketEntryEntity.setTicketEntryStatus(TicketEntryStatus.ACCEPTED);
        ticketEntryEntity.setEnterDate(new Date());
        ticketEntryEntity.setAcceptedBy(userEntity);
        ticketEntryRepository.update(ticketEntryEntity);
        ticketScannedDto.setTicketEntry(TicketEntryDto.builder().id(ticketEntryEntity.getId()).enterDate(ticketEntryEntity.getEnterDate()).build());

        return ticketScannedDto;
    }

    @Override
    @Transactional
    public Boolean enterRequest(TicketParam param) {
        TicketEntity ticketEntity = ticketRepository.getById(param.getId());

        GympinContext context = GympinContextHolder.getContext();
        if (context == null)
            throw new UnknownUserException();
        UserEntity userEntity = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);

        if (!ticketEntity.getUser().getId().equals(userEntity.getId()))
            throw new UnknownUserException();

        if (ticketEntity.getStatus() == TicketStatus.ACTIVE) {
            //avoid duplicate enery
            if (ticketEntity.getEntryList().size() > 0) {
                var lastEnter = ticketEntity.getEntryList().get(ticketEntity.getEntryList().size() - 1);
                if (lastEnter.getExitDate() == null) {
                    throw new EntryAlreadyExistException();
                }
            } else {
                //calculate pay to place
                PayToPlace(ticketEntity);
            }
            if (ticketEntity.getEntryTotalCount() <= ticketEntity.getEntryList().stream().filter(en -> en.getTicketEntryStatus() == TicketEntryStatus.ACCEPTED).count()) {
                throw new TicketUsageLimitException();
            }
            TicketEntryEntity ticketEntryEntity = TicketEntryEntity.builder().ticketEntryStatus(TicketEntryStatus.REQUESTED).ticket(ticketEntity).build();
            ticketEntryRepository.add(ticketEntryEntity);
        } else {
            throw new TicketIsNotActiveException();
        }
        return true;
    }

    @Override
    public Boolean exitRequest(Long id) {
        TicketEntryEntity ticketEntry = ticketEntryRepository.getById(id);

        GympinContext context = GympinContextHolder.getContext();
        if (context == null)
            throw new UnknownUserException();
        UserEntity userEntity = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);

        if (!ticketEntry.getTicket().getUser().getId().equals(userEntity.getId()))
            throw new UnknownUserException();

        ticketEntry.setExitDate(new Date());
        ticketEntryRepository.update(ticketEntry);
        return true;
    }

    @Override
    public List<TicketDto> getEnterRequestedTicket(Long placeId) {
        List<TicketEntity> ticketEntities = ticketRepository.findRequestedTicketsByPlaceId(placeId);
        return convertToDtos(ticketEntities);
    }

    @Override
    public List<TicketScannedDto> getUserEnteredByPlace(Long placeId) {
        List<TicketEntity> ticketEntities = ticketRepository.findTicketsHasOpenEnterByPlaceId(placeId).stream().map(this::checkForExpire).collect(Collectors.toList());
        List<TicketScannedDto> result = new ArrayList<>();
        for (TicketEntity ticket : ticketEntities) {
            try {
                TicketScannedDto ticketScannedDto = TicketConvertor.toScannedDto(ticket);
                ticketScannedDto.setTicketEntry(TicketConvertor.toDto(ticket.getEntryList().stream().filter(t -> t.getExitDate() == null).findFirst().get()));
                result.add(ticketScannedDto);
            } catch (Exception e) {
                //entry is not in place anymore
            }
        }
        return result;
    }

    @Override
    public List<TicketDto> getActiveTicketsOfPlace(Long placeId) {
        List<TicketEntity> ticketEntities = ticketRepository.getActiveTicketsOfPlace(placeId).stream().map(this::checkForExpire).collect(Collectors.toList());
        return convertToDtos(ticketEntities);
    }

    @Override
    public List<TicketDto> getUserTicketsByPlace(UserTicketsParam param) {
        List<TicketEntity> ticketEntities = ticketRepository.getUserPlaceTicket(param.getUserId(), param.getPlaceId()).stream().map(this::checkForExpire).collect(Collectors.toList());
        return convertToDtos(ticketEntities);
    }

    @Override
    @Transactional
    public TicketScannedDto addEntryMessage(EntryMessageParam param) {
        TicketEntryEntity ticketEntryEntity = ticketEntryRepository.getById(param.getEntryId());
        TicketEntryMessageEntity messageEntity = TicketEntryMessageEntity
                .builder()
                .ticketEntry(ticketEntryEntity)
                .message(param.getMessage())
                .build();
        ticketEntryMessageRepository.add(messageEntity);
        TicketEntity ticket = ticketRepository.getById(ticketEntryEntity.getTicket().getId());
        TicketScannedDto result = TicketConvertor.toScannedDto(ticket);
        result.setTicketEntry(TicketConvertor.toDto(ticketEntryEntity));
        return result;
    }

    @Override
    public Boolean deleteEntryMessage(Long messageId) {
        TicketEntryMessageEntity message = ticketEntryMessageRepository.getById(messageId);
        ticketEntryMessageRepository.deleteById2(message);
        return true;
    }

    @Override
    public Boolean increaseExpireDate(IncreaseExpireParam param) {
        TicketEntity ticketEntity = ticketRepository.getById(param.getTicketId());
        if(param.getIncreaseDayCount()>0){
            Calendar c = Calendar.getInstance();
            c.setTime(ticketEntity.getExpireDate());
            c.add(Calendar.DATE,param.getIncreaseDayCount());
            ticketEntity.setExpireDate(c.getTime());
        }
        if(param.getChangeDate()!=null){
            ticketEntity.setExpireDate(param.getChangeDate());
        }
        ticketRepository.update(ticketEntity);
        return true;
    }


    @Override
    @Transactional
    public TicketDto checkout(TicketCheckoutParam param) throws Exception {
        TicketEntity ticketEntity = ticketRepository.getById(param.getTicket().getId());
        BigDecimal ticketRemainderPrice = ticketEntity.getPrice();
        String transaction_serial = java.util.UUID.randomUUID().toString();
        List<TransactionEntity> transactions = new ArrayList<>();
        GympinContext context = GympinContextHolder.getContext();
        if (context == null)
            throw new UnknownUserException();
        UserEntity userEntity = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);

        if (ticketEntity.getPrice().compareTo(param.getPrice()) != 0)
            throw new Exception("قیمت ارسالی با قیمت بلیط تفاوت دارد");
        if (ticketEntity.getPlan().getGender() != userEntity.getGender())
            throw new TicketGenderIsNotCompatible();
        if (ticketEntity.getPrice().compareTo(param.getCheckout().stream().map(CheckoutDetailParam::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add)) != 0)
            throw new Exception("مجموع پرداخت های ارسالی با قیمت بلیط تفاوت دارد");
        for (CheckoutDetailParam checkoutParam : param.getCheckout().stream().sorted((a, b) -> (int) (a.getPriority() - b.getPriority())).collect(Collectors.toList())) {
            if (checkoutParam.getAmount().compareTo(BigDecimal.ZERO) != 0) {
                ticketRemainderPrice = ticketRemainderPrice.subtract(checkoutParam.getAmount());
                switch (checkoutParam.getCreditType()) {
                    case SPONSOR: {
                        CorporatePersonnelEntity personnelEntity = corporatePersonnelRepository.getById(checkoutParam.getPersonnelId());
                        CorporateEntity corporateEntity = personnelEntity.getCorporate();
                        if (userEntity.getId() != personnelEntity.getUser().getId())
                            throw new Exception("بلیط توسط شخص دیگری نمیتواند پرداخت شود");
                        //personnel add credit row
                        var PersonnelCredit = CorporatePersonnelCreditEntity.builder().corporatePersonnel(personnelEntity).creditAmount(checkoutParam.getAmount().negate()).build();
                        corporatePersonnelCreditRepository.add(PersonnelCredit);

                        //personnel change balance
                        personnelEntity.setCreditBalance(personnelEntity.getCreditBalance().subtract(checkoutParam.getAmount()));
                        corporatePersonnelRepository.update(personnelEntity);
                        //setTransAction
                        transactions.add(TransactionEntity.builder()
                                .serial(transaction_serial)
                                .transactionType(TransactionType.PERSONNEL_USE_CREDIT)
                                .corporatePersonnel(personnelEntity)
                                .balance(personnelEntity.getCreditBalance())
                                .isChecked(false)
                                .amount(checkoutParam.getAmount())
                                .transactionStatus(TransactionStatus.COMPLETE)
                                .build());
                        //corporate change balance
                        corporateEntity.setBalance(corporateEntity.getBalance().subtract(checkoutParam.getAmount()));
                        corporateRepository.update(corporateEntity);
                        transactions.add(TransactionEntity.builder()
                                .serial(transaction_serial)
                                .transactionType(TransactionType.CORPORATE_PERSONNEL_USE_CREDIT)
                                .corporate(corporateEntity)
                                .balance(corporateEntity.getBalance())
                                .isChecked(false)
                                .amount(checkoutParam.getAmount())
                                .transactionStatus(TransactionStatus.COMPLETE)
                                .build());

                        break;
                    }
                    case PERSONAL: {
                        BigDecimal newBalance = userEntity.getBalance().subtract(checkoutParam.getAmount());
                        userEntity.setBalance(newBalance);

                        userRepository.update(userEntity);
                        context.getEntry().put(GympinContext.USER_KEY, userEntity);
                        transactions.add(TransactionEntity.builder()
                                .serial(transaction_serial)
                                .transactionType(TransactionType.USER_USE_BALANCE)
                                .user(userEntity)
                                .balance(userEntity.getBalance())
                                .isChecked(false)
                                .amount(checkoutParam.getAmount())
                                .transactionStatus(TransactionStatus.COMPLETE)
                                .build());


                        break;

                    }
                }
            }
        }

        if (ticketRemainderPrice.compareTo(BigDecimal.ZERO) != 0)
            throw new Exception("باقی مانده قیمت 0 نمیشود");
        //set Transactions
        transactionRepository.addAll(transactions);

        //change ticket status and serial
        ticketEntity.setPaymentSerial(transaction_serial);
        ticketEntity.setStatus(TicketStatus.READY_TO_ACTIVE);
        ticketRepository.update(ticketEntity);

        return TicketConvertor.toDto(ticketEntity);
    }

    @Override
    public TicketDto delete(@NonNull TicketParam ticketParam) {
        TicketEntity entity = ticketRepository.getById(ticketParam.getId());
        return TicketConvertor.toDto(ticketRepository.deleteById2(entity));
    }

    @Override
    public TicketDto getById(long id) {
        return TicketConvertor.toDto(ticketRepository.getById(id));
    }

    @Override
    public TicketEntity add(TicketEntity entity) {
        return ticketRepository.add(entity);
    }

    @Override
    public TicketEntity update(TicketEntity entity) {
        return ticketRepository.update(entity);
    }

    @Override
    public TicketEntity delete(TicketEntity entity) {
        return ticketRepository.deleteById2(entity);
    }

    @Override
    public TicketEntity getEntityById(long id) {
        return checkForExpire(ticketRepository.getById(id));
    }

    @Override
    public List<TicketEntity> getAll(Pageable pageable) {
        return ticketRepository.findAllUndeleted(pageable).stream().map(this::checkForExpire).map(this::checkForExpire).collect(Collectors.toList());
    }

    @Override
    public Page<TicketEntity> findAll(Specification<TicketEntity> specification, Pageable pageable) {
        return ticketRepository.findAll(specification, pageable).map(this::checkForExpire);
    }

    @Override
    public List<TicketDto> convertToDtos(List<TicketEntity> entities) {
        return entities.stream().map(this::checkForExpire).map(TicketConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<TicketDto> convertToDtos(Page<TicketEntity> entities) {
        return entities.map(this::checkForExpire).map(TicketConvertor::toDto);
    }

    @Override
    public List<TicketDto> getByUser(UserParam userParam) {
        return convertToDtos(ticketRepository.findAllByUserIdAndDeletedIsFalse(userParam.getId()));
    }

    public TicketEntity checkForExpire(TicketEntity ticket) {
        switch (ticket.getStatus()) {
            case EXPIRE:
            case COMPLETE:
            case PROCESSING:
            case CANCEL: {
                return ticket;
            }
            case ACTIVE:
            case READY_TO_ACTIVE: {
                if (ticket.getExpireDate().before(new Date())) {
                    ticket.setStatus(EXPIRE);
                    ticketRepository.update(ticket);
                }
                if (ticket.getEntryList().stream().filter(te -> te.getExitDate() != null).count() >= Long.valueOf(ticket.getEntryTotalCount())) {
                    ticket.setStatus(COMPLETE);
                    ticketRepository.update(ticket);
                }
                if (ticket.getExpireDate().before(new Date())) {
                    ticket.setStatus(EXPIRE);
                    ticketRepository.update(ticket);
                }
                for (var entry : ticket.getEntryList()) {
                    if (entry.getExitDate() == null && entry.getTicketEntryStatus() == TicketEntryStatus.ACCEPTED) {
                        Calendar c = Calendar.getInstance();
                        c.setTime(entry.getEnterDate());
                        c.add(Calendar.HOUR, 4);
                        if (c.getTime().before(new Date())) {
                            entry.setExitDate(c.getTime());
                            ticketEntryRepository.update(entry);
                        }
                    }
                    if (entry.getTicketEntryStatus() == TicketEntryStatus.REQUESTED) {
                        Calendar c = Calendar.getInstance();
                        c.setTime(entry.getCreatedDate());
                        c.add(Calendar.HOUR, 3);
                        if (c.getTime().before(new Date())) {
                            entry.setEnterDate(entry.getCreatedDate());
                            entry.setExitDate(c.getTime());
                            entry.setTicketEntryStatus(TicketEntryStatus.REJECTED);
                            ticketEntryRepository.update(entry);
                        }
                    }
                }
                return ticket;
            }
            case PAYMENT_WAIT: {
                Calendar c = Calendar.getInstance();
                c.setTime(ticket.getCreatedDate());
                c.add(Calendar.DATE, 3);
                if (c.getTime().before(new Date())) {
                    ticket.setStatus(CANCEL);
                    ticketRepository.update(ticket);
                }
                return ticket;
            }
            default:
                return ticket;

        }
    }

    private void PayToPlace(TicketEntity ticketEntity) {

        var placeEntity = ticketEntity.getPlan().getPlace();
        var gympinEntity = corporateRepository.getById(1l);
        var commission = ticketEntity.getPrice().multiply(BigDecimal.valueOf(placeEntity.getCommissionFee() / 100));
        var placeShare = ticketEntity.getPrice().multiply(BigDecimal.valueOf(1 - (placeEntity.getCommissionFee() / 100)));

        List<TransactionEntity> transactions = new ArrayList<>();

        //to place
        placeEntity.setBalance(placeEntity.getBalance().add(placeShare));
        gympinEntity.setBalance(gympinEntity.getBalance().add(commission));
        placeRepository.update(placeEntity);
        transactions.add(TransactionEntity.builder()
                .place(placeEntity)
                .transactionType(TransactionType.PLACE_TICKET_SETTLEMENT)
                .amount(placeShare)
                .isChecked(false)
                .transactionStatus(TransactionStatus.COMPLETE)
                .balance(placeEntity.getBalance())
                .serial(ticketEntity.getPaymentSerial())
                .build());

        //comission
        transactions.add(TransactionEntity.builder()
                .transactionType(TransactionType.COMMISSION)
                .amount(commission)
                .corporate(gympinEntity)
                .isChecked(false)
                .transactionStatus(TransactionStatus.COMPLETE)
                .serial(ticketEntity.getPaymentSerial())
                .balance(gympinEntity.getBalance())
                .build());
        transactionRepository.addAll(transactions);
    }

}
