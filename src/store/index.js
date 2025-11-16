import { configureStore } from "@reduxjs/toolkit";
import programs from "./slices/programs";
import icons from "./slices/icons";
import popups from "./slices/popups";
import theme from "./slices/theme";
import notifications from "./slices/notifications";
import quickActions from "./slices/quickActions";
import widgets from "./slices/widgets";

const store = configureStore({
    reducer: {
        programs,
        icons,
        popups,
        theme,
        notifications,
        quickActions,
        widgets,
    },
});

export default store;
