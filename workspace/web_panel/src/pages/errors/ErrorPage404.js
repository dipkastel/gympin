import React from "react";
import { toAbsoluteUrl } from "../../helper";
import "../../assets/sass/pages/error/error-3.scss";

export function ErrorPage404() {
  return (
    <>
      <div className="kt-grid kt-grid--ver kt-grid--root">
        <div
          className="kt-grid__item kt-grid__item--fluid kt-grid kt-error-v3"
          style={{
            backgroundImage: `url(${toAbsoluteUrl("/media/error/bg3.jpg")})`,
          }}
        >
          <div className="kt-error_container">
            <div className="kt-error_number">
              <h1>404</h1>
            </div>
            <p className="kt-error_title kt-font-light">اینجا چیزی نیست!</p>
            <p className="kt-error_subtitle">
              متاسفانه ما نتوانستیم چیزی که به دنبالش بودید را پیدا کنیم.
            </p>
            <p className="kt-error_description">
              این مشکل ممکن است از اشتباه در نگارش url باشد,
              <br />
              و یا صفحه ای که به دنبالش هستید دیگر وجود ندارد.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
