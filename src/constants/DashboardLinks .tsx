import {
  FaTachometerAlt,
  FaMoon,
  FaMosque,
  FaMoneyBillWave,
} from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdOutlineCollectionsBookmark } from "react-icons/md";

export const DashboardLinks = [
  {
    title: "Dashboard",
    route: "/",
    hasChildren: false,
    icon: <FaTachometerAlt />,
  },
  {
    title: "Collection",
    route: null,
    hasChildren: true,
    icon: <MdOutlineCollectionsBookmark size={18} />,
    subRoutes: [
      { title: "Friday Collection", route: "/friday-collection" },
      { title: "Create Collection", route: "/collection-data-setup" },
      { title: "Collections", route: "/others-collection" },
    ],
  },
  {
    title: "Ramadan",
    route: null,
    hasChildren: true,
    icon: <FaMoon />,
    subRoutes: [
      { title: "Create Ramadan", route: "/ramadan-datasetup" },
      { title: "Iftar", route: "/ramadan-iftar" },
      { title: "Itikaf", route: "/itikaf" },
      { title: "Tarabi Payment", route: "/tarabi-payment" },
    ],
  },
  {
    title: "Monthly Collection",
    route: null,
    hasChildren: true,
    icon: <FaMoneyBillWave />,
    subRoutes: [
      { title: "Add Members", route: "/member" },
      { title: "Members Payment", route: "/monthly-payment" },
      { title: "All Payment", route: "/payment-history" },
    ],
  },
  {
    title: "Management Cost",
    route: null,
    hasChildren: true,
    icon: <FaCartShopping />,
    subRoutes: [
      { title: "Create Staff", route: "/staff" },
      { title: "Staff Payment", route: "/staff-monthly-payment" },
      { title: "Purchases Accessory", route: "/accessory-purchases" },
    ],
  },
  {
    title: "Mosques Management",
    route: null,
    hasChildren: true,
    icon: <FaMosque />,
    subRoutes: [{ title: "Create Mosques", route: "/mosques-create" }],
  },
];
