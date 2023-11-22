import { BsCollectionFill, BsCalendarCheckFill } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

export const menus = [
  { name: "Dashboard", url: "/", icon: <RiDashboardFill /> },
  {
    name: "Posts",
    icon: <BsCollectionFill />,
    children: [
      { name: "Posts" },
      { name: "WOD", url: "/category" },
      { name: "Board", url: "/users" },
      { name: "Notification", url: "/" },
    ],
  },
  {
    name: "Member",
    icon: <FaUser />,
    children: [{ name: "Member" }, { name: "User", url: "/" }],
  },
  {
    name: "Reservation",
    icon: <BsCalendarCheckFill />,
    children: [
      { name: "Reservation" },
      { name: "Schedule", url: "/schedule" },
      { name: "Attendance", url: "/attendance" },
    ],
  },
];
