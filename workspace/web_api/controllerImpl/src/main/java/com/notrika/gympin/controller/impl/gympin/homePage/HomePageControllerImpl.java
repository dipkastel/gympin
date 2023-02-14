package com.notrika.gympin.controller.impl.gympin.homePage;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common.gympin.homePage.api.HomePageController;
import com.notrika.gympin.common.gympin.homePage.dto.HomePageDeadendDto;
import com.notrika.gympin.common.gympin.homePage.dto.HomePageDestinationDto;
import com.notrika.gympin.common.gympin.homePage.dto.HomePageItemDto;
import com.notrika.gympin.common.gympin.homePage.dto.HomePageTypeDto;
import com.notrika.gympin.common.gympin.homePage.param.HomePageDestinationParam;
import com.notrika.gympin.common.gympin.homePage.param.HomePageItemParam;
import com.notrika.gympin.common.gympin.homePage.param.HomePageTypeParam;
import com.notrika.gympin.common.gympin.homePage.service.HomePageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/homepage")
public class HomePageControllerImpl implements HomePageController {

    @Autowired
    private HomePageService homePageService;

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<HomePageDeadendDto> add(HomePageItemParam homePageItemParam) {
        return ResponseEntity.ok(homePageService.add(homePageItemParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<HomePageDeadendDto> update(HomePageItemParam homePageItemParam) {
        return ResponseEntity.ok(homePageService.update(homePageItemParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<HomePageDeadendDto> delete(HomePageItemParam homePageItemParam) {
        return ResponseEntity.ok(homePageService.delete(homePageItemParam));
    }

    @Override
//    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<List<HomePageDeadendDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(homePageService.getAll(pagingParam));
    }

    @Override
//    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ResponseEntity<HomePageDeadendDto> getById(Long id) {
        return ResponseEntity.ok(homePageService.getById(id));
    }

    @Override
    public ResponseEntity<Page<HomePageDeadendDto>> query(BaseQuery<?> filter) {
        return null;
    }

    @Override
    @GetMapping("/getHome")
    public ResponseEntity<HomePageItemDto> getHome(Long id) {
        return ResponseEntity.ok(homePageService.getByHomeList(id));
    }

    //type
    @Override
    @GetMapping("/getAllTypes")
    public ResponseEntity<List<HomePageTypeDto>> getAllTypes(Pageable pageable) {
        return ResponseEntity.ok(homePageService.getAllTypes(pageable));
    }

    @Override
    @PostMapping("/addType")
    public ResponseEntity<HomePageTypeDto> addType(HomePageTypeParam param) {
        return ResponseEntity.ok(homePageService.addType(param));
    }


    @Override
    @PutMapping("/deleteType")
    public ResponseEntity<HomePageTypeDto> deleteType(HomePageTypeParam param) {
        return ResponseEntity.ok(homePageService.deleteType(param));
    }

    //destination

    @Override
    @GetMapping("/getAllDestinations")
    public ResponseEntity<List<HomePageDestinationDto>> getAllDestinations(Pageable pageable) {
        return ResponseEntity.ok(homePageService.getAllDestinations(pageable));
    }

    @Override
    @PostMapping("/addDestination")
    public ResponseEntity<HomePageDestinationDto> addDestination(HomePageDestinationParam param) {
        return ResponseEntity.ok(homePageService.addDestination(param));
    }

    @Override
    @PutMapping("/deleteDestination")
    public ResponseEntity<HomePageDestinationDto> deleteDestination(HomePageDestinationParam param) {
        return ResponseEntity.ok(homePageService.deleteDestination(param));
    }
}
