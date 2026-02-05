package com.notrika.gympin.persistence.entity;

import com.notrika.gympin.common.util._base.query.Query;
import com.notrika.gympin.common.util._base.query.QueryCriteria;
import com.notrika.gympin.common.util._base.query.Enums.QueryTypesEnum;
import com.notrika.gympin.common.util._base.query.Enums.QueryOperationsEnum;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.*;
import javax.persistence.criteria.*;
import java.lang.reflect.Type;
import java.util.Date;
import java.util.List;
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
        Predicate queries = (query.getQueryType().equals(QueryTypesEnum.SEARCH))?builder.disjunction():builder.conjunction();
        for (QueryCriteria criteria : query.getCriteriaList()) {
            QueryOperationsEnum operation = criteria.getOperation();
            String key = criteria.getKey();
            Object value = criteria.getValue();
            From<Objects,Objects> root = null;
            if(key.split("æ").length>1){
                var joinItem = key.split("æ")[0];
                root = _root.join(joinItem);
                for (var joinItemNumber = 1;joinItemNumber<key.split("æ").length-1;joinItemNumber++){
                    root = root.join(key.split("æ")[joinItemNumber]);
                }
                key = key.split("æ")[key.split("æ").length-1];
            }else{
                root = (From<Objects, Objects>) _root;
            }
            if(value instanceof List){
                for(Object item : (List) value){
                    addQuery(key,builder,predicate,root,operation,queries,item);
                    if(!Objects.equals(key, "deleted"))
                        addQuery("deleted",builder,predicate,root,operation,queries,false);
                }
            }else{
                addQuery(key,builder,predicate,root,operation,queries,value);
                if(!Objects.equals(key, "deleted"))
                    addQuery("deleted",builder,predicate,root,operation,queries,false);
            }
            criteriaQuery.distinct(true);
        }
        if(queries.getExpressions().size()>0)
            predicate.getExpressions().add(queries);
        return predicate;
    }

    private void addQuery(String key, CriteriaBuilder builder, Predicate predicate, From<Objects, Objects> root, QueryOperationsEnum operation, Predicate queries, Object value ) {
        Path<?> path = root;
        while (path!=null){
            if(queries.getOperator().name().equals("AND"))
                queries.getExpressions().add(builder.equal(path.get("deleted"), false));
            path= path.getParentPath();
        }
        if(key.equals("deleted")){
            Predicate predicateDelete = builder.conjunction();
            predicateDelete.getExpressions().add(builder.equal(root.get(key), value));
            predicate.getExpressions().add(predicateDelete);
        }else if (operation.equals(QueryOperationsEnum.GREATER_THAN_OR_EQUAL_TO)) {
            queries.getExpressions().add(builder.greaterThanOrEqualTo(root.<String>get(key), value.toString()));
        } else if (operation.equals(QueryOperationsEnum.GREATER_THAN)) {
            if(value instanceof Date)
                queries.getExpressions().add(builder.greaterThan(root.<Date>get(key),(Date) value));
            else
                queries.getExpressions().add(builder.greaterThan(root.<String>get(key), value.toString()));
        } else if (operation.equals(QueryOperationsEnum.LESS_THAN_OR_EQUAL_TO)) {
            queries.getExpressions().add(builder.lessThanOrEqualTo(root.<String>get(key), value.toString()));
        } else if (operation.equals(QueryOperationsEnum.LESS_THAN)) {
            if(value instanceof Date)
                queries.getExpressions().add(builder.lessThan(root.<Date>get(key),(Date) value));
            else
                queries.getExpressions().add(builder.lessThan(root.<String>get(key), value.toString()));
        } else if (operation.equals(QueryOperationsEnum.LIKE)) {
            queries.getExpressions().add(builder.like(root.<String>get(key), "%" + value.toString() + "%"));
        } else if (operation.equals(QueryOperationsEnum.START_LIKE)) {
            queries.getExpressions().add(builder.like(root.<String>get(key), value.toString() + "%"));
        } else if (operation.equals(QueryOperationsEnum.END_LIKE)) {
            queries.getExpressions().add(builder.like(root.<String>get(key), "%" + value.toString()));
        } else if (operation.equals(QueryOperationsEnum.EQUAL_TO)) {
            queries.getExpressions().add(builder.equal(root.get(key), value));
        } else if (operation.equals(QueryOperationsEnum.NOT_EQUAL_TO)) {
            queries.getExpressions().add(builder.notEqual(root.get(key), value));
        }
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
