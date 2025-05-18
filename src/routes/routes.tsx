const routes = {
  home: "/",
  register: "/auth/register/register",
  login: "/auth/login/login",
  forgotPassword: "auth/forgot-password/forgot-password",
  homePage: "/(tabs)/inicio",
  trainings: "/trainings/[categoryId]",
  TrainingDetails: "/pages/trainings/trainingsDetails/trainingsDetails",
  HealthCenter: "/pages/health-centers/health-center",
  healthCenterDetails: "/pages/health-centers/health-center-details/[id]",
  AddHealthCenter: "/pages/health-centers/add-health-centers/add-health-centers",
  EmergencyCalls: "/pages/emergency-calls/emergency-calls",
  Settings: "/pages/settings/settings"
};

export default routes;