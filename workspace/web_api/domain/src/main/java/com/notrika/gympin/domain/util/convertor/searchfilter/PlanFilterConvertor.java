package com.notrika.gympin.domain.util.convertor.searchfilter;
import com.notrika.gympin.common.SearchCriteria;
import com.notrika.gympin.common.event.BaseEventFilter;
import com.notrika.gympin.common.plan.filter.PlanFilter;

import java.util.ArrayList;
import java.util.List;

import static com.notrika.gympin.common.SearchOperations.*;
import static com.notrika.gympin.common.SearchOperations.LESS_THAN_OR_EQUAL_TO;
import static com.notrika.gympin.domain.util.convertor.searchfilter.BaseFilterConvertor.*;

public final class PlanFilterConvertor {

    public static final String TITLE = "title";
    public static final String DESCRIPTION = "description";
    public static final String ENTRY_COUNT = "entry_count";
    public static final String PRICE = "price";
    public static final String DISCOUNT_PRICE = "discount_price";

    public static List<SearchCriteria> convertToPlanFilter(PlanFilter filter){
        List<SearchCriteria> searchCriteriaList=convertToBaseFilter(filter);
        if(stringHasValue(filter.getTitle())){
            searchCriteriaList.add(createSearchCriteria(TITLE,filter.getTitle(),LIKE));
        }
        if(stringHasValue(filter.getDescription())){
            searchCriteriaList.add(createSearchCriteria(DESCRIPTION,filter.getDescription(),LIKE));
        }
        if (shortHasValue(filter.getEntryCountStart())){
            searchCriteriaList.add(createSearchCriteria(ENTRY_COUNT,filter.getEntryCountStart(),GREATER_THAN_OR_EQUAL_TO));
        }
        if(shortHasValue(filter.getEntryCountEnd())){
            searchCriteriaList.add(createSearchCriteria(ENTRY_COUNT,filter.getEntryCountEnd(),LESS_THAN_OR_EQUAL_TO));
        }
        if(bigDecimalHasValue(filter.getPriceStart())){
            searchCriteriaList.add(createSearchCriteria(PRICE,filter.getPriceStart(),GREATER_THAN_OR_EQUAL_TO));
        }
        if(bigDecimalHasValue(filter.getPriceEnd())){
            searchCriteriaList.add(createSearchCriteria(PRICE,filter.getPriceEnd(),LESS_THAN_OR_EQUAL_TO));
        }
        if(bigDecimalHasValue(filter.getDiscountPriceStart())){
            searchCriteriaList.add(createSearchCriteria(DISCOUNT_PRICE,filter.getDiscountPriceStart(),GREATER_THAN_OR_EQUAL_TO));
        }
        if(bigDecimalHasValue(filter.getDiscountPriceEnd())){
            searchCriteriaList.add(createSearchCriteria(DISCOUNT_PRICE,filter.getDiscountPriceEnd(),LESS_THAN_OR_EQUAL_TO));
        }
        return searchCriteriaList;
    }

}
