package com.notrika.gympin.common.context;

public class GympinContextHolder {

    private static final InheritableThreadLocal<GympinContext> CONTEXT = new InheritableThreadLocal<>();

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
