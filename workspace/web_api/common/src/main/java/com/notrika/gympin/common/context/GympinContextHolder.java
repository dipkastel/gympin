package com.notrika.gympin.common.context;

public class GympinContextHolder {
    private static final ThreadLocal<GympinContext> CONTEXT = new ThreadLocal<>();

    public static GympinContext getContext() {
        return CONTEXT.get();
    }

    public static void setContext(GympinContext contextEntry) {
        CONTEXT.set(contextEntry);
    }

    public static void clear() {
        CONTEXT.remove();
    }
}
