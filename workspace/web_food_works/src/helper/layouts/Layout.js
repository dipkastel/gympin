import * as React from "react";
import {Outlet} from "react-router";
import {DashboardLayout} from "@toolpad/core/DashboardLayout";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import PageAuthGate from "./PageAuthGate";
import {DarkMode, LightMode} from "@mui/icons-material";
import {IconButton, useColorScheme} from "@mui/material";
import Grid from "@mui/material/Grid2";
import LogoutIcon from "../../pages/auth/LogoutIcon";
import SelectCatering from "./SelectCatering";

export default function Layout() {
    const {mode, setMode} = useColorScheme();
    if (!mode) {
        return null;
    }

    function SidebarFooter({mini}) {
        return mini ? (
            <Typography
                variant="caption"
                sx={{m: 1, whiteSpace: "nowrap", overflow: "hidden"}}
            >
                اپــســا
            </Typography>
        ) : (
            <Grid container justifyContent={"space-between"}>
                <Typography
                    variant="caption"
                    sx={{m: 1, whiteSpace: "nowrap", overflow: "hidden"}}
                >
                    {new Date().getFullYear()} ساخته شده در اپسا ©
                </Typography>
                <LogoutIcon/>
            </Grid>
        );
    }

    function toolbarActions(event) {
        return (
            <>
                <SelectCatering/>
                <IconButton
                    onClick={(e) => setMode(mode == "light" ? "dark" : "light")}
                >
                    {mode == "light" ? <DarkMode/> : <LightMode/>}
                </IconButton>
            </>
        );
    }

    SidebarFooter.propTypes = {
        mini: PropTypes.bool.isRequired,
    };

    return (
        <DashboardLayout
            slots={{
                sidebarFooter: SidebarFooter,
                toolbarActions: toolbarActions,
            }}
        >
            <PageAuthGate>
                {/*<PageContainer breadcrumbs={false} title={false} >*/}

                <Outlet/>
                {/*</PageContainer>*/}
            </PageAuthGate>
        </DashboardLayout>
    );
}
