package com.notrika.gympin.common.purchased.purchasedCourse.api;

import com.notrika.gympin.common.purchased.purchasedCourse.dto.PurchasedCourseDto;
import com.notrika.gympin.common.purchased.purchasedCourse.param.PurchasedCourseParam;
import com.notrika.gympin.common.purchased.purchased.param.UserPlacePurchasedParam;
import com.notrika.gympin.common.purchased.purchasedCourse.query.PurchasedCourseQuery;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.base.BaseController;
import org.springframework.http.ResponseEntity;

import java.util.List;


public interface PurchasedCourseController extends BaseController<PurchasedCourseParam, PurchasedCourseDto, PurchasedCourseQuery> {



    //tickets
    ResponseEntity<List<PurchasedCourseDto>> getUserEnteredCourse(Long placeId);
    ResponseEntity<List<PurchasedCourseDto>> getUserCoursesByPlace(UserPlacePurchasedParam param) throws Exception;
    ResponseEntity<List<PurchasedCourseDto>> getActiveCoursesOfPlace(Long placeId);
    ResponseEntity<List<PurchasedCourseDto>> getByUser(UserParam userParam);

    //ticketAction
    ResponseEntity<PurchasedCourseDto> updateStatus(PurchasedCourseParam param) throws Exception;

    //enter
    ResponseEntity<PurchasedCourseDto> addEnterToCourse(PurchasedCourseParam param) throws Exception;
    ResponseEntity<List<PurchasedCourseDto>> getEnterRequestedCourse(Long placeId);
    ResponseEntity<Boolean> acceptEnterRequested(PurchasedCourseParam param) throws Exception;
    ResponseEntity<Boolean> enterRequest(PurchasedCourseParam param) throws Exception;
    ResponseEntity<Boolean> exitUserOfPlace(Long id) throws Exception;
    ResponseEntity<Boolean> exitRequest(Long Id) throws Exception;
}
