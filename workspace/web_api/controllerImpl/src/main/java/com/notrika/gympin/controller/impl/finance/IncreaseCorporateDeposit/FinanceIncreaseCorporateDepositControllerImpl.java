package com.notrika.gympin.controller.impl.finance.IncreaseCorporateDeposit;

import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.api.FinanceIncreaseCorporateDepositController;
import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.dto.FinanceIncreaseCorporateDepositDto;
import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.param.FinanceIncreaseCorporateDepositParam;
import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.param.RequestIncreaseCorporateDepositParam;
import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.query.FinanceIncreaseCorporateDepositQuery;
import com.notrika.gympin.common.finance.IncreaseCorporateDeposit.service.FinanceIncreaseCorporateDepositService;
import com.notrika.gympin.common.multimedia.enums.MediaType;
import com.notrika.gympin.common.multimedia.param.MultimediaRetrieveParam;
import com.notrika.gympin.common.user.user.enums.MyMediaType;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.util.annotation.IgnoreWrapAspect;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("/api/v1/increaseCorporateDeposit")
public class FinanceIncreaseCorporateDepositControllerImpl implements FinanceIncreaseCorporateDepositController {



    @Autowired
    private FinanceIncreaseCorporateDepositService increaseCorporateDepositService;

    @Override
    public ResponseEntity<FinanceIncreaseCorporateDepositDto> add(FinanceIncreaseCorporateDepositParam param) {
        return ResponseEntity.ok(increaseCorporateDepositService.add(param));
    }

    @Override
    public ResponseEntity<FinanceIncreaseCorporateDepositDto> update(FinanceIncreaseCorporateDepositParam param) {
        return ResponseEntity.ok(increaseCorporateDepositService.update(param));
    }

    @Override
    public ResponseEntity<FinanceIncreaseCorporateDepositDto> delete(FinanceIncreaseCorporateDepositParam param) {
        return ResponseEntity.ok(increaseCorporateDepositService.delete(param));
    }

    @Override
    public ResponseEntity<List<FinanceIncreaseCorporateDepositDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(increaseCorporateDepositService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<FinanceIncreaseCorporateDepositDto> getById(Long id) {
        return ResponseEntity.ok(increaseCorporateDepositService.getById(id));
    }

    @Override
    public ResponseEntity<Page<FinanceIncreaseCorporateDepositDto>> query(FinanceIncreaseCorporateDepositQuery param) {
        return ResponseEntity.ok(increaseCorporateDepositService.query(param));
    }



    @Override
    @GetMapping("getCreditByCorporate")
    public ResponseEntity<List<FinanceIncreaseCorporateDepositDto>> getIncreaseCorporateDeposits(Long corporateId) {
        return ResponseEntity.ok(increaseCorporateDepositService.getIncreaseCorporateDeposits(corporateId));
    }

    @Override
    @PostMapping("confirmIncreaseRequest")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<FinanceIncreaseCorporateDepositDto> confirmIncreaseRequest( FinanceIncreaseCorporateDepositParam param) {
        return ResponseEntity.ok(increaseCorporateDepositService.confirmIncreaseRequest(param));
    }

    @Override
    @PostMapping("requestIncreaseCorporateDeposits")
    public ResponseEntity<String> requestIncreaseCorporateDeposits(RequestIncreaseCorporateDepositParam param) {
        return ResponseEntity.ok(increaseCorporateDepositService.requestIncreaseCorporateDeposits(param));
    }

    @Override
    @PostMapping("completeRequestIncreaseCorporateDeposits")
    public ResponseEntity<String> completeRequestIncreaseCorporateDeposits(RequestIncreaseCorporateDepositParam param) {
        return ResponseEntity.ok(increaseCorporateDepositService.completeRequestIncreaseCorporateDeposits(param));
    }

    @Override
    @PostMapping("requestIncreaseCorporateDepositsDraft")
    public ResponseEntity<FinanceIncreaseCorporateDepositDto> requestIncreaseCorporateDepositsDraft(RequestIncreaseCorporateDepositParam param) {
        return ResponseEntity.ok(increaseCorporateDepositService.requestIncreaseCorporateDepositsDraft(param));
    }

    @Override
    @RequestMapping(path = "getProFormaInvoice", method = GET)
    @IgnoreWrapAspect
    public  @ResponseBody void getProFormaInvoice(HttpServletResponse response,RequestIncreaseCorporateDepositParam param) throws Exception {
        response.setContentType(MyMediaType.APPLICATION_PDF_VALUE);
        InputStream inputStream = new ByteArrayInputStream(increaseCorporateDepositService.getProFormaInvoice(param));
        IOUtils.copy(inputStream,response.getOutputStream());
    }
}
