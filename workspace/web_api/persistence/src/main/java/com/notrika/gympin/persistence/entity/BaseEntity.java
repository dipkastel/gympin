package com.notrika.gympin.persistence.entity;

import com.notrika.gympin.common._base.query.Query;
import com.notrika.gympin.common._base.query.QueryCriteria;
import com.notrika.gympin.common._base.query.Enums.QueryTypesEnum;
import com.notrika.gympin.common._base.query.Enums.QueryOperationsEnum;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.*;
import javax.persistence.criteria.*;
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

    @Column(name = "isDeleted", nullable = false, columnDefinition = "boolean default false")
    private boolean deleted = false;

    @Transient
    private Query query;

    @Override
    public Predicate toPredicate(Root<T> _root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder builder) {
        Predicate predicate =builder.conjunction();
        Predicate queries = (query.getQueryType()== QueryTypesEnum.SEARCH)?builder.disjunction():builder.conjunction();
        for (QueryCriteria criteria : query.getCriteriaList()) {
            QueryOperationsEnum operation = criteria.getOperation();
            String key = criteria.getKey();
            String value = criteria.getValue().toString();
            From<Objects,Objects> root = null;
            if(key.contains("æ")){
             var joinItem = key.split("æ")[0];
                key = key.split("æ")[1];
                root = _root.join(joinItem);
            }else{
                root = (From<Objects, Objects>) _root;
            }
            if(key.equals("deleted")){
                Predicate predicateDelete = builder.conjunction();
                predicateDelete.getExpressions().add(builder.equal(root.get(key), criteria.getValue()));
                predicate.getExpressions().add(predicateDelete);
            }else if (operation.equals(QueryOperationsEnum.GREATER_THAN_OR_EQUAL_TO)) {
                queries.getExpressions().add(builder.greaterThanOrEqualTo(root.<String>get(key), value));
            } else if (operation.equals(QueryOperationsEnum.GREATER_THAN)) {
                queries.getExpressions().add(builder.greaterThan(root.<String>get(key), value));
            } else if (operation.equals(QueryOperationsEnum.LESS_THAN_OR_EQUAL_TO)) {
                queries.getExpressions().add(builder.lessThanOrEqualTo(root.<String>get(key), value));
            } else if (operation.equals(QueryOperationsEnum.LESS_THAN)) {
                queries.getExpressions().add(builder.lessThan(root.<String>get(key), value));
            } else if (operation.equals(QueryOperationsEnum.LIKE)) {
                queries.getExpressions().add(builder.like(root.<String>get(key), "%" + value + "%"));
            } else if (operation.equals(QueryOperationsEnum.START_LIKE)) {
                queries.getExpressions().add(builder.like(root.<String>get(key), value + "%"));
            } else if (operation.equals(QueryOperationsEnum.END_LIKE)) {
                queries.getExpressions().add(builder.like(root.<String>get(key), "%" + value));
            } else if (operation.equals(QueryOperationsEnum.EQUAL_TO)) {
                queries.getExpressions().add(builder.equal(root.get(key), criteria.getValue()));
            }
        }
        if(queries.getExpressions().size()>0)
            predicate.getExpressions().add(queries);
        return predicate;
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
        return getClass().hashCode();
    }

}
