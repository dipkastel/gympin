package com.notrika.gympin.domain;

import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.util._base.dto.BaseDto;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.util._base.param.BaseParam;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.query.QueryCriteria;
import com.notrika.gympin.common.util._base.query.Query;
import com.notrika.gympin.common.util._base.query.Enums.QueryOperationsEnum;
import com.notrika.gympin.domain.util.convertor.PagingConvertor;
import com.notrika.gympin.persistence.entity.BaseEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import javax.ws.rs.BadRequestException;
import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public abstract class AbstractBaseService<I extends BaseParam, O extends BaseDto, F extends BaseQuery, ET extends BaseEntity> implements BaseService<I, O, F> {

    public abstract ET add(ET entity);

    public abstract ET update(ET entity);

    public abstract ET delete(ET entity);

    public abstract ET getEntityById(long id);

    @Override
    public final List<O> getAll(BasePagedParam pagingParam) {
        Pageable pageable = PagingConvertor.extractPagingParams(pagingParam);
        return convertToDtos(getAll(pageable));
    }


    public abstract List<ET> getAll(Pageable pageable);

    public abstract Page<ET> findAll(Specification<ET> specification,Pageable pageable);

    public abstract List<O> convertToDtos(List<ET> entities);

    public abstract Page<O> convertToDtos(Page<ET> entities);


    @Override
    public Page<O> query(F param) {
        Specification<ET> clause = createSpecification(param);
        Pageable pageable = PagingConvertor.extractPagingParams(param.getPaging());
        return convertToDtos(findAll(clause,pageable));
    }

    @SuppressWarnings("unchecked")
    private Specification<ET> createSpecification(F filter) {
        Query query =new Query();
        List<QueryCriteria> queryCriteriaList = new ArrayList<>();

        query.setQueryType(filter.getQueryType());
        Class aClass = filter.getClass();
        while (aClass!=null){
            for (Field field : aClass.getDeclaredFields()) {
                try {

                    field.setAccessible(true);
                    Object value = field.get(filter);
                    String fieldName = field.getName();
                    if (value != null) {
                        queryCriteriaList.add(getCriteria(fieldName,value));
                    }
                } catch (Exception e) {
                }
            }
            aClass = aClass.getSuperclass();
        }
        return clauseCreator(queryCriteriaList,query);
    }

    private Specification<ET> clauseCreator(List<QueryCriteria> queryCriteriaList, Query query) {
        Specification<ET> clause = null;
        try {
            ET specification = newInstance();
            query.setCriteriaList(queryCriteriaList);
            assert specification != null;
            specification.setQuery(query);
            for (int i = 0; i < queryCriteriaList.size(); i++) {
                if (clause == null)
                    clause = Specification.where(specification);
                else
                    clause.and(specification);
            }
        } catch (Exception e) {
        }
        return clause;
    }

    private QueryCriteria getCriteria(String fieldName, Object value) throws BadRequestException{
        String[] queryfieldParam =  fieldName.split("_");
        if(queryfieldParam.length<1)
            throw new BadRequestException("queryParam ( "+fieldName+" ) is not valid. follow structure of queries");
        switch (queryfieldParam[0]){
            case "ismin": return QueryCriteria.builder().key(queryfieldParam[1]).value(value).operation(QueryOperationsEnum.GREATER_THAN_OR_EQUAL_TO).build();
            case "ismax": return QueryCriteria.builder().key(queryfieldParam[1]).value(value).operation(QueryOperationsEnum.LESS_THAN_OR_EQUAL_TO).build();
            case "is": return QueryCriteria.builder().key(queryfieldParam[1]).value(value).operation(QueryOperationsEnum.EQUAL_TO).build();
            case "min": return QueryCriteria.builder().key(queryfieldParam[1]).value(value).operation(QueryOperationsEnum.GREATER_THAN).build();
            case "max": return QueryCriteria.builder().key(queryfieldParam[1]).value(value).operation(QueryOperationsEnum.LESS_THAN).build();
            case "slike": return QueryCriteria.builder().key(queryfieldParam[1]).value(value).operation(QueryOperationsEnum.START_LIKE).build();
            case "elike": return QueryCriteria.builder().key(queryfieldParam[1]).value(value).operation(QueryOperationsEnum.END_LIKE).build();
            case "like": return QueryCriteria.builder().key(queryfieldParam[1]).value(value).operation(QueryOperationsEnum.LIKE).build();
            default: return QueryCriteria.builder().key(queryfieldParam[1]).value(value).operation(QueryOperationsEnum.LIKE).build();
        }
    };
    @SuppressWarnings("unchecked")
    private ET newInstance() {
        for (Type type : ((ParameterizedType) this.getClass().getGenericSuperclass()).getActualTypeArguments()) {
            try{
                if (Arrays.stream(((Class) (type)).getAnnotations()).anyMatch(a -> a.annotationType().getTypeName().contains("Entity"))) {
                    return ((Class<ET>) type).newInstance();
                }
            }catch (Exception e){}
        }
        return null;
    }

}
