import css from "./Dashboard.module.css";

type DashboardProps = {
  children: React.ReactNode;
};

const Dashboard = ({ children }: DashboardProps) => {
  return <div className={css.dashboardContainer}>{children}</div>;
};
export default Dashboard;
