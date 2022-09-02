package com.notrika.gympin.domain.util.convertor.searchfilter;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.SearchCriteria;
import com.notrika.gympin.common.SearchOperations;
import com.notrika.gympin.common.event.BaseEventFilter;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.notrika.gympin.common.SearchOperations.GREATER_THAN_OR_EQUAL_TO;
import static com.notrika.gympin.common.SearchOperations.LESS_THAN_OR_EQUAL_TO;

public final class BaseFilterConvertor {

    public static final String ID = "id";

    public static List<SearchCriteria> convertToBaseFilter(BaseFilter<?> filter){
        List<SearchCriteria> searchCriteriaList=new ArrayList<>();
        if(longHasValue(filter.getStartId())){
            searchCriteriaList.add(createSearchCriteria(ID,filter.getStartId(), GREATER_THAN_OR_EQUAL_TO));
        }
        if(longHasValue(filter.getEndId())){
            searchCriteriaList.add(createSearchCriteria(ID,filter.getEndId(),LESS_THAN_OR_EQUAL_TO));
        }
        return searchCriteriaList;
    }

    public static SearchCriteria createSearchCriteria(String key, Object value, SearchOperations operation){
        return SearchCriteria.builder().key(key).value(value).operation(operation).build();
    }

    public static boolean longHasValue(Long value){
        return value != null && value>0;
    }

    public static boolean shortHasValue(Short value){
        return value != null && value>0;
    }

    public static boolean bigDecimalHasValue(BigDecimal value){
        return value!=null;
    }

    public static boolean stringHasValue(String value){
        return StringUtils.hasText(value);
    }

    public static boolean dateHasValue(Date value){
        return value!=null;
    }

}
