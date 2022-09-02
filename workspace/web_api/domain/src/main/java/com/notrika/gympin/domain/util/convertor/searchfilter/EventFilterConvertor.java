package com.notrika.gympin.domain.util.convertor.searchfilter;

import com.notrika.gympin.common.SearchCriteria;
import com.notrika.gympin.common.SearchOperations;
import com.notrika.gympin.common.event.BaseEventFilter;
import com.notrika.gympin.common.util.StringUtil;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.notrika.gympin.common.SearchOperations.*;
import static com.notrika.gympin.domain.util.convertor.searchfilter.BaseFilterConvertor.*;

public final class EventFilterConvertor {

    public static final String ID = "id";
    public static final String TITLE="title";
    public static final String DESCRIPTION="description";
    public static final String START_DATE="start_date";

    public static List<SearchCriteria> convertToBaseEventFilter(BaseEventFilter<?> filter){
        List<SearchCriteria> searchCriteriaList=convertToBaseFilter(filter);
        if(stringHasValue(filter.getTitle())){
            searchCriteriaList.add(createSearchCriteria(TITLE,filter.getTitle(),LIKE));
        }
        if(stringHasValue(filter.getDescription())){
            searchCriteriaList.add(createSearchCriteria(DESCRIPTION,filter.getDescription(),LIKE));
        }
        if(dateHasValue(filter.getStartDate())){
            searchCriteriaList.add(createSearchCriteria(ID,filter.getStartDate(),GREATER_THAN_OR_EQUAL_TO));
        }
        if(dateHasValue(filter.getEndDate())){
            searchCriteriaList.add(createSearchCriteria(ID,filter.getEndDate(),LESS_THAN_OR_EQUAL_TO));
        }
        return searchCriteriaList;
    }

}
