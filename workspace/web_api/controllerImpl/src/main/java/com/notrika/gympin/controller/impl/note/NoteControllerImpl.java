package com.notrika.gympin.controller.impl.note;

import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.note.api.NoteController;
import com.notrika.gympin.common.note.dto.NoteDto;
import com.notrika.gympin.common.note.param.NoteParam;
import com.notrika.gympin.common.note.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/note")
public class NoteControllerImpl implements NoteController {

    @Autowired
    private NoteService noteService;

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<NoteDto> add(NoteParam param) {
        return ResponseEntity.ok(noteService.add(param));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<NoteDto> update(NoteParam param) {
        return ResponseEntity.ok(noteService.update(param));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<NoteDto> delete(NoteParam param) {
        return ResponseEntity.ok(noteService.delete(param));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<List<NoteDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(noteService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<NoteDto> getById(Long id) {
        return ResponseEntity.ok(noteService.getById(id));
    }

    @Override
    public ResponseEntity<Page<NoteDto>> query(BaseQuery<?> filter) {
        return null;
    }

    @Override
    @PostMapping("getByParam")
    public ResponseEntity<List<NoteDto>> getByParam(NoteParam noteParam) {
        if (noteParam.getPlace() != null)
            return ResponseEntity.ok(noteService.getByPlace(noteParam.getPlace()));
        if (noteParam.getUser() != null)
            return ResponseEntity.ok(noteService.getByUser(noteParam.getUser()));
        if (noteParam.getTicket() != null)
            return ResponseEntity.ok(noteService.getByTicket(noteParam.getTicket()));
        if (noteParam.getCorporate() != null)
            return ResponseEntity.ok(noteService.getByCorporate(noteParam.getCorporate()));
        return ResponseEntity.ok(null);
    }
}
