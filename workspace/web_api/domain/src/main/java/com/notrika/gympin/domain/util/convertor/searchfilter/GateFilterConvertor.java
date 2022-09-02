package com.notrika.gympin.domain.util.convertor.searchfilter;

import com.notrika.gympin.common.SearchCriteria;
import com.notrika.gympin.common.SearchOperations;
import com.notrika.gympin.common.event.BaseEventFilter;
import com.notrika.gympin.common.location.filter.GateFilter;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.notrika.gympin.common.SearchOperations.*;
import static com.notrika.gympin.domain.util.convertor.searchfilter.BaseFilterConvertor.*;

public final class GateFilterConvertor {

    public static final String ID = "id";
    public static final String NAME="name";


    public static List<SearchCriteria> convertToGateFilter(GateFilter filter){
        List<SearchCriteria> searchCriteriaList=convertToBaseFilter(filter);
        if(stringHasValue(filter.getName())){
            searchCriteriaList.add(createSearchCriteria(NAME,filter.getName(),LIKE));
        }
        return searchCriteriaList;
    }

}
