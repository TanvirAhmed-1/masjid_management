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
      { title: "Others  Collection", route: "others-collection" },
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
    title: "Title3",
    route: null,
    hasChildren: true,
    icon: <IoDocumentsSharp className="text-teal-600" size={16} />,
    subRoutes: [
      { title: "one", route: "#" },
      { title: "Two", route: "#" },
      { title: "three", route: "#" },
    ],
  },
  {
    title: "Title4",
    route: null,
    hasChildren: true,
    icon: <FaUsers className="text-teal-600" size={16} />,
    subRoutes: [
      { title: "one", route: "#" },
      { title: "Two", route: "#" },
      { title: "three", route: "#" },
    ],
  },
];
