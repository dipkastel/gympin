package com.notrika.gympin.common.settings.context;

public class GympinContextHolder {

    private static final ThreadLocal<GympinContext> CONTEXT = new InheritableThreadLocal<>();

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
