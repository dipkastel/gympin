import Link from "next/link";
import { Button, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <>
      <div className="notfound-center">
        <img alt="این صفحه موجود نیست" src="/images/404.png" />
      </div>
      <div className="notfound-center">
        <Typography sx={{ p: 1, m: 1 }} variant="h5" component="h1">۴۰۴ - این صفحه پیدا نشد</Typography>
      </div>
      <div className="notfound-center" style={{ marginBottom: 48 }}>
        <Button href="/" variant="contained" color="primary" sx={{ borderRadius: 3, px: 4, mx: 1 }}>
          بازگشت به صفحه اصلی
        </Button>
        <Button href="/blog" variant="outlined" color="primary" sx={{ borderRadius: 3, px: 4, mx: 1 }}>
          مشاهده وبلاگ
        </Button>
      </div>
    </>
  );
}
