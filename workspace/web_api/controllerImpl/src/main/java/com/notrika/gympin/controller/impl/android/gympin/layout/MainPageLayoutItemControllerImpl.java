package com.notrika.gympin.controller.impl.android.gympin.layout;

import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.android.gympin.layout.api.MainPageLayoutItemController;
import com.notrika.gympin.common.android.gympin.layout.dto.MainPageLayoutItemDto;
import com.notrika.gympin.common.android.gympin.layout.param.MainPageLayoutItemParam;
import com.notrika.gympin.common.android.gympin.layout.service.MainPageLayoutItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/mainpagelayoutitem")
public class MainPageLayoutItemControllerImpl implements MainPageLayoutItemController {

    @Autowired
    private MainPageLayoutItemService mainPageLayoutItemService;

    @Override
    public ResponseEntity<MainPageLayoutItemDto> add(@RequestBody MainPageLayoutItemParam mainPageLayoutItemParam) {
        return new ResponseEntity<MainPageLayoutItemDto>(mainPageLayoutItemService.add(mainPageLayoutItemParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<MainPageLayoutItemDto> update(@RequestBody MainPageLayoutItemParam mainPageLayoutItemParam) {
        return new ResponseEntity<MainPageLayoutItemDto>(mainPageLayoutItemService.update(mainPageLayoutItemParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<MainPageLayoutItemDto> delete(@RequestBody MainPageLayoutItemParam mainPageLayoutItemParam) {
        return new ResponseEntity<MainPageLayoutItemDto>(mainPageLayoutItemService.delete(mainPageLayoutItemParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<MainPageLayoutItemDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<List<MainPageLayoutItemDto>>(mainPageLayoutItemService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<MainPageLayoutItemDto> getById(@RequestBody long id) {
        return new ResponseEntity<MainPageLayoutItemDto>(mainPageLayoutItemService.getById(id), HttpStatus.OK);
    }

    @Override
    @PostMapping("/mainpage")
    public ResponseEntity<List<MainPageLayoutItemDto>> mainPage() {
        return new ResponseEntity<List<MainPageLayoutItemDto>>(mainPageLayoutItemService.mainPage(), HttpStatus.OK);
    }
}
