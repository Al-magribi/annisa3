import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";

export const MenuItems = [
  {
    id: 1,
    icon: <HomeOutlinedIcon />,
    text: "Home",
    link: "/",
  },
  {
    id: 2,
    icon: <DashboardCustomizeOutlinedIcon />,
    text: "Dashboard",
    link: "/student-dashboard",
  },
  {
    id: 7,
    icon: <LibraryBooksOutlinedIcon />,
    text: "Perpustakaan",
    link: "/student-library",
  },
  {
    id: 9,
    icon: <DevicesOutlinedIcon />,
    text: "CBT",
    link: "/student-cbt",
  },
  {
    id: 8,
    icon: <PaymentOutlinedIcon />,
    text: "Pembayaran",
    link: "/student-payment",
  },
  {
    id: 10,
    icon: <SettingsOutlinedIcon />,
    text: "Data Siswa",
    link: "/student-settings",
  },
];
