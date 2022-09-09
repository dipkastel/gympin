package com.notrika.gympin.persistence.entity;

import com.notrika.gympin.common.SearchCriteria;
import com.notrika.gympin.common.SearchOperations;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.Objects;


@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@MappedSuperclass
public class BaseEntity<T> implements Specification<T> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "is_deleted", nullable = false, columnDefinition = "boolean default false")
    private boolean deleted = false;

    @Transient
    private SearchCriteria criteria;

    public SearchCriteria getCriteria() {
        return criteria;
    }

    public void setCriteria(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<T> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder builder) {
        SearchOperations operation = criteria.getOperation();
        String key = criteria.getKey();
        String value = criteria.getValue().toString();
        if (operation.equals(SearchOperations.GREATER_THAN_OR_EQUAL_TO)) {
            return builder.greaterThanOrEqualTo(root.<String>get(key), value);
        } else if (operation.equals(SearchOperations.GREATER_THAN)) {
            return builder.greaterThan(root.<String>get(key), value);
        } else if (operation.equals(SearchOperations.LESS_THAN_OR_EQUAL_TO)) {
            return builder.lessThanOrEqualTo(root.<String>get(key), value);
        } else if (operation.equals(SearchOperations.LESS_THAN)) {
            return builder.lessThan(root.<String>get(key), value);
        } else if (operation.equals(SearchOperations.LIKE)) {
            return builder.like(root.<String>get(key), "%" + value + "%");
        } else if (operation.equals(SearchOperations.START_LIKE)) {
            return builder.like(root.<String>get(key), value + "%");
        } else if (operation.equals(SearchOperations.END_LIKE)) {
            return builder.like(root.<String>get(key), "%" + value);
        } else if (operation.equals(SearchOperations.EQUAL_TO)) {
            return builder.equal(root.get(criteria.getKey()), criteria.getValue());
        }
        return null;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        BaseEntity that = (BaseEntity) o;

        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return 699169739;
    }
}
