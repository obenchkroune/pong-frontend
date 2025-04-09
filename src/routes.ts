type Route = {
  pathname: string;
  component: string;
  protected?: boolean;
  title?: string;
};

export const routes: Route[] = [
  {
    pathname: "/",
    component: "home-page",
  },
  {
    pathname: "/signin",
    component: "signin-page",
    title: "Sign-in",
  },
  {
    pathname: "/profile",
    component: "profile-page",
    title: "Profile",
    protected: true,
  },
  {
    pathname: "/leaderboard",
    component: "leaderboard-page",
    title: "LeaderBoard",
  },
  {
    pathname: "/play",
    component: "play-page",
    title: "Play",
  },
  {
    pathname: "*",
    component: "not-found",
    title: "404 - Not Found",
  },
];
