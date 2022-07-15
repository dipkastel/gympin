import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";

export default function Dashboard() {
  return (
    <>
      <div className="container-fluid">
        <Row>
          <Col>
            <Card>
              <CardHeader title={"کاربر فعال"} color={"primary"} />
              <CardContent>1690 کاربر فعال</CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="secondary"
                  href="/users"
                  sx={{ marginRight: "auto" }}
                  size="large"
                >
                  مدیریت
                </Button>
              </CardActions>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardHeader title={"شهر های فعال"} color={"primary"} />
              <CardContent>4 شهر فعال</CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="secondary"
                  href="/locations"
                  sx={{ marginRight: "auto" }}
                  size="large"
                >
                  مدیریت
                </Button>
              </CardActions>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardHeader title={"ورزش های فعال"} color={"primary"} />
              <CardContent>2 ورزش فعال</CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="secondary"
                  href="/sports"
                  sx={{ marginRight: "auto" }}
                  size="large"
                >
                  مدیریت
                </Button>
              </CardActions>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
