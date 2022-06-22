package com.notrika.gympin.common.communication.chat.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
//@AllArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
public class GreetingParam extends BaseParam<GreetingParam> {
    //
    //    public Greeting(String foo, String bar, String baz) {
    //        this.foo = foo;
    //        this.bar = bar;
    //        this.baz = baz;
    //    }
    //
    //    @SerializedName("foo")
    //    @Expose
    //    public String foo;
    //    @SerializedName("bar")
    //    @Expose
    //    public String bar;
    //    @SerializedName("baz")
    //    @Expose
    //    public String baz;


    @JsonProperty("foo")
    public String foo;
    @JsonProperty("bar")
    public String bar;
    @JsonProperty("baz")
    public String baz;

    public GreetingParam(String foo, String bar, String baz) {
        this.foo = foo;
        this.bar = bar;
        this.baz = baz;
    }

}
