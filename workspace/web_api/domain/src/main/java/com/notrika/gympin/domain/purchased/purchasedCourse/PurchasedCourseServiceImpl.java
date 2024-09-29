package com.notrika.gympin.domain.purchased.purchasedCourse;


import com.notrika.gympin.common.purchased.purchased.param.UserPlacePurchasedParam;
import com.notrika.gympin.common.purchased.purchasedCourse.dto.PurchasedCourseDto;
import com.notrika.gympin.common.purchased.purchasedCourse.enums.CourseEntryStatus;
import com.notrika.gympin.common.purchased.purchasedCourse.enums.CoursePurchasedStatus;
import com.notrika.gympin.common.purchased.purchasedCourse.param.PurchasedCourseParam;
import com.notrika.gympin.common.purchased.purchasedCourse.query.PurchasedCourseQuery;
import com.notrika.gympin.common.purchased.purchasedCourse.service.PurchasedCourseService;
import com.notrika.gympin.common.settings.context.GympinContext;
import com.notrika.gympin.common.settings.context.GympinContextHolder;
import com.notrika.gympin.common.settings.sms.service.SmsInService;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util.exception.general.NotFoundException;
import com.notrika.gympin.common.util.exception.purchased.*;
import com.notrika.gympin.common.util.exception.user.UnknownUserException;
import com.notrika.gympin.domain.AbstractBaseService;
import com.notrika.gympin.domain.corporate.CorporateServiceImpl;
import com.notrika.gympin.domain.finance.peyments.CalculatePaymentsServiceImpl;
import com.notrika.gympin.domain.util.convertor.PurchasedCourseConvertor;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelCreditRepository;
import com.notrika.gympin.persistence.dao.repository.corporate.CorporatePersonnelRepository;
import com.notrika.gympin.persistence.dao.repository.place.PlaceRepository;
import com.notrika.gympin.persistence.dao.repository.purchased.course.PurchasedCourseEntryRepository;
import com.notrika.gympin.persistence.dao.repository.purchased.course.PurchasedCourseRepository;
import com.notrika.gympin.persistence.dao.repository.ticket.course.TicketCourseRepository;
import com.notrika.gympin.persistence.dao.repository.user.UserRepository;
import com.notrika.gympin.persistence.entity.purchased.purchasedCourse.PurchasedCourseEntity;
import com.notrika.gympin.persistence.entity.purchased.purchasedCourse.PurchasedCourseEntryEntity;
import com.notrika.gympin.persistence.entity.user.UserEntity;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.notrika.gympin.common.purchased.purchasedCourse.enums.CoursePurchasedStatus.*;

