import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
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
    link: "/admin-dashboard",
  },
  {
    id: 3,
    icon: <AssignmentIndOutlinedIcon />,
    text: "Guru",
    link: "/admin-teachers",
  },
  {
    id: 13,
    icon: <ClassOutlinedIcon />,
    text: "Tingkat",
    link: "/admin-grade",
  },
  {
    id: 4,
    icon: <GroupsOutlinedIcon />,
    text: "Siswa",
    link: "/admin-users",
  },
  {
    id: 5,
    icon: <ArticleOutlinedIcon />,
    text: "Informasi",
    link: "/admin-news",
  },
  {
    id: 6,
    icon: <FeedOutlinedIcon />,
    text: "Kegiatan",
    link: "/admin-feeds",
  },
  {
    id: 7,
    icon: <LibraryBooksOutlinedIcon />,
    text: "Perpustakaan",
    link: "/admin-library",
  },
  {
    id: 9,
    icon: <DevicesOutlinedIcon />,
    text: "CBT",
    link: "/admin-cbt",
  },
  {
    id: 8,
    icon: <PaymentOutlinedIcon />,
    text: "Pembayaran",
    link: "/admin-payment",
  },
  {
    id: 12,
    icon: <AssessmentOutlinedIcon />,
    text: "Laporan",
    link: "/admin-report",
  },
  {
    id: 10,
    icon: <SettingsOutlinedIcon />,
    text: "Pengaturan",
    link: "/admin-settings",
  },
  {
    id: 11,
    icon: <AccountCircleOutlinedIcon />,
    text: "Profile",
    link: "/admin-profile",
  },
];
