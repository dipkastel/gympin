package com.notrika.gympin.common.context;

public class GympinContext {
    private static final ThreadLocal<GympinContextEntry> CONTEXT = new ThreadLocal<>();

    public static void setContext(GympinContextEntry contextEntry) {
        CONTEXT.set(contextEntry);
    }

    public static GympinContextEntry getContext() {
        return CONTEXT.get();
    }

    public static void clear() {
        CONTEXT.remove();
    }
}
