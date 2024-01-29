package com.notrika.gympin.common.purchased.purchasedCourse.service;

import com.notrika.gympin.common.purchased.purchasedCourse.dto.PurchasedCourseDto;
import com.notrika.gympin.common.purchased.purchasedCourse.param.PurchasedCourseParam;
import com.notrika.gympin.common.purchased.purchased.param.UserPlacePurchasedParam;
import com.notrika.gympin.common.purchased.purchasedCourse.query.PurchasedCourseQuery;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.base.BaseService;

import java.util.List;

public interface PurchasedCourseService extends BaseService<PurchasedCourseParam, PurchasedCourseDto, PurchasedCourseQuery> {



    //tickets
    List<PurchasedCourseDto> getUserEnteredCourse(Long placeId);
    List<PurchasedCourseDto> getUserCoursesByPlace(UserPlacePurchasedParam param);
    List<PurchasedCourseDto> getActiveCoursesOfPlace(Long placeId);
    List<PurchasedCourseDto> getByUser(UserParam userParam);

    //ticketAction
    PurchasedCourseDto updateStatus(PurchasedCourseParam param);

    //enter
    PurchasedCourseDto addEnterToCourse(PurchasedCourseParam param);
    List<PurchasedCourseDto> getEnterRequestedCourse(Long placeId);
    Boolean acceptEnterRequested(PurchasedCourseParam param) throws Exception;
    Boolean enterRequest(PurchasedCourseParam param);
    Boolean exitUserOfPlace(Long id);
    Boolean exitRequest(Long id);








}
