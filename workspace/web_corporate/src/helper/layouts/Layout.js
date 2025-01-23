import * as React from 'react';
import { Outlet } from 'react-router';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import PageAuthGate from "./PageAuthGate";
import {DarkMode, LightMode} from "@mui/icons-material";
import {IconButton, useColorScheme} from "@mui/material";
import SelectCorproate from "./SelectCorproate";
import {useSelector} from "react-redux";

export default function Layout() {
    const {mode, setMode} = useColorScheme();

    if (!mode) {
        return null;
    }

    function SidebarFooter({mini}) {
        return (
            <Typography
                variant="caption"
                sx={{m: 1, whiteSpace: 'nowrap', overflow: 'hidden'}}
            >
                {mini ? 'جیم پین' : `© ${new Date().getFullYear()} ساخته شده در جیم پین `}
            </Typography>
        );
    }


    function toolbarActions(event) {

        return (
            <>
                <SelectCorproate />
                <IconButton onClick={e => setMode(mode == 'light' ? 'dark' : 'light')}>{mode=='light'?<DarkMode/>:<LightMode/>}</IconButton>
            </>
        );
    }

    SidebarFooter.propTypes = {
        mini: PropTypes.bool.isRequired,
    };

    return (
        <DashboardLayout slots={{
            sidebarFooter:SidebarFooter,
            toolbarActions:toolbarActions

        }} >
            <PageAuthGate>
                {/*<PageContainer breadcrumbs={false} title={false} >*/}

                    <Outlet />
                {/*</PageContainer>*/}
            </PageAuthGate>
        </DashboardLayout>
    );
}
