package com.notrika.gympin.domain.finance.gateways.parsian;

import java.util.Map;

public class ReferenceProvider {

    private static final Map<String, String> references = Map.of(
            "WEBAPP",        "https://web.gympin.ir/wallet",
            "WEBCORPORATE",  "https://corporate.gympin.ir/finance",
            "WEBPLACE",      "https://place.gympin.ir"
    );

    public static String getReference(String ref) {
        return references.getOrDefault(ref, "https://gympin.ir");
    }
}
