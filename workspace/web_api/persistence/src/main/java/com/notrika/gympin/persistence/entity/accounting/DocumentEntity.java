package com.notrika.gympin.persistence.entity.accounting;

import com.notrika.gympin.persistence.entity.BaseEntityWithCreateUpdate;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "document")
public class DocumentEntity extends BaseEntityWithCreateUpdate<DocumentEntity> {

    @Column(name = "document_number")
    private Long documentNumber;

    @Column(name = "document_date")
    private Date documentDate;

    @Column(name = "total_amount")
    private BigDecimal totalAmount;

    @Column(name = "description")
    private String description;

    @OneToMany
    @ToString.Exclude
    private List<DocumentItemsEntity> documentsItems;

}
