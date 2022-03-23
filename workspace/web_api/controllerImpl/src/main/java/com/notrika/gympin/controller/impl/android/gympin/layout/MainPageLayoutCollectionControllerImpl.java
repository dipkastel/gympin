package com.notrika.gympin.controller.impl.android.gympin.layout;

import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.android.gympin.layout.api.MainPageLayoutCollectionController;
import com.notrika.gympin.common.android.gympin.layout.dto.MainPageLayoutCollectionDto;
import com.notrika.gympin.common.android.gympin.layout.param.MainPageLayoutCollectionParam;
import com.notrika.gympin.common.android.gympin.layout.service.MainPageLayoutCollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/mainpagelayoutcollection")
public class MainPageLayoutCollectionControllerImpl implements MainPageLayoutCollectionController {

    @Autowired
    private MainPageLayoutCollectionService collectionService;

    @Override
    public ResponseEntity<MainPageLayoutCollectionDto> add(@RequestBody MainPageLayoutCollectionParam mainPageLayoutCollectionParam) {
        return new ResponseEntity<>(collectionService.add(mainPageLayoutCollectionParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<MainPageLayoutCollectionDto> update(@RequestBody MainPageLayoutCollectionParam mainPageLayoutCollectionParam) {
        return new ResponseEntity<>(collectionService.update(mainPageLayoutCollectionParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<MainPageLayoutCollectionDto> delete(@RequestBody MainPageLayoutCollectionParam mainPageLayoutCollectionParam) {
        return new ResponseEntity<>(collectionService.delete(mainPageLayoutCollectionParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<MainPageLayoutCollectionDto>> getAll(BasePagedParam pagingParam) {
        return new ResponseEntity<>(collectionService.getAll(pagingParam), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<MainPageLayoutCollectionDto> getById(@RequestBody long id) {
        return new ResponseEntity<>(collectionService.getById(id), HttpStatus.OK);
    }
}
