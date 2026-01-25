import { FaFile, FaTachometerAlt, FaUsers } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { IoDocumentsSharp } from "react-icons/io5";

export const DashboardLinks = [
  {
    title: "Dashboard",
    route: "/",
    hasChildren: false,
    icon: <FaTachometerAlt className="text-teal-600" />,
  },
  {
    title: "Collection",
    route: null,
    hasChildren: true,
    icon: <FaGear className="text-teal-600" />,
    subRoutes: [
      { title: "Friday Collection", route: "/friday-collection" },
      { title: "Collection Data SetUp", route: "/collection-data-setup" },
      { title: "Collections", route: "/others-collection" },
    ],
  },
  {
    title: "Ramadan",
    route: null,
    hasChildren: true,
    icon: <FaFile className="text-teal-600" />,
    subRoutes: [
      { title: "Ramadan Data SetUp", route: "/ramadan-datasetup" },
      { title: "Iftar", route: "/ramadan-iftar" },
      { title: "Itikaf", route: "itikaf" },
    ],
  },
  {
    title: "Monthly Collection",
    route: null,
    hasChildren: true,
    icon: <IoDocumentsSharp className="text-teal-600" size={16} />,
    subRoutes: [
      { title: "Add Members", route: "/member" },
      { title: "Payment", route: "/monthly-payment" },
      { title: "All Payment", route: "/payment-history" },
    ],
  },

  {
    title: "Staff Management",
    route: null,
    hasChildren: true,
    icon: <IoDocumentsSharp className="text-teal-600" size={16} />,
    subRoutes: [
      { title: "Staff", route: "/staff" },
      { title: "Payment", route: "/staff-monthly-payment" },
      { title: "All Payment", route: "/staff-payment-history" },
    ],
  },

  {
    title: "Mosques Management",
    route: null,
    hasChildren: true,
    icon: <FaUsers className="text-teal-600" size={16} />,
    subRoutes: [
      { title: "Create Mosques", route: "/mosques-create" },
      // { title: "Two", route: "#" },
      // { title: "three", route: "#" },
    ],
  },
];
