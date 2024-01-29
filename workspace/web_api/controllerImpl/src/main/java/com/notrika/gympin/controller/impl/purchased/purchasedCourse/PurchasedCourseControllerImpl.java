package com.notrika.gympin.controller.impl.purchased.purchasedCourse;

import com.notrika.gympin.common.purchased.purchased.param.UserPlacePurchasedParam;
import com.notrika.gympin.common.purchased.purchasedCourse.api.PurchasedCourseController;
import com.notrika.gympin.common.purchased.purchasedCourse.dto.PurchasedCourseDto;
import com.notrika.gympin.common.purchased.purchasedCourse.param.PurchasedCourseParam;
import com.notrika.gympin.common.purchased.purchasedCourse.query.PurchasedCourseQuery;
import com.notrika.gympin.common.purchased.purchasedCourse.service.PurchasedCourseService;
import com.notrika.gympin.common.user.user.param.UserParam;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/purchasedCourse")
public class PurchasedCourseControllerImpl implements PurchasedCourseController {

    @Autowired
    PurchasedCourseService purchasedCourseService;

    @Override
    public ResponseEntity<PurchasedCourseDto> add(PurchasedCourseParam purchasedCourseParam) {
        return ResponseEntity.ok(purchasedCourseService.add(purchasedCourseParam));
    }

    @Override
    public ResponseEntity<PurchasedCourseDto> update(PurchasedCourseParam purchasedCourseParam) {
        return ResponseEntity.ok(purchasedCourseService.update(purchasedCourseParam));
    }

    @Override
    public ResponseEntity<PurchasedCourseDto> delete(PurchasedCourseParam purchasedCourseParam) {
        return ResponseEntity.ok(purchasedCourseService.delete(purchasedCourseParam));
    }

    @Override
    public ResponseEntity<List<PurchasedCourseDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(purchasedCourseService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<PurchasedCourseDto> getById(Long id) {
        return ResponseEntity.ok(purchasedCourseService.getById(id));
    }

    @Override
    public ResponseEntity<Page<PurchasedCourseDto>> query(PurchasedCourseQuery param) {
        return ResponseEntity.ok(purchasedCourseService.query(param));
    }

    @Override
    @GetMapping("/getByUser")
    public ResponseEntity<List<PurchasedCourseDto>> getByUser(UserParam userParam) {
        return ResponseEntity.ok(purchasedCourseService.getByUser(userParam));
    }

    @Override
    @PostMapping("/acceptEnterRequested")
    public ResponseEntity<Boolean> acceptEnterRequested(@RequestBody PurchasedCourseParam param) throws Exception {
        return ResponseEntity.ok(purchasedCourseService.acceptEnterRequested(param));
    }

    @Override
    @PostMapping("/getUserCoursesByPlace")
    public ResponseEntity<List<PurchasedCourseDto>> getUserCoursesByPlace(@RequestBody UserPlacePurchasedParam param) throws Exception {
        return ResponseEntity.ok(purchasedCourseService.getUserCoursesByPlace(param));
    }

    @Override
    @GetMapping("/getEnterRequested")
    public ResponseEntity<List<PurchasedCourseDto>> getEnterRequestedCourse(Long placeId) {
        return ResponseEntity.ok(purchasedCourseService.getEnterRequestedCourse(placeId));
    }

    @Override
    @GetMapping("/getUserEntered")
    public ResponseEntity<List<PurchasedCourseDto>> getUserEnteredCourse(Long placeId) {
        return ResponseEntity.ok(purchasedCourseService.getUserEnteredCourse(placeId));
    }

    @Override
    @PostMapping("/addEnterToCourse")
    public ResponseEntity<PurchasedCourseDto> addEnterToCourse(@RequestBody PurchasedCourseParam param) throws Exception {
        return ResponseEntity.ok(purchasedCourseService.addEnterToCourse(param));
    }


    @Override
    @GetMapping("/getActiveCourses")
    public ResponseEntity<List<PurchasedCourseDto>> getActiveCoursesOfPlace(Long placeId) {
        return ResponseEntity.ok(purchasedCourseService.getActiveCoursesOfPlace(placeId));
    }

    @Override
    @PostMapping("/enterRequest")
    public ResponseEntity<Boolean> enterRequest(@RequestBody PurchasedCourseParam param) throws Exception {
        return ResponseEntity.ok(purchasedCourseService.enterRequest(param));
    }

    @Override
    @GetMapping("/exitRequest")
    public ResponseEntity<Boolean> exitRequest(Long id) throws Exception {
        return ResponseEntity.ok(purchasedCourseService.exitRequest(id));
    }


    @Override
    @GetMapping("/exitUserOfPlace")
    public ResponseEntity<Boolean> exitUserOfPlace(Long id) throws Exception {
        return ResponseEntity.ok(purchasedCourseService.exitUserOfPlace(id));
    }

    @Override
    @PostMapping("/updateStatus")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<PurchasedCourseDto> updateStatus(@RequestBody PurchasedCourseParam param) throws Exception {
        return ResponseEntity.ok(purchasedCourseService.updateStatus(param));
    }
}
