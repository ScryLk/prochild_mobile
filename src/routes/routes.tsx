const routes = {
  home: "/",
  register: "/auth/register/register",
  login: "/auth/login/login",
  forgotPassword: "auth/forgot-password/forgot-password",
  homePage: "/(tabs)/inicio",
  trainings: "/trainings/[categoryId]", // Rota dinâmica para treinamentos
};

export default routes;