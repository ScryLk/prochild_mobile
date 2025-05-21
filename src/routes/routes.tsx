const routes = {
  login: "/auth/login/login",
  register: "/auth/register/register",
  forgotPassword: "auth/forgot-password/forgot-password",
  homePage: "/(tabs)/inicio",
  trainings: "/trainings/[categoryId]",
  TrainingDetails: "/pages/trainings/trainingsDetails/trainingsDetails",
  HealthCenter: "/pages/health-centers/health-center",
  healthCenterDetails: "/pages/health-centers/health-center-details/[id]",
  EditHealthCenter: "/pages/health-centers/health-center-details/[id]/edit",
  AddHealthCenter: "/pages/health-centers/add-health-centers/add-health-centers",
  EmergencyCalls: "/pages/emergency-calls/emergency-calls",
  Settings: "/pages/settings/settings"
};

export default routes;