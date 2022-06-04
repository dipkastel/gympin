package com.notrika.gympin.common.communication.chat.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.notrika.gympin.common.BaseDto;
import com.notrika.gympin.common.BaseDtoWithCreate;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@ToString
@SuperBuilder
//@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class GreetingDto extends BaseDtoWithCreate<GreetingDto> {

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


    public GreetingDto(String foo, String bar, String baz) {
        this.foo = foo;
        this.bar = bar;
        this.baz = baz;
    }

    @JsonProperty("foo")
    public String foo;

    @JsonProperty("bar")
    public String bar;

    @JsonProperty("baz")
    public String baz;

}
