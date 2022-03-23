package com.notrika.gympin.controller.impl.android.gympin.layout;

import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.android.gympin.layout.api.MainPageLayoutChildItemController;
import com.notrika.gympin.common.android.gympin.layout.dto.MainPageLayoutChildItemDto;
import com.notrika.gympin.common.android.gympin.layout.param.MainPageLayoutChildItemParam;
import com.notrika.gympin.common.android.gympin.layout.service.MainPageLayoutChildItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/mainpagelayoutchilditem")
public class MainPageLayoutChildItemControllerImpl implements MainPageLayoutChildItemController {

    @Autowired
    private MainPageLayoutChildItemService childItemService;

    @Override
    public ResponseEntity<MainPageLayoutChildItemDto> add(@RequestBody MainPageLayoutChildItemParam mainPageLayoutChildItemParam) {
        return new ResponseEntity<>(childItemService.add(mainPageLayoutChildItemParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<MainPageLayoutChildItemDto> update(@RequestBody MainPageLayoutChildItemParam mainPageLayoutChildItemParam) {
        return new ResponseEntity<>(childItemService.update(mainPageLayoutChildItemParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<MainPageLayoutChildItemDto> delete(@RequestBody MainPageLayoutChildItemParam mainPageLayoutChildItemParam) {
        return new ResponseEntity<>(childItemService.delete(mainPageLayoutChildItemParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<MainPageLayoutChildItemDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<>(childItemService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<MainPageLayoutChildItemDto> getById(@RequestBody long id) {
        return new ResponseEntity<>(childItemService.getById(id), HttpStatus.OK);
    }
}
