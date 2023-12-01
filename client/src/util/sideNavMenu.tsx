
import UserFillIcon from "components/common/icons/UserFillIcon";
import DashboardFilIcon from "components/common/icons/DashboardFilIcon";
import CollectionFillIcon from "components/common/icons/CollectionFillIcon";
import CalendarCheckFillIcon from "components/common/icons/CalendarIcon";

export const MENUS = [
  { name: "Dashboard", url: "/", icon: <DashboardFilIcon /> },
  {
    name: "Posts",
    icon: <CollectionFillIcon />,
    children: [
      { name: "Posts" },
      { name: "WOD", url: "/category" },
      { name: "Board", url: "/users" },
      { name: "Notification", url: "/" },
    ],
  },
  {
    name: "Member",
    icon: <UserFillIcon />,
    children: [{ name: "Member" }, { name: "User", url: "/" }],
  },
  {
    name: "Reservation",
    icon: <CalendarCheckFillIcon />,
    children: [
      { name: "Reservation" },
      { name: "Schedule", url: "/schedule" },
      { name: "Attendance", url: "/attendance" },
    ],
  },
];
