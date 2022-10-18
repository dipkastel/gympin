package com.notrika.gympin.persistence.result;

import java.math.BigDecimal;

public class SemiOverallTransactionResult {

    private Long id;

    private String title;

    private BigDecimal amount;

    public SemiOverallTransactionResult(Long id, String title, BigDecimal amount) {
        this.id = id;
        this.title = title;
        this.amount = amount;
    }
}