@Service
public class PurchasedCourseServiceImpl extends AbstractBaseService<PurchasedCourseParam, PurchasedCourseDto, PurchasedCourseQuery, PurchasedCourseEntity> implements PurchasedCourseService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    TicketCourseRepository ticketCourseRepository;
    @Autowired
    PurchasedCourseRepository purchasedCourseRepository;
    @Autowired
    PurchasedCourseEntryRepository purchasedCourseEntryRepository;
    @Autowired
    PlaceRepository placeRepository;
    @Autowired
    CorporatePersonnelRepository corporatePersonnelRepository;
    @Autowired
    CorporateServiceImpl corporateService;
    @Autowired
    CorporatePersonnelCreditRepository corporatePersonnelCreditRepository;
    @Autowired
    SmsInService smsService;
    @Autowired
    CalculatePaymentsServiceImpl calculatePaymetsService;

    @Autowired
    PurchasedCourseServiceHelper purchasedCourseHelper;

    @Override
    @Transactional
    @Deprecated
    public PurchasedCourseDto add(@NonNull PurchasedCourseParam purchasedCourseParam) {
        return null;
    }

    @Override
    public PurchasedCourseDto update(@NonNull PurchasedCourseParam purchasedCourseParam) {
        return null;
    }


    @Override
    public PurchasedCourseDto delete(@NonNull PurchasedCourseParam purchasedCourseParam) {
        PurchasedCourseEntity entity = purchasedCourseRepository.getById(purchasedCourseParam.getId());
        if (entity.getTicketCourse().getCourseCapacity() != null) {
            entity.getTicketCourse().setCourseCapacity(entity.getTicketCourse().getCourseCapacity() + 1);
            ticketCourseRepository.update(entity.getTicketCourse());
        }
        return PurchasedCourseConvertor.toDto(purchasedCourseRepository.deleteById2(entity));
    }

    @Override
    public PurchasedCourseDto getById(long id) {
        return PurchasedCourseConvertor.toDto(getEntityById(id));
    }

    @Override
    public PurchasedCourseEntity add(PurchasedCourseEntity entity) {
        return purchasedCourseRepository.add(entity);
    }

    @Override
    public PurchasedCourseEntity update(PurchasedCourseEntity entity) {
        return purchasedCourseRepository.update(entity);
    }

    @Override
    public PurchasedCourseEntity delete(PurchasedCourseEntity entity) {
        return purchasedCourseRepository.deleteById2(entity);
    }

    @Override
    public PurchasedCourseEntity getEntityById(long id) {
        return purchasedCourseHelper.checkForExpire(purchasedCourseRepository.getById(id));
    }

    @Override
    public List<PurchasedCourseEntity> getAll(Pageable pageable) {
        return purchasedCourseRepository.findAllUndeleted(pageable).stream().map(purchasedCourseHelper::checkForExpire).map(purchasedCourseHelper::checkForExpire).collect(Collectors.toList());
    }

    @Override
    public Page<PurchasedCourseEntity> findAll(Specification<PurchasedCourseEntity> specification, Pageable pageable) {
        return purchasedCourseRepository.findAll(specification, pageable).map(purchasedCourseHelper::checkForExpire);
    }

    @Override
    public List<PurchasedCourseDto> convertToDtos(List<PurchasedCourseEntity> entities) {
        return entities.stream().map(purchasedCourseHelper::checkForExpire).map(PurchasedCourseConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public Page<PurchasedCourseDto> convertToDtos(Page<PurchasedCourseEntity> entities) {
        return entities.map(purchasedCourseHelper::checkForExpire).map(PurchasedCourseConvertor::toDto);
    }


    //ticket
    @Override
    public List<PurchasedCourseDto> getUserEnteredCourse(Long placeId) {
        List<PurchasedCourseEntity> courseEntities = purchasedCourseRepository.findCoursesHasOpenEnterByPlaceId(placeId).stream().map(purchasedCourseHelper::checkForExpire).filter(t -> purchasedCourseHelper.checkForAccess(t, placeId)).collect(Collectors.toList());
        return courseEntities.stream().map(PurchasedCourseConvertor::toDto).collect(Collectors.toList());
    }

    @Override
    public List<PurchasedCourseDto> getUserCoursesByPlace(UserPlacePurchasedParam param) {
        List<PurchasedCourseEntity> courseEntities = purchasedCourseRepository.getUserPlaceCourse(param.getUserId(), param.getPlaceId()).stream().map(purchasedCourseHelper::checkForExpire).filter(f -> READY_TO_ACTIVE != f.getStatus()).collect(Collectors.toList());
        return convertToDtos(courseEntities);
    }

    @Override
    public List<PurchasedCourseDto> getActiveCoursesOfPlace(Long placeId) {
        List<PurchasedCourseEntity> courseEntities = purchasedCourseRepository.getActiveCourseOfPlace(placeId).stream().map(purchasedCourseHelper::checkForExpire).filter(t -> purchasedCourseHelper.checkForAccess(t, placeId)).collect(Collectors.toList());
        return convertToDtos(courseEntities);
    }

    @Override
    public List<PurchasedCourseDto> getByUser(UserParam userParam) {
        return convertToDtos(purchasedCourseRepository.findAllByCustomerIdAndDeletedFalse(userParam.getId()));
    }

    //ticketAction
    @Override
    public PurchasedCourseDto updateStatus(PurchasedCourseParam param) {
        PurchasedCourseEntity courseEntity = getEntityById(param.getId());
        courseEntity.setStatus(param.getStatus());
        purchasedCourseRepository.update(courseEntity);
        return PurchasedCourseConvertor.toDto(courseEntity);
    }

    //enter

    @Override
    public PurchasedCourseDto addEnterToCourse(PurchasedCourseParam param) {
        return null;
//        PurchasedCourseEntity courseEntity = getEntityById(param.getId());
//        UserEntity userEntity = userRepository.getById(param.getUser().getId());
//
//        //checks
//        if (courseEntity.getStatus() == EXPIRE) {
//            throw new PurchasedExpiredException();
//        } else if (courseEntity.getStatus() == CoursePurchasedStatus.COMPLETE) {
//            throw new UsageLimitException();
//        } else if (courseEntity.getStatus() == CoursePurchasedStatus.CANCEL) {
//            throw new PurchasedCanceledException();
//        } else if (courseEntity.getStatus() == CoursePurchasedStatus.PROCESSING) {
//            throw new IsInProcessException();
//        }
//
//        if (courseEntity.getStatus() == CoursePurchasedStatus.READY_TO_ACTIVE) {
//
//            //peyToPlace
//            calculatePaymetsService.PayToPlace(courseEntity);
//
//
//            //enterUser
//            courseEntity.setStatus(CoursePurchasedStatus.ACTIVE);
//            purchasedCourseRepository.update(courseEntity);
//            purchasedCourseHelper.enterUser(courseEntity, userEntity);
//
//        } else if (courseEntity.getStatus() == CoursePurchasedStatus.ACTIVE) {
//            //requeset check
//            if (courseEntity.getEntryList().stream().anyMatch(t -> t.getCourseEntryStatus() == CourseEntryStatus.REQUESTED)) {
//                throw new UserRequestEnterException();
//            }
//            //avoid duplicate enery
//            if (courseEntity.getEntryList().get(courseEntity.getEntryList().size() - 1).getExitDate() == null) {
//                throw new EntryAlreadyExistException();
//            }
//            //course limit
//            if (courseEntity.getEntryTotalCount() <= courseEntity.getEntryList().stream().filter(en -> en.getCourseEntryStatus() == CourseEntryStatus.ACCEPTED).count()) {
//                throw new UsageLimitException();
//            }
//            //enter User
//            purchasedCourseHelper.enterUser(courseEntity, userEntity);
//        }
//        return PurchasedCourseConvertor.toDto(courseEntity);

    }

    @Override
    public List<PurchasedCourseDto> getEnterRequestedCourse(Long placeId) {
        List<PurchasedCourseEntity> courseEntities = purchasedCourseRepository.findRequestedSubescribeByPlaceId(placeId);
        return convertToDtos(courseEntities);
    }

    @Override
    @Transactional
    public Boolean acceptEnterRequested(PurchasedCourseParam param) throws Exception {
        PurchasedCourseEntity courseEntity = getEntityById(param.getId());
        UserEntity userEntity = userRepository.getById(param.getUser().getId());
        PurchasedCourseEntryEntity entry = courseEntity.getEntryList().stream().filter(e -> e.getCourseEntryStatus() == CourseEntryStatus.REQUESTED).findFirst().get();
        if (entry == null)
            throw new NotFoundException();

        //check course Limit
        if (courseEntity.getEntryTotalCount() <= courseEntity.getEntryList().stream().filter(en -> en.getCourseEntryStatus() == CourseEntryStatus.ACCEPTED).count()) {
            throw new UsageLimitException();
        }

        entry.setCourseEntryStatus(CourseEntryStatus.ACCEPTED);
        entry.setEnterDate(new Date());
        entry.setAcceptedBy(userEntity);
        purchasedCourseEntryRepository.update(entry);
        return true;
    }

    @Override
    @Transactional
    public Boolean enterRequest(PurchasedCourseParam param) {
        PurchasedCourseEntity pcourseEntity = getEntityById(param.getId());
        UserEntity userEntity = userRepository.getById(param.getUser().getId());

        if (pcourseEntity.getStatus() != ACTIVE) {
            throw new IsNotActiveException();
        }

        var userCourses = purchasedCourseRepository.findAllByCustomerIdAndDeletedFalse(userEntity.getId());
        var unEnterdCourse = userCourses.stream().anyMatch(ps -> ps.getEntryList().stream().anyMatch(e -> e.getCourseEntryStatus() == CourseEntryStatus.REQUESTED));
        if (unEnterdCourse)
            throw new UserRequestEnterException();
        if (pcourseEntity.getEntryList().size() > 0) {
            var lastEnter = pcourseEntity.getEntryList().get(pcourseEntity.getEntryList().size() - 1);
            if (lastEnter.getExitDate() == null) {
                throw new EntryAlreadyExistException();
            }
        } else {
            throw new FirstEntryRequestException();
        }
        if (pcourseEntity.getEntryTotalCount() <= pcourseEntity.getEntryList().stream().filter(en -> en.getCourseEntryStatus() == CourseEntryStatus.ACCEPTED).count()) {
            throw new UsageLimitException();
        }
        PurchasedCourseEntryEntity pcourseEntryEntity = PurchasedCourseEntryEntity.builder().CourseEntryStatus(CourseEntryStatus.REQUESTED).enterDate(new Date()).purchasedCourse(pcourseEntity).build();
        purchasedCourseEntryRepository.add(pcourseEntryEntity);
        return true;
    }


    @Override
    public Boolean exitRequest(Long id) {
        PurchasedCourseEntryEntity courseEntry = purchasedCourseEntryRepository.getById(id);

        GympinContext context = GympinContextHolder.getContext();
        if (context == null)
            throw new UnknownUserException();
        UserEntity userEntity = (UserEntity) context.getEntry().get(GympinContext.USER_KEY);


        if (!courseEntry.getPurchasedCourse().getCustomer().getId().equals(userEntity.getId()))
            throw new UnknownUserException();


        purchasedCourseHelper.exitUserFromPlace(courseEntry);


        return true;
    }


    @Override
    public Boolean exitUserOfPlace(Long id) {
        PurchasedCourseEntryEntity courseEntry = purchasedCourseEntryRepository.getById(id);
        purchasedCourseHelper.exitUserFromPlace(courseEntry);
        return true;
    }


}
